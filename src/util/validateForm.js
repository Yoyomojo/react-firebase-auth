const validate = (inputs) => {
    const errors = {};
    // auth validations Register, Login, Forgot Password
    if (typeof inputs.firstName !== 'undefined' && !inputs.firstName) {
        errors.firstName = 'Please enter a valid first name'
    }
    if (typeof inputs.firstName !== 'undefined' && inputs.firstName.length < 2) {
        errors.firstName = 'First name must be at least 2 characters'
    }
    if (typeof inputs.lastName !== 'undefined' && !inputs.lastName) {
        errors.lastName = 'Please enter a valid last name'
    }
    if (typeof inputs.lastName !== 'undefined' && inputs.lastName.length < 2) {
        errors.lastName = 'Last name must be at least 2 characters'
    }
    if (typeof inputs.email !== 'undefined' && !inputs.email) {
        errors.email = 'Please enter an email address';
    }
    if (typeof inputs.email !== 'undefined' && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(inputs.email)) {
        errors.email = 'Please enter a valid email address';
    }
    if (typeof inputs.username !== 'undefined' && !inputs.username) {
        errors.username = 'Please enter a username'
    }
    if (typeof inputs.username !== 'undefined' && inputs.username.length < 2) {
        errors.username = 'Username must be at least 2 characters'
    }
    if (typeof inputs.username !== 'undefined' && inputs.username.length >= 2 && !/^[A-Za-z][A-Za-z0-9._-]{1,29}$/i.test(inputs.username)) {
        errors.username = 'Please enter a valid username'
    }
    if (typeof inputs.password !== 'undefined' && !inputs.password) {
        errors.password = 'Please enter a password'
    }
    if (typeof inputs.password !== 'undefined' && inputs.password && inputs.password.length < 8) {
        errors.password = 'Password must be at least 8 characters'
    }
    if (typeof inputs.confirmPassword !== 'undefined' && inputs.password !== inputs.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match'
    }
    // update account info validations
    if (typeof inputs.infoFirstName !== 'undefined' && !inputs.infoFirstName) {
        errors.infoFirstName = 'Please enter a valid first name'
    }
    if (typeof inputs.infoFirstName !== 'undefined' && inputs.infoFirstName && inputs.infoFirstName.length < 2) {
        errors.infoFirstName = 'First name must be at least 2 characters'
    }
    if (typeof inputs.infoLastName !== 'undefined' && !inputs.infoFirstNinfoLastNameame) {
        errors.infoLastName = 'Please enter a valid last name'
    }
    if (typeof inputs.infoLastName !== 'undefined' && inputs.infoLastName && inputs.infoLastName.length < 2) {
        errors.infoLastName = 'Last name must be at least 2 characters'
    }
    if (typeof inputs.infoEmail !== 'undefined' && !inputs.infoEmail) {
        errors.infoEmail = 'Please enter an email address';
    }
    if (typeof inputs.infoEmail !== 'undefined' && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(inputs.infoEmail)) {
        errors.infoEmail = 'Please enter a valid email address';
    }
    if (typeof inputs.infoPassword !== 'undefined' && !inputs.infoPassword) {
        errors.infoPassword = 'Please enter your password'
    }
    if (typeof inputs.infoPassword !== 'undefined' && inputs.infoPassword && inputs.infoPassword.length < 7) {
        errors.infoPassword = 'Password must be at least 8 characters'
    }
    // update password validation
    if (typeof inputs.currentPassword !== 'undefined' && !inputs.currentPassword) {
        errors.currentPassword = 'Please enter your current password'
    }
    if (typeof inputs.updatePassword !== 'undefined' && !inputs.updatePassword) {
        errors.updatePassword = 'Please enter your new password'
    }
    if (typeof inputs.updatePassword !== 'undefined' && inputs.updatePassword && inputs.updatePassword.length < 8) {
        errors.updatePassword = 'Password must be at least 8 characters'
    }
    if (typeof inputs.updateConfirmPassword !== 'undefined' && inputs.updatePassword !== inputs.updateConfirmPassword) {
        errors.updateConfirmPassword = 'Passwords do not match'
    }
    // delete account validation
    if (typeof inputs.deleteUserPassword !== 'undefined' && !inputs.deleteUserPassword) {
        errors.deleteUserPassword = 'Please enter your password'
    }
    if (typeof inputs.deleteUserPassword !== 'undefined' && inputs.deleteUserPassword && inputs.deleteUserPassword.length < 8) {
        errors.deleteUserPassword = 'Password must be at least 8 characters'
    }
    return errors;
}

export default validate;