import firebase from 'firebase/compat/app';
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
        const deleteAvatarFolder = await firebase.storage().ref(`/userAvatars/${user.uid}`);
        const deleteUsername = await firebase.firestore().collection('usernames').where('username', '==', user.username).get();

        const batch = firebase.firestore().batch();

        deleteUsername.forEach((doc) => {
            batch.delete(doc.ref);
        });

        await batch.commit();

        // sign the user in again and remove data
        await firebase.auth().signInWithEmailAndPassword(oldEmail, currentPassword)
            .then(async () => {
                // delete user avatar directory
                deleteAvatarFolder.listAll()
                    .then((listResults) => {
                        listResults.items.map((item) => {
                            return item.delete();
                        })
                    })
                    .then(async () => {
                        const currUser = firebase.auth().currentUser;
                        // remove firebase user
                        await firebase.firestore().collection('users').doc(currUser.uid)
                            .delete()
                            .then(async () => {
                                await currUser.delete()
                                    .then(() => {
                                        setDeleteAccountSuccess({ success: 'Account deleted' });
                                        setDeleteAccountError({});
                                        window.location = '/';
                                    })
                                    .catch(() => {
                                        setDeleteAccountError({ error: 'Something went wrong deleting your account. Please try again.' });
                                        setDeleteAccountSuccess({});
                                    })
                                    .catch(() => {
                                        setDeleteAccountError({ error: 'Something went wrong deleting your account. Please try again.' });
                                        setDeleteAccountSuccess({});
                                    })
                            })
                            .catch(() => {
                                setDeleteAccountError({ error: 'An error occured deleting your account.' });
                            })

                    });
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