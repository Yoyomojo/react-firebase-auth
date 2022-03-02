import firebase from 'firebase/app';
import { useContext, useState } from 'react';
import { AuthContext } from '../../firebase/context';

const useDeleteAccount = () => {
    const { user } = useContext(AuthContext);
    const [deleteAccountError, setDeleteAccountError] = useState({});
    const [deleteAccountSuccess, setDeleteAccountSuccess] = useState({});

    const deleteUserAccount = async (event) => {
        setDeleteAccountError({});
        setDeleteAccountSuccess({});
        event.preventDefault();

        const oldEmail = user.email;
        const currentPassword = document.getElementById('deleteUserPassword').value.trim();

        await firebase.auth().signInWithEmailAndPassword(oldEmail, currentPassword)
            .then(() => {
                const currUser = firebase.auth().currentUser;

                firebase.firestore().collection('users').doc(currUser.uid)
                    .delete()
                    .then(() => {
                        currUser.delete().then(() => {
                            setDeleteAccountSuccess({ success: 'Account deleted' });
                            setDeleteAccountError({});
                            window.location = '/';
                        })
                            .catch(() => {
                                setDeleteAccountError({ error: 'Something went wrong deleting your account. Please try again.' });
                                setDeleteAccountSuccess({});
                            })
                    })
                    .catch(() => {
                        setDeleteAccountError({ error: 'An error occured deleting your account.' });
                    })
            })
            .catch(function (error) {
                // display error messages by type
                switch (error.code) {
                    case 'auth/user-not-found':
                        break;
                    case 'auth/wrong-password':
                        setDeleteAccountError({ error: 'Please check your password.' });
                        break;
                    case 'auth/too-many-requests':
                        setDeleteAccountError({ error: 'Too many attempts with an incorrect password. Please try again later.' });
                        break;
                    default:
                        break;
                }
            });
    }

    return {
        deleteUserAccount,
        deleteAccountError,
        deleteAccountSuccess
    };
}

export default useDeleteAccount;