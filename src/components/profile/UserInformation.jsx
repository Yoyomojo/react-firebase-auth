import { useContext } from 'react';
import { AuthContext } from '../../firebase/context';
import useForm from '../../util/useForm';
import validate from '../../util/validateForm';
import ErrorAlert from '../alerts/ErrorAlert';
import SuccessAlert from '../alerts/SuccessAlert';
import Button from '../form/Button';
import Input from '../form/Input';

const UserInformation = () => {
    const { user } = useContext(AuthContext);

    const { inputs, errors, accountError, accountSuccess, handleInputChange, handleUpdateAccountInfoSubmit } = useForm({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        infoPassword: ''
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
                <div className={user && user.theme === 'dark' ? 'card bg-dark text-white h-100' : 'card bg-light h-100'}>
                    <h5 className='card-header'>Personal Information</h5>
                    <div className='card-body'>
                        <div className='row'>
                            {accountSuccess.success ?
                                <div>
                                    <SuccessAlert alertMessage={accountSuccess.success} />
                                </div>
                                :
                                null
                            }
                            {accountError.error ?
                                <div>
                                    <ErrorAlert alertMessage={accountError.error} />
                                </div>
                                :
                                null
                            }
                            <form id='update-password' onSubmit={handleUpdateAccountInfoSubmit}>
                                <div className='col'>
                                    <div className='row mb-3'>
                                        <div className='col-xs-12 col-sm-12'>
                                            <div className='row'>
                                                <div className='col-6'>
                                                    <Input
                                                        inputType='text'
                                                        inputName='infoFirstName'
                                                        inputClass='form-control text-capitalize'
                                                        inputID='infoFirstName'
                                                        inputTabIndex='0'
                                                        inputLabel='First Name'
                                                        inputPlaceholder='First Name'
                                                        inputDisabled={false}
                                                        onChangeEvent={handleInputChange}
                                                        inputDefaultValue={user.firstName}
                                                        inputValue={inputs.infoFirstName}
                                                        inputStyle={errors.infoFirstName ? inputErrorStyle : null}
                                                    />
                                                    {errors.infoFirstName && <span style={errorStyle}>{errors.infoFirstName}</span>}
                                                </div>
                                                <div className='col-6'>
                                                    <Input
                                                        inputType='text'
                                                        inputName='infoLastName'
                                                        inputClass='form-control text-capitalize'
                                                        inputID='infoLastName'
                                                        inputTabIndex='0'
                                                        inputLabel='Last Name'
                                                        inputPlaceholder='Last Name'
                                                        inputDisabled={false}
                                                        onChangeEvent={handleInputChange}
                                                        inputDefaultValue={user.lastName}
                                                        inputValue={inputs.infoLastName}
                                                        inputStyle={errors.infoLastName ? inputErrorStyle : null}
                                                    />
                                                    {errors.infoLastName && <span style={errorStyle}>{errors.infoLastName}</span>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row mb-3'>
                                        <div className='col-xs-12 col-sm-12'>
                                            <Input
                                                inputType='email'
                                                inputName='infoEmail'
                                                inputClass='form-control'
                                                inputID='infoEmail'
                                                inputTabIndex='0'
                                                inputLabel='Email Address'
                                                inputPlaceholder='you@infoEmail.com'
                                                inputDisabled={false}
                                                onChangeEvent={handleInputChange}
                                                inputDefaultValue={user.email}
                                                inputValue={inputs.infoEmail}
                                                inputStyle={errors.infoEmail ? inputErrorStyle : null}
                                            />
                                            {errors.infoEmail && <span style={errorStyle}>{errors.infoEmail}</span>}
                                        </div>
                                    </div>
                                    <div className='row mb-3'>
                                        <div className='col-xs-12 col-sm-12'>
                                            <Input
                                                inputType='password'
                                                inputName='infoPassword'
                                                inputClass='form-control'
                                                inputID='infoPassword'
                                                inputTabIndex='0'
                                                inputLabel='For security please enter your current password'
                                                inputPlaceholder='Current Password'
                                                inputDisabled={false}
                                                onChangeEvent={handleInputChange}
                                                inputValue={inputs.infoPassword}
                                                inputStyle={errors.infoPassword ? inputErrorStyle : null}
                                            />
                                            {errors.infoPassword && <span style={errorStyle}>{errors.infoPassword}</span>}
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col text-center'>
                                            <Button
                                                inputType='submit'
                                                inputName='submitUserInfoForm'
                                                inputClass='btn btn-primary btn-lg'
                                                inputID='submitUserInfoForm'
                                                inputLabel='Update Information'
                                            />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserInformation;