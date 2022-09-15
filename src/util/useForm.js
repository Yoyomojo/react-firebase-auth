import { useState } from 'react';
import useLoginUser from '../api/auth/loginUser';
import useRegisterUser from '../api/auth/registerUser';
import useResetPassword from '../api/auth/resetPassword';
import useToggleProfilePrivacy from '../api/profile/toggleProfilePrivacy';
import useUpdateAccountInfo from '../api/profile/updateAccountInformation';
import useUpdateUserPassword from '../api/profile/updateUserPassword';
import useDeleteAccount from '../api/profile/deleteUserAccount';
import useCheckExistingUserName from '../api/auth/checkExistingUserName';
import useToggleUserTheme from '../api/profile/toggleUserTheme';

const useForm = (initialValues, validate) => {
    const [inputs, setInputs] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const { privacySuccess, privacyError, toggleProfilePrivacy} = useToggleProfilePrivacy();
    const { accountError, accountSuccess, updateAccountInformation } = useUpdateAccountInfo();
    const { passwordSuccess, passwordError, updateUserPassword } = useUpdateUserPassword();
    const { deleteAccountSuccess, deleteAccountError, deleteUserAccount } = useDeleteAccount();
    const { themeSuccess, themeError, toggleUserTheme} = useToggleUserTheme();

    // use our custom auth hooks nad pass any firebase errors in to here
    const { regError, registerUser } = useRegisterUser();
    const { loginError, loginUser } = useLoginUser();
    const { resetError, resetSuccess, resetPassword } = useResetPassword();
    const { usernameError, usernameSuccess, checkUsername } = useCheckExistingUserName();

    const handleRegistrationSubmit = (event) => {
        event.preventDefault();
        const validationErrors = validate(inputs);
        const noErrors = Object.keys(validationErrors).length === 0 && Object.keys(usernameError).length === 0;
        setErrors(validationErrors);
        if (noErrors) {
            registerUser(event);
        } else {
            // Halt any submission attempt herex
        }
    }

    const handleLoginSubmit = (event) => {
        event.preventDefault();
        const validationErrors = validate(inputs);
        const noErrors = Object.keys(validationErrors).length === 0;
        setErrors(validationErrors);
        if (noErrors) {
            loginUser(event);
        } else {
            // Halt any submission attempt here
        }
    }

    const handlePasswordResetSubmit = (event) => {
        event.preventDefault();
        const validationErrors = validate(inputs);
        const noErrors = Object.keys(validationErrors).length === 0;
        setErrors(validationErrors);
        if (noErrors) {
            resetPassword(event);
        } else {
            // Halt any submission attempt here
        }
    }

    const handleProfilePrivacyToggle = (privacy) => {
        const validationErrors = validate(inputs);
        const noErrors = Object.keys(validationErrors).length === 0;
        setErrors(validationErrors);
        if (noErrors) {
            toggleProfilePrivacy(privacy);
        } else {
            // Halt any submission attempt here
        }
    }

    const handleThemeToggle = (theme) => {
        const validationErrors = validate(inputs);
        const noErrors = Object.keys(validationErrors).length === 0;
        setErrors(validationErrors);
        if (noErrors) {
            toggleUserTheme(theme);
        } else {
            // Halt any submission attempt here
        }
    }

    const handleUpdateAccountInfoSubmit = (event) => {
        event.preventDefault();
        const validationErrors = validate(inputs);
        const noErrors = Object.keys(validationErrors).length === 0;
        setErrors(validationErrors);
        if (noErrors) {
            updateAccountInformation(event);
        } else {
            // Halt any submission attempt here
        }
    }

    const handleUpdatePassword = (event) => {
        event.preventDefault();
        const validationErrors = validate(inputs);
        const noErrors = Object.keys(validationErrors).length === 0;
        setErrors(validationErrors);
        if (noErrors) {
            updateUserPassword(event);
        } else {
            // Halt any submission attempt here
        }
    }

    const handleDeleteUserAccount = (event) => {
        event.preventDefault();
        const validationErrors = validate(inputs);
        const noErrors = Object.keys(validationErrors).length === 0;
        setErrors(validationErrors);
        if (noErrors) {
            deleteUserAccount(event);
        } else {
            // Halt any submission attempt here
        }
    }

    const handleInputChange = (event) => {
        setInputs(inputs => ({ ...inputs, [event.target.name]: event.target.value }));
    }

    return {
        handleRegistrationSubmit,
        handleLoginSubmit,
        handlePasswordResetSubmit,
        handleInputChange,
        handleProfilePrivacyToggle,
        handleUpdateAccountInfoSubmit,
        updateAccountInformation,
        handleUpdatePassword,
        handleDeleteUserAccount,
        checkUsername,
        handleThemeToggle,
        accountError,
        accountSuccess,
        inputs,
        errors,
        regError,
        loginError,
        resetError,
        resetSuccess,
        privacySuccess,
        privacyError,
        passwordSuccess,
        passwordError,
        deleteAccountSuccess,
        deleteAccountError,
        usernameSuccess,
        usernameError,
        themeSuccess,
        themeError
    };
}

export default useForm;