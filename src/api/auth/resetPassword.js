import { useState } from 'react';
import firebase from 'firebase/compat/app';

const useResetPassword = () => {
    const [resetError, setResetError] = useState({});
    const [resetSuccess, setResetSuccess] = useState({});

    const resetPassword = async (event) => {
        setResetError({});
        setResetSuccess({});
        event.preventDefault();
        const email = document.getElementById('email').value.toLowerCase().trim();
        await firebase.auth().sendPasswordResetEmail(email).then(function () {
            setResetSuccess({success: 'Success! Check your email to reset you password'});
            setResetError({});
        }).catch(function(error) {
            // display error messages by type
            switch (error.code) {
                case 'auth/user-not-found':
                    setResetError({error: 'Please check your email address'});
                    setResetSuccess({});
                    break;
                default:
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

export default useResetPassword;