import { Link } from 'react-router-dom';
import useForm from '../../util/useForm';
import validate from '../../util/validateForm';
import ErrorAlert from '../alerts/ErrorAlert';
import SuccessAlert from '../alerts/SuccessAlert';
import Button from '../form/Button';
import Input from '../form/Input';
import { useContext } from 'react';
import { AuthContext } from '../../firebase/context';

const UpdateUserPassword = () => {
    const { user } = useContext(AuthContext);

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
        <div className='row h-100'>
            <div className='col mb-3'>
                <div className={user && user.theme === 'light' ? 'card bg-light h-100' : 'card text-white bg-dark h-100'}>
                    <h5 className='card-header'>Change Password</h5>
                    <div className='card-body'>
                        {passwordSuccess.success ?
                            <div>
                                <SuccessAlert alertMessage={passwordSuccess.success} />
                            </div>
                            :
                            null
                        }
                        {passwordError.error ?
                            <div>
                                <ErrorAlert alertMessage={passwordError.error} />
                            </div>
                            :
                            null
                        }
                        <form id='update-user-password' onSubmit={handleUpdatePassword}>
                            <div className='row mb-3'>
                                <div className='col-xs-12 col-sm-12'>
                                    <p>For security please enter your current password. If you are having trouble you can <Link to={process.env.REACT_APP_FORGOTPASSWORD_ROUTE}>reset your password</Link> instead.</p>
                                    <Input
                                        inputType='password'
                                        inputName='currentPassword'
                                        inputClass='form-control'
                                        inputID='currentPassword'
                                        inputTabIndex='0'
                                        inputPlaceholder='Current Password'
                                        inputDisabled={false}
                                        onChangeEvent={handleInputChange}
                                        inputValue={inputs.currentPassword}
                                        inputStyle={errors.currentPassword ? inputErrorStyle : null}
                                    />
                                    {errors.currentPassword && <span style={errorStyle}>{errors.currentPassword}</span>}
                                </div>
                            </div>
                            <div className='row mb-3'>
                                <div className='col-xs-12 col-sm-12'>
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
                                <div className='col-xs-12 col-sm-12'>
                                    <div className='mb-3'>
                                        <Input
                                            inputType='password'
                                            inputName='updateConfirmPassword'
                                            inputClass='form-control'
                                            inputID='updateConfirmPassword'
                                            inputTabIndex='0'
                                            inputLabel='Confirm New Password'
                                            inputPlaceholder='Confirm New Password'
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
                                <div className='col text-center'>
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