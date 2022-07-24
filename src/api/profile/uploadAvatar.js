import firebase from 'firebase/compat/app';
import { useContext, useState } from 'react';
import { AuthContext } from '../../firebase/context';

const useUploadAvatar = () => {
    const { user } = useContext(AuthContext);
    const [submitDisabled, setSubmitDisabled] = useState(true);
    const [avatarImage, setAvatarImage] = useState();
    const [imagePreview, setAvatarImagePreview] = useState(null);
    const [avatarError, setAvatarError] = useState({});
    const [avatarSuccess, setAvatarSuccess] = useState({});
    const [fileExtension, setFileExtension] = useState('');

    const uploadUsersAvatar = (e) => {
        e.preventDefault();
        const fileName = user.uid + '-avatar.' + fileExtension;
        const storageRef = `userAvatars/${user.uid}/${fileName}`;

        const deleteAvatarFolder = firebase.storage().ref(`/userAvatars/${user.uid}`);

        deleteAvatarFolder.listAll().then((listResults) => {
            listResults.items.map((item) => {
                return item.delete();
            })
        })
            .then(async () => {
                await firebase.storage()
                    .ref(storageRef)
                    .put(avatarImage)
                    .then(() => {
                        setAvatarError({});
                        setAvatarImage([]);
                        setAvatarImagePreview(null);
                        setSubmitDisabled(true);
                        // reset the form
                        document.getElementById('update-user-avatar').reset();
                    })
                    .then(async () => {
                        // get download URL and update users avatar link in users table
                        await firebase.storage()
                            .ref(storageRef)
                            .getDownloadURL()
                            .then(async (downloadURL) => {
                                await firebase.firestore().collection('users').doc(user.uid)
                                    .update({
                                        avatar: downloadURL,
                                        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                                    })
                            })
                        setAvatarSuccess({ success: 'Your avatar has been updated.' });
                    })
                    .catch(() => {
                        setAvatarError({ error: 'An error occurred uploading your avatar. Please try again.' });
                        setAvatarSuccess({});
                    });
            });
    }

    const selectImage = (e) => {
        e.preventDefault();
        if (e.target.files.length > 0) {
            setSubmitDisabled(false);
        } else {
            setSubmitDisabled(true);
        }
        setAvatarImage(e.target.files[0]);
        setAvatarImagePreview(URL.createObjectURL(e.target.files[0]));
        setFileExtension(e.target.files[0].name.substring(e.target.files[0].name.lastIndexOf(".") + 1));
    }

    return {
        uploadUsersAvatar,
        selectImage,
        user,
        submitDisabled,
        imagePreview,
        avatarImage,
        avatarError,
        avatarSuccess
    };
}

export default useUploadAvatar;