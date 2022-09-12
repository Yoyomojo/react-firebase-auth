import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../firebase/context';
import useForm from '../../util/useForm';
import validate from '../../util/validateForm';
import Button from '../form/Button';
import Input from '../form/Input';

const ForgotPassword = () => {
    const { user } = useContext(AuthContext);

    const { inputs, handleInputChange, handlePasswordResetSubmit, errors, resetError, resetSuccess } = useForm({
        email: ''
    }, validate);

    const errorStyle = {
        color: 'red'
    };

    const inputErrorStyle = {
        border: '2px solid red'
    };

    return (
        <>
            <div className='row'>
                <div className='col-xl-5 col-lg-6 col-sm-12 col-xs-12 ms-auto me-auto'>
                    <div className={user && user.theme === 'dark' ? 'card bg-dark text-light mb-3' : 'card text-dark bg-light mb-3'}>
                        <div className='card-header'>Reset Password</div>
                        <div className='card-body'>
                            <p className='card-text'>Reset your password below.</p>
                            {resetError && resetError.error ?
                                <div className='alert alert-danger fade show' role='alert'>
                                    <strong>{resetError.error}</strong>
                                </div>
                                :
                                null
                            }
                            {resetSuccess && resetSuccess.success ?
                                <div className='alert alert-success fade show' role='alert'>
                                    <strong>{resetSuccess.success}</strong>
                                </div>
                                :
                                null
                            }
                            <form id='reset-password-form' onSubmit={handlePasswordResetSubmit}>
                                <div className='row mb-3'>
                                    <div className='col'>
                                        <Input
                                            inputType='email'
                                            inputName='email'
                                            inputClass='form-control'
                                            inputID='email'
                                            inputTabIndex='0'
                                            inputLabel='Email Address'
                                            inputPlaceholder='you@domain.com'
                                            inputDisabled={false}
                                            onChangeEvent={handleInputChange}
                                            inputValue={inputs.email}
                                            inputStyle={errors.email ? inputErrorStyle : null}
                                        />
                                        {errors.email && <span style={errorStyle}>{errors.email}</span>}
                                    </div>
                                </div>
                                <div className='row mb-3'>
                                    <div className='col text-center'>
                                        <Button
                                            inputType='submit'
                                            inputName='submitResetForm'
                                            inputClass='btn btn-primary'
                                            inputID='submitResetForm'
                                            inputLabel='Reset Password'
                                        />
                                    </div>
                                </div>
                            </form>
                            {!user ?
                                <div className='row mb-3'>
                                    <div className='col'>
                                        <p className='text-center fw-normal fs-6 text-muted'>Need an account? <Link to={process.env.REACT_APP_REGISTER_ROUTE}>Create your free account</Link>.</p>
                                        <p className='text-center fw-normal fs-6 text-muted'>Already have an account? <Link to={process.env.REACT_APP_LOGIN_ROUTE}>Sign in</Link>.</p>
                                    </div>
                                </div>
                                :
                                null
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword;