import { useState } from 'react';
import firebase from 'firebase/compat/app';
import { useNavigate } from 'react-router';

const useLoginUser = () => {
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState({});

    const loginUser = async (event) => {
        setLoginError({});
        event.preventDefault();
        const email = document.getElementById('email').value.toLowerCase().trim();
        const password = document.getElementById('password').value.trim();

        await firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                navigate('/', { replace: true })
            })
            .catch(function (error) {
                // display error messages by type
                switch (error.code) {
                    case 'auth/user-not-found':
                        setLoginError({ error: 'Please check your username and password' });
                        break;
                    case 'auth/wrong-password':
                        setLoginError({ error: 'Please check your username and password' });
                        break;
                    default:
                        break;
                }
            });
    }

    return {
        loginUser,
        loginError
    };
}

export default useLoginUser;