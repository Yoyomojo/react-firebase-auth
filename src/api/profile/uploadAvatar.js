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

    const resizeImage = (e) => {
        if (e.target.files) {
            setSubmitDisabled(false);
            setAvatarImage(e.target.files[0]);
            setFileExtension(e.target.files[0].name.substring(e.target.files[0].name.lastIndexOf('.') + 1));
            let imageFile = e.target.files[0];
            let reader = new FileReader();
            reader.onload = function (e) {
                let image = document.createElement('img');
                image.onload = function () {
                    let maxWidth = 300;
                    let maxHeight = 300;
                    let width = image.width;
                    let height = image.height;

                    if (width > height) {
                        if (width > maxWidth) {
                            height = height * (maxWidth / width);
                            width = maxWidth;
                        }
                    } else {
                        if (height > maxHeight) {
                            width = width * (maxHeight / height);
                            height = maxHeight;
                        }
                    }

                    let canvas = document.createElement('canvas');
                    let ctx = canvas.getContext('2d');
                    ctx.drawImage(image, 0, 0, 300, 300);
                    let dataUrl = canvas.toDataURL(imageFile.type);
                    document.getElementById('avatar-preview').src = dataUrl;
                }
                image.src = e.target.result;
            }
            reader.readAsDataURL(imageFile);
        } else {
            setSubmitDisabled(true);
        }
    }

    return {
        uploadUsersAvatar,
        resizeImage,
        user,
        submitDisabled,
        imagePreview,
        avatarImage,
        avatarError,
        avatarSuccess
    };
}

export default useUploadAvatar;