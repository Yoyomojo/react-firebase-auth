import { useState } from 'react';
import firebase from 'firebase/app';

const useResetUsersPassword = () => {
    const [resetError, setResetError] = useState({});
    const [resetSuccess, setResetSuccess] = useState({});

    const resetPassword = (email) => {
        setResetError({});
        setResetSuccess({});
        firebase.auth().sendPasswordResetEmail(email).then(function () {
            setResetSuccess({message: 'An email has been sent to reset the users password.'});
            setResetError({});
        }).catch(function(error) {
            // display error messages by type
            switch (error.code) {
                case 'auth/user-not-found':
                    setResetError({message: 'The user could not be found.'});
                    setResetSuccess({});
                    break;
                default:
                    setResetError({message: 'En error occured. ' + error.code});
                    break;
            }
        });
    }

    return {
        resetPassword,
        resetError,
        resetSuccess
    };
}

export default useResetUsersPassword;