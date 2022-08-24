import firebase from 'firebase/compat/app';
import { useContext, useState } from 'react';
import { AuthContext } from '../../firebase/context';

const useToggleUserTheme = () => {
    const { user } = useContext(AuthContext);
    const [themeError, setThemeError] = useState({});
    const [themeSuccess, setThemeSuccess] = useState({});

    const toggleUserTheme = async (theme) => {
        setThemeError({});
        setThemeSuccess({});

        await firebase.firestore().collection('users').doc(user.uid)
            .update({
                theme: theme,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            })
            .then(() => {
                setThemeSuccess({ success: 'Your theme settings have been updated.' });
                setThemeError({});
            })
            .catch(function (error) {
                setThemeError({ error: 'Something went wrong updating your theme settings. Please try again.' });
                setThemeSuccess({});
            });
    }

    return {
        toggleUserTheme,
        themeError,
        themeSuccess
    };
}

export default useToggleUserTheme;