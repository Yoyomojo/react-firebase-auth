import firebase from 'firebase/compat/app';
import { useState } from 'react';

const useSetUsersStatus = () => {
    const [statusError, setStatusError] = useState({});
    const [statusSuccess, setStatusSuccess] = useState({});

    const toggleUsersStatus = (status, uid) => {
        setStatusError({});
        setStatusSuccess({});

        firebase.firestore().collection('users').doc(uid)
            .update({
                active: status,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            })
            .catch(() => {
                setStatusError({ message: 'An error occured updating the users status. Please try again.' });
                setStatusSuccess({});
            });
    }

    return {
        toggleUsersStatus,
        statusError,
        statusSuccess
    };
}

export default useSetUsersStatus;