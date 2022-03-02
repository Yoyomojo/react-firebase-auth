import { useEffect, useState } from 'react';
import firebase from 'firebase/app';

const useGetUsersList = () => {
    const [usersError, setUsersError] = useState({});
    const [usersSuccess, setUsersSuccess] = useState({});
    const [lastKey, setLastKey] = useState();
    const [users, setUsers] = useState();

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        setUsersError({});
        setUsersSuccess({});

        await firebase.firestore()
            .collection('users')
            .orderBy('createdAt', 'desc')
            .limit(10)
            .get()
            .then((querySnapshot) => {
                if (!querySnapshot.empty) {
                    let usersList = [];

                    querySnapshot.forEach((doc) => {
                        usersList.push({
                            uid: doc.id,
                            data: doc.data(),
                            createdAt: doc.data().createdAt,
                            updatedAt: doc.data().updatedAt
                        });
                    });

                    setUsers(usersList);
                    setLastKey(usersList[usersList.length - 1].createdAt);
                }
            })
            .catch((error) => {
                console.log('Error getting documents: ', error);
            });
    };

    const getNextUsersSet = async (lastKnownKey) => {
        await firebase.firestore()
            .collection('users')
            .orderBy('createdAt', 'desc')
            .startAfter(lastKnownKey)
            .limit(10)
            .get()
            .then((querySnapshot) => {
                if (!querySnapshot.empty) {
                    let usersList = [];
                    querySnapshot.forEach((doc) => {
                        usersList.push({
                            rid: doc.id,
                            data: doc.data(),
                            createdAt: doc.data().createdAt,
                            updatedAt: doc.data().updatedAt
                        });
                    });

                    setUsers(users.concat(usersList));
                    setLastKey(usersList[usersList.length - 1].createdAt);
                } else {
                    setLastKey();
                }
            })
            .catch((error) => {
                console.log('Error getting documents: ', error);
            });
    }

    return {
        getUsers,
        getNextUsersSet,
        usersError,
        usersSuccess,
        lastKey,
        users
    };
}

export default useGetUsersList;