import firebase from 'firebase/app';
import { useContext, useState } from 'react';
import { AuthContext } from '../../firebase/context';

const useToggleProfilePrivacy = () => {
    const { user } = useContext(AuthContext);
    const [privacyError, setPrivacyError] = useState({});
    const [privacySuccess, setPrivacySuccess] = useState({});

    const toggleProfilePrivacy = async (privacy) => {
        setPrivacyError({});
        setPrivacySuccess({});

        await firebase.firestore().collection('users').doc(user.uid)
            .update({
                isPrivate: privacy,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            })
            .then(() => {
                setPrivacySuccess({ success: 'Your privacy settings have been updated.' });
                setPrivacyError({});
            })
            .catch(function (error) {
                setPrivacyError({ error: 'Something went wrong updating your privacy settings. Please try again.' });
                setPrivacySuccess({});
            });
    }

    return {
        toggleProfilePrivacy,
        privacyError,
        privacySuccess
    };
}

export default useToggleProfilePrivacy;