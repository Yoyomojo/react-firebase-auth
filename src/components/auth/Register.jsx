import { Link } from 'react-router-dom';
import useForm from '../../util/useForm';
import validate from '../../util/validateForm';
import Button from '../form/Button';
import Input from '../form/Input';

const Register = () => {
    const { inputs, handleInputChange, handleRegistrationSubmit, checkUsername, errors, regError, usernameError, usernameSuccess } = useForm({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
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
                    <div className='card border-dark bg-light mb-3'>
                        <div className='card-header'>Create Your Account</div>
                        <div className='card-body text-dark'>
                            <h5 className='card-title'>Welcome!</h5>
                            <p className='card-text'>Create your free account below.</p>
                            {regError && regError.error ?
                                <div className='alert alert-danger fade show' role='alert'>
                                    <strong>{regError.error}</strong>
                                </div>
                                :
                                null
                            }
                            <form id='registration-form' onSubmit={handleRegistrationSubmit}>
                                <div className='row mb-3'>
                                    <div className='col'>
                                        <Input
                                            inputType='text'
                                            inputName='firstName'
                                            inputClass='form-control'
                                            inputID='firstName'
                                            inputTabIndex='0'
                                            inputLabel='First Name'
                                            inputPlaceholder='First Name'
                                            inputDisabled={false}
                                            onChangeEvent={handleInputChange}
                                            onKeyupEvent={handleInputChange}
                                            inputValue={inputs.firstName}
                                            inputStyle={errors.firstName ? inputErrorStyle : null}
                                        />
                                        {errors.firstName && <span style={errorStyle}>{errors.firstName}</span>}
                                    </div>
                                    <div className='col'>
                                        <Input
                                            inputType='text'
                                            inputName='lastName'
                                            inputClass='form-control'
                                            inputID='lastName'
                                            inputTabIndex='0'
                                            inputLabel='Last Name'
                                            inputPlaceholder='Last Name'
                                            inputDisabled={false}
                                            onChangeEvent={handleInputChange}
                                            onKeyupEvent={handleInputChange}
                                            inputValue={inputs.lastName}
                                            inputStyle={errors.lastName ? inputErrorStyle : null}
                                        />
                                        {errors.lastName && <span style={errorStyle}>{errors.lastName}</span>}
                                    </div>
                                </div>
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
                                            onKeyupEvent={handleInputChange}
                                            inputValue={inputs.email}
                                            inputStyle={errors.email ? inputErrorStyle : null}
                                        />
                                        {errors.email && <span style={errorStyle}>{errors.email}</span>}
                                    </div>
                                </div>
                                <div className='row mb-3'>
                                    <div className='col'>
                                        <Input
                                            inputType='text'
                                            inputName='username'
                                            inputClass='form-control'
                                            inputID='username'
                                            inputTabIndex='0'
                                            inputLabel='Username (2-30 Characters)'
                                            inputPlaceholder='yourawesomeusername'
                                            inputDisabled={false}
                                            onChangeEvent={handleInputChange}
                                            onKeyupEvent={checkUsername}
                                            inputValue={inputs.username}
                                            inputStyle={errors.username || usernameError.error ? inputErrorStyle : null}
                                        />
                                        {errors.username && <span style={errorStyle}>{errors.username}</span>}
                                        {usernameError && inputs.username && !errors.username ? <span style={errorStyle}>{usernameError.error}</span> : null}
                                        {usernameSuccess && inputs.username && !errors.username ? <span className='text-success'>{usernameSuccess.success}</span> : null}
                                    </div>
                                </div>
                                <div className='row mb-3'>
                                    <div className='col-xs-12 col-sm-12 col-md-6 mb-3'>
                                        <Input
                                            inputType='password'
                                            inputName='password'
                                            inputClass='form-control'
                                            inputID='password'
                                            inputTabIndex='0'
                                            inputLabel='Password (Min 8 characters)'
                                            inputDisabled={false}
                                            onChangeEvent={handleInputChange}
                                            onKeyupEvent={handleInputChange}
                                            inputValue={inputs.password}
                                            inputStyle={errors.password ? inputErrorStyle : null}
                                        />
                                        {errors.password && <span style={errorStyle}>{errors.password}</span>}
                                    </div>
                                    <div className='col-xs-12 col-sm-12 col-md-6 mb-3'>
                                        <Input
                                            inputType='password'
                                            inputName='confirmPassword'
                                            inputClass='form-control'
                                            inputID='confirmPassword'
                                            inputTabIndex='0'
                                            inputLabel='Confirm Password'
                                            inputDisabled={false}
                                            onChangeEvent={handleInputChange}
                                            onKeyupEvent={handleInputChange}
                                            inputValue={inputs.confirmPassword}
                                            inputStyle={errors.confirmPassword ? inputErrorStyle : null}
                                        />
                                        {errors.confirmPassword && <span style={errorStyle}>{errors.confirmPassword}</span>}
                                    </div>
                                </div>
                                <div className='row mb-3'>
                                    <div className='col text-center'>
                                        <Button
                                            inputType='submit'
                                            inputName='submitRegistrationForm'
                                            inputClass='btn btn-primary'
                                            inputID='submitRegistrationForm'
                                            inputLabel='Create Account'
                                        />
                                    </div>
                                </div>
                            </form>
                            <div className='row'>
                                <div className='col'>
                                    <p className='text-center fw-normal fs-6 text-muted'>Already have an account? <Link to={process.env.REACT_APP_LOGIN_ROUTE}>Sign in</Link>.</p>
                                    <p className='text-center fw-normal fs-6 text-muted'>Forgot your password? <Link to={process.env.REACT_APP_FORGOTPASSWORD_ROUTE}>Reset your password</Link>.</p>
                                    <p className='text-center fw-normal fs-6 text-muted'>By registering, you agree to our<br /><Link to={process.env.REACT_APP_TOS_ROUTE}>Terms of Service</Link> and <Link to={process.env.REACT_APP_PRIVACY_ROUTE}>Privacy Policy</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register;