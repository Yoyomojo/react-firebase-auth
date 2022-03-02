import firebase from 'firebase/app';
import { useState } from 'react';

const useCheckExistingUserName = () => {
    const [usernameError, setUsernameError] = useState({});
    const [usernameSuccess, setUsernameSuccess] = useState({});

    const checkUsername = async () => {
        setUsernameError({});
        const username = document.getElementById('username').value.toLowerCase().trim().replace(/^\s+|\s+$|\s+(?=\s)/g, '');
        if (username !== '' && username.length >= 2) {
            await firebase.firestore().collection('usernames').where('username', '==', username).get()
            .then(function(querySnapshot) {
                if (!querySnapshot.empty) {
                    setUsernameError({ error: 'Username is unavailable' });
                    setUsernameSuccess({});
                } else {
                    setUsernameSuccess({ success: 'Username is available' });
                    setUsernameError({});
                }
            })
        }
    }

    return {
        checkUsername,
        usernameError,
        usernameSuccess
    };
}

export default useCheckExistingUserName;