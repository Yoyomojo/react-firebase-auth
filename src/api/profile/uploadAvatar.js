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
    const [isUploading, setIsUploading] = useState(false);

    const uploadUsersAvatar = (e) => {
        e.preventDefault();
        setIsUploading(true);
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
                        setAvatarSuccess([]);
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
                        setAvatarError({});
                        setIsUploading(false);
                    })
                    .catch(() => {
                        setAvatarError({ error: 'An error occurred uploading your avatar. Please try again.' });
                        setAvatarSuccess({});
                        setIsUploading(false);
                    });
            });
    }

    const resizeImage = async (e) => {
        if (e.target.files) {
            setSubmitDisabled(false);
            setFileExtension(e.target.files[0].name.substring(e.target.files[0].name.lastIndexOf('.') + 1));

            const formData = new FormData(document.getElementById('update-user-avatar'));
            const photoField = formData.get('avatar-input');
            const dataUri = await getImageData(photoField);
            const img = document.createElement('img');

            img.onload = () => {
                const resizedDataUri = createResizedAvatar(img, 300);
                document.querySelector('#avatar-preview').src = resizedDataUri;
            };

            img.src = dataUri;
        } else {
            setSubmitDisabled(true);
            setAvatarImage();
        }
    }

    const getImageData = (imageInputField) => {
        return new Promise((resolve) => {
            const reader = new FileReader();

            reader.onload = () => {
                resolve(reader.result);
            }

            reader.readAsDataURL(imageInputField);
        });
    }

    const createResizedAvatar = (img, imageWidth) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const aspect = img.width / img.height;

        canvas.width = imageWidth;
        canvas.height = imageWidth / aspect;

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(function (blob) {
            const file = new File([blob], '', { type: 'image/jpeg' });
            setAvatarImage(file);
        }, 'image/jpeg');

        return canvas.toDataURL();
    }

    return {
        uploadUsersAvatar,
        resizeImage,
        isUploading,
        user,
        submitDisabled,
        imagePreview,
        avatarImage,
        avatarError,
        avatarSuccess
    };
}

export default useUploadAvatar;