import firebase from 'firebase/compat/app';
import { useState } from 'react';

const useResetUsersAvatar = () => {
    const [avatarError, setAvatarError] = useState({});
    const [avatarSuccess, setAvatarSuccess] = useState({});

    const resetAvatar = (userUID) => {
        setAvatarError({});
        setAvatarSuccess({});

        const deleteAvatarFolder = firebase.storage().ref(`/userAvatars/${userUID}`);

        // by default we will delete the existing avatar from firestore to save space. Something like userAvatars/UID/FileName
        // This of course all depends on the apps needs
        deleteAvatarFolder.listAll().then((listResults) => {
            listResults.items.map((item) => {
                return item.delete();
            })
        })
            .then(() => {
                firebase.firestore().collection('users').doc(userUID)
                    .update({
                        avatar: process.env.REACT_APP_DEFAULT_AVATAR_URL
                    })
                    .catch(error => {
                        setAvatarError({ message: 'Something went wrong reverting the users avatar.' });
                        console.log(error.code);
                    })
            })
    }

    return {
        resetAvatar,
        avatarError,
        avatarSuccess
    };
}

export default useResetUsersAvatar;