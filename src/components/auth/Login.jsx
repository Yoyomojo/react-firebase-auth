import { Link } from 'react-router-dom';
import useForm from '../../util/useForm';
import validate from '../../util/validateForm';
import Button from '../form/Button';
import Input from '../form/Input';

const Login = () => {
    const { inputs, handleInputChange, handleLoginSubmit, errors, loginError } = useForm({
        email: '',
        password: ''
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
                <div className='col-xl-5 col-lg-10 col-sm-12 col-xs-12 ms-auto me-auto'>
                    <div className='card border-dark bg-light mb-3'>
                        <div className='card-header'>Sign In</div>
                        <div className='card-body text-dark'>
                            <h5 className='card-title'>Welcome!</h5>
                            <p className='card-text'>Sign in to your account below.</p>
                            {loginError && loginError.error ?
                                <div className='alert alert-danger fade show' role='alert'>
                                    <strong>{loginError.error}</strong>
                                </div>
                            :
                                null
                            }
                            <form id='login-form' onSubmit={handleLoginSubmit}>
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
                                    <div className='col'>
                                        <Input
                                            inputType='password'
                                            inputName='password'
                                            inputClass='form-control'
                                            inputID='password'
                                            inputTabIndex='0'
                                            inputLabel='Password'
                                            inputDisabled={false}
                                            onChangeEvent={handleInputChange}
                                            inputValue={inputs.password}
                                            inputStyle={errors.password ? inputErrorStyle : null}
                                        />
                                        {errors.password && <span style={errorStyle}>{errors.password}</span>}
                                    </div>
                                </div>
                                <div className='row mb-3'>
                                    <div className='col text-center'>
                                        <Button
                                            inputType='submit'
                                            inputName='submitLoginForm'
                                            inputClass='btn btn-primary'
                                            inputID='submitLoginForm'
                                            inputLabel='Sign In'
                                        />
                                    </div>
                                </div>
                            </form>
                            <div className='row mb-3'>
                                <div className='col'>
                                    <p className='text-center fw-normal fs-6 text-muted'>Need an account? <Link to={process.env.REACT_APP_REGISTER_ROUTE}>Create your free account</Link>.</p>
                                    <p className='text-center fw-normal fs-6 text-muted'>Forgot your password? <Link to={process.env.REACT_APP_FORGOTPASSWORD_ROUTE}>Reset your password</Link>.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;