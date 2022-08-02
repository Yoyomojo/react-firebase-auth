import firebase from 'firebase/compat/app';
import { useEffect, useState } from 'react';

const useGetUserProfile = (username) => {
    const [profileUser, setProfileUser] = useState([]);
    const [profileError, setProfileError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const useID = username;

    const getUserProfile = async (useID) => {
        await firebase.firestore()
            .collection('users')
            .where('username', '==', useID)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach(function(doc) {
                    setProfileUser(doc.data());
                });
                setIsLoading(false);
            })
            .catch(() => {
                setIsLoading(false);
                setProfileError({ error: 'An error occured loading this profile.' });
            });
    };

    useEffect(() => {
        getUserProfile(useID);
    }, [useID]);

    return {
        getUserProfile,
        isLoading,
        profileUser,
        profileError
    };
}

export default useGetUserProfile;