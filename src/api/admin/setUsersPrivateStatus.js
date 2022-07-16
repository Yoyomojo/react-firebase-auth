import firebase from 'firebase/compat/app';
import { useState } from 'react';

const useSetUsersPrivacyStatus = () => {
    const [privacyError, setPrivacyError] = useState({});
    const [privacySuccess, setPrivacySuccess] = useState({});

    const toggleUsersPrivacyStatus = (status, uid) => {
        setPrivacyError({});
        setPrivacySuccess({});

        firebase.firestore().collection('users').doc(uid)
            .update({
                isPrivate: status,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            })
            .catch(() => {
                setPrivacyError({ message: 'An error occured updating the users status. Please try again.' });
                setPrivacySuccess({});
            });
    }

    return {
        toggleUsersPrivacyStatus,
        privacyError,
        privacySuccess
    };
}

export default useSetUsersPrivacyStatus;