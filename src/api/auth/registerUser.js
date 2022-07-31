import { useState } from 'react';
import firebase from 'firebase/compat/app';
import { useNavigate } from 'react-router';

const useRegisterUser = () => {
    const navigate = useNavigate();
    const [regError, setRegError] = useState({});

    const registerUser = async (event) => {
        setRegError({});
        event.preventDefault();
        const email = document.getElementById('email').value.toLowerCase().trim();
        const password = document.getElementById('password').value.trim();
        const firstName = document.getElementById('firstName').value.toLowerCase().trim();
        const lastName = document.getElementById('lastName').value.toLowerCase().trim();
        const username = document.getElementById('username').value.toLowerCase().trim().replace(/^\s+|\s+$|\s+(?=\s)/g, '');

        await firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async (user) => {
                await firebase.firestore().collection('users').doc(user.user.uid)
                    .set({
                        uid: user.user.uid,
                        firstName: firstName,
                        lastName: lastName,
                        username: username,
                        email: email,
                        role: process.env.REACT_APP_USER_TITLE,
                        avatar: '/img/react-logo.png',
                        active: true,
                        theme: 'light',
                        isPrivate: false,
                        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                        createdAt: firebase.firestore.FieldValue.serverTimestamp()
                    })
            })
            .then(async () => {
                await firebase.firestore().collection('usernames').doc()
                    .set({
                        username: username
                    })
                    .then(() => {
                        navigate('/', { replace: true })
                    })
                    .catch(() => { 
                        setRegError({ error: 'An error occured creating the account.'})
                    });
            })
            .catch(function (error) {
                // display error messages by type
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        setRegError({ error: 'Email is unavailable' });
                        break;
                    default:
                        break;
                }
            });
    };

    return {
        registerUser,
        regError
    };
}

export default useRegisterUser;