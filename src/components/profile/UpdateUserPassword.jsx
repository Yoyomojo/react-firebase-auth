import { Link } from 'react-router-dom';
import useForm from '../../util/useForm';
import validate from '../../util/validateForm';
import Button from '../form/Button';
import Input from '../form/Input';

const UpdateUserPassword = () => {
    const { inputs, errors, passwordSuccess, passwordError, handleInputChange, handleUpdatePassword } = useForm({
        updatePassword: '',
        currentPassword: '',
        updateConfirmPassword: ''
    }, validate);

    const errorStyle = {
        color: 'red'
    };

    const inputErrorStyle = {
        border: '2px solid red'
    };

    return (
        <div className='row mb-3'>
            <div className='col'>
                <div className='card'>
                    <h5 className='card-header'>Change Password</h5>
                    <div className='card-body'>
                        {passwordSuccess.success ?
                            <div className='col-xs-12 col-sm-12 col-md-6 col-lg-4 ms-auto me-auto'>
                                <div className='alert alert-success alert-dismissible fade show' role='alert'>
                                    <strong>{passwordSuccess.success}</strong>
                                    <button type='button' className='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>
                                </div>
                            </div>
                            :
                            null
                        }
                        {passwordError.error ?
                            <div className='col-xs-12 col-sm-12 col-md-6 col-lg-4 ms-auto me-auto'>
                                <div className='alert alert-danger alert-dismissible fade show' role='alert'>
                                    <strong>{passwordError.error}</strong>
                                    <button type='button' className='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>
                                </div>
                            </div>
                            :
                            null
                        }
                        <form id='update-user-password' onSubmit={handleUpdatePassword}>
                            <div className='row mb-3'>
                                <div className='col-xs-12 col-sm-12 col-md-6 col-lg-4 ms-auto me-auto'>
                                    <p>For security please enter your current password. If you are having trouble you can <Link to={process.env.REACT_APP_FORGOTPASSWORD_ROUTE}>reset your password</Link> instead.</p>
                                    <Input
                                        inputType='password'
                                        inputName='currentPassword'
                                        inputClass='form-control'
                                        inputID='currentPassword'
                                        inputTabIndex='0'
                                        inputPlaceholder='Password'
                                        inputDisabled={false}
                                        onChangeEvent={handleInputChange}
                                        inputValue={inputs.currentPassword}
                                        inputStyle={errors.currentPassword ? inputErrorStyle : null}
                                    />
                                    {errors.currentPassword && <span style={errorStyle}>{errors.currentPassword}</span>}
                                </div>
                            </div>
                            <div className='row mb-3'>
                                <div className='col-xs-12 col-sm-12 col-md-6 col-lg-4 ms-auto me-auto'>
                                    <div className='mb-3'>
                                        <Input
                                            inputType='password'
                                            inputName='updatePassword'
                                            inputClass='form-control'
                                            inputID='updatePassword'
                                            inputTabIndex='0'
                                            inputLabel='New Password'
                                            inputPlaceholder='Password'
                                            inputDisabled={false}
                                            onChangeEvent={handleInputChange}
                                            inputValue={inputs.updatePassword}
                                            inputStyle={errors.updatePassword ? inputErrorStyle : null}
                                        />
                                        {errors.updatePassword && <span style={errorStyle}>{errors.updatePassword}</span>}
                                    </div>
                                </div>
                            </div>
                            <div className='row mb-3'>
                                <div className='col-xs-12 col-sm-12 col-md-6 col-lg-4 ms-auto me-auto'>
                                    <div className='mb-3'>
                                        <Input
                                            inputType='password'
                                            inputName='updateConfirmPassword'
                                            inputClass='form-control'
                                            inputID='updateConfirmPassword'
                                            inputTabIndex='0'
                                            inputLabel='Confirm Password'
                                            inputPlaceholder='Password'
                                            inputDisabled={false}
                                            onChangeEvent={handleInputChange}
                                            inputValue={inputs.updateConfirmPassword}
                                            inputStyle={errors.updateConfirmPassword ? inputErrorStyle : null}
                                        />
                                        {errors.updateConfirmPassword && <span style={errorStyle}>{errors.updateConfirmPassword}</span>}
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='text-center'>
                                    <Button
                                        inputType='submit'
                                        inputName='submitUpdatePWForm'
                                        inputClass='btn btn-primary btn-lg'
                                        inputID='submitUpdatePWForm'
                                        inputLabel='Update Password'
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateUserPassword;