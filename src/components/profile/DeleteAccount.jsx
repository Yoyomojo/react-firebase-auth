import useForm from '../../util/useForm';
import validate from '../../util/validateForm';
import Input from '../form/Input';

const DeleteAccount = () => {
    const { inputs, errors, deleteAccountSuccess, deleteAccountError, handleInputChange, handleDeleteUserAccount } = useForm({
        deleteUserPassword: ''
    }, validate);

    const errorStyle = {
        color: 'red'
    };

    const inputErrorStyle = {
        border: '2px solid red'
    };

    return (
        <div className='mb-3'>
            <div className='card'>
                <h5 className='card-header text-white bg-danger'>Danger Zone!!!</h5>
                <div className='card-body'>
                    <h4 className='card-text fw-bolder text-danger text-center mb-3'>Account deletion cannot be undone. All of your data will be removed.</h4>
                    {deleteAccountSuccess.success ?
                        <div className='col-xs-12 col-sm-12 col-md-6 col-lg-4 ms-auto me-auto'>
                            <div className='alert alert-success alert-dismissible fade show' role='alert'>
                                <strong>{deleteAccountSuccess.success}</strong>
                                <button type='button' className='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>
                            </div>
                        </div>
                        :
                        null
                    }
                    {deleteAccountError.error ?
                        <div className='col-xs-12 col-sm-12 col-md-6 col-lg-4 ms-auto me-auto'>
                            <div className='alert alert-danger alert-dismissible fade show' role='alert'>
                                <strong>{deleteAccountError.error}</strong>
                                <button type='button' className='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>
                            </div>
                        </div>
                        :
                        null
                    }
                    <form id='delete-user-account' onSubmit={handleDeleteUserAccount}>
                        <div className='row mb-3'>
                            <div className='col-xs-12 col-sm-12 col-md-6 col-lg-4 ms-auto me-auto'>
                                <Input
                                    inputType='password'
                                    inputName='deleteUserPassword'
                                    inputClass='form-control'
                                    inputID='deleteUserPassword'
                                    inputTabIndex='0'
                                    inputLabel='For security please enter your current password'
                                    inputPlaceholder='Current Password'
                                    inputDisabled={false}
                                    onChangeEvent={handleInputChange}
                                    inputValue={inputs.deleteUserPassword}
                                    inputStyle={errors.deleteUserPassword ? inputErrorStyle : null}
                                />
                                {errors.deleteUserPassword && <span style={errorStyle}>{errors.deleteUserPassword}</span>}
                            </div>
                        </div>
                        <div className='d-grid gap-2 d-xs-block d-md-flex justify-content-md-center mt-3'>
                            <button className='btn btn-danger btn-lg' type='submit'>Delete Account</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default DeleteAccount;