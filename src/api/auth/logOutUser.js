import firebase from 'firebase/compat/app';

const logOutUser = async (event) => {
    event.preventDefault();
    await firebase.auth().signOut()
        .then(function () {
            window.location = process.env.REACT_APP_LOGIN_ROUTE
        })
        .catch(function(error) {
            // display error messages
        });
}

export default logOutUser;