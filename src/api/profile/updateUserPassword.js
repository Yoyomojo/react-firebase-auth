import firebase from 'firebase/app';
import { useContext, useState } from 'react';
import { AuthContext } from '../../firebase/context';

const useUpdateUserPassword = () => {
    const { user } = useContext(AuthContext);
    const [passwordError, setPasswordError] = useState({});
    const [passwordSuccess, setPasswordSuccess] = useState({});

    const updateUserPassword = (event) => {
        setPasswordError({});
        setPasswordSuccess({});
        event.preventDefault();

        const oldEmail = user.email;
        const password = document.getElementById('updatePassword').value.trim();
        const currentPassword = document.getElementById('currentPassword').value.trim();

        // re auth user then update password
        firebase.auth().signInWithEmailAndPassword(oldEmail, currentPassword)
            .then(res => {
                const currUser = firebase.auth().currentUser;
                currUser.updatePassword(password).then(() => {
                    setPasswordSuccess({success: 'Your password have been updated.'});
                    setPasswordError({});
                    document.getElementById('update-user-password').reset();
                  }).catch((error) => {
                    setPasswordError({error: 'Something went wrong updating your password. Please try again.'});
                    setPasswordSuccess({});
                  });
            })
        .catch(function(error) {
            // display error messages by type
            switch (error.code) {
                case 'auth/user-not-found':
                    break;
                case 'auth/wrong-password':
                    setPasswordError({error: 'Please check your current password.'});
                    break;
                case 'auth/too-many-requests':
                    setPasswordError({error: 'Too many attempts with an incorrect password. Please try again later.'});
                    break;
                default:
                    break;
            }
        });
    }

    return {
        updateUserPassword,
        passwordError,
        passwordSuccess
    };
}

export default useUpdateUserPassword;