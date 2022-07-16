import firebase from 'firebase/compat/app';
import { useContext, useState } from 'react';
import { AuthContext } from '../../firebase/context';

const useUpdateAccountInfo = () => {
    const { user } = useContext(AuthContext);
    const [accountError, setAccountError] = useState({});
    const [accountSuccess, setAccountSucess] = useState({});

    const updateAccountInformation = async (event) => {
        setAccountError({});
        setAccountSucess({});
        event.preventDefault();

        const oldEmail = user.email;
        const firstName = document.getElementById('infoFirstName').value.toLowerCase().trim();
        const lastName = document.getElementById('infoLastName').value.toLowerCase().trim();
        const email = document.getElementById('infoEmail').value.toLowerCase().trim();
        const password = document.getElementById('infoPassword').value.trim();

        await firebase.auth().signInWithEmailAndPassword(oldEmail, password)
            .then(() => {
                const currUser = firebase.auth().currentUser;
                currUser.updateEmail(email)
                    .then(async () => {
                        await firebase.firestore().collection('users').doc(user.uid)
                            .update({
                                firstName: firstName,
                                lastName: lastName,
                                email: email,
                                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                            })  
                            .then(() => {
                                setAccountSucess({ success: 'Your personal information has been updated.'});
                                setAccountError({});
                            })
                            .catch(function(error) {
                                setAccountError({error: 'Something went wrong updating your information. Please try again.'});
                                setAccountSucess({});
                            });
                  });
        })
        .catch(function(error) {
            // display error messages by type
            switch (error.code) {
                case 'auth/user-not-found':
                    break;
                case 'auth/wrong-password':
                    setAccountError({error: 'Please check your password.'});
                    break;
                case 'auth/too-many-requests':
                    setAccountError({error: 'Too many login attempts. Please try again later.'});
                    break;
                default:
                    break;
            }
        });
    }

    return {
        updateAccountInformation,
        accountError,
        accountSuccess
    };
}

export default useUpdateAccountInfo;