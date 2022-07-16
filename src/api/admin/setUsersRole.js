import firebase from 'firebase/compat/app';
import { useState } from 'react';

const useSetUsersRole = () => {
    const [roleError, setRoleError] = useState({});
    const [roleSuccess, setRoleSuccess] = useState({});

    const setUsersRole = (role, uid) => {
        setRoleError({});
        setRoleSuccess({});

        firebase.firestore().collection('users').doc(uid)
            .update({
                role: role,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            })
            .then(() => {
                setRoleSuccess({ message: 'The users role has been updated.' });
                setRoleError({});
            })
            .catch(function (error) {
                setRoleError({ message: 'An error occured updating the users role. Please try again.' });
                setRoleSuccess({});
            });
    }

    return {
        setUsersRole,
        roleError,
        roleSuccess
    };
}

export default useSetUsersRole;