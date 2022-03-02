import logOutUser from '../../api/auth/logOutUser';
import Button from '../form/Button';

const Logout = () => {
    return (
        <>
            <div className='row mb-3'>
                <div className='col text-center'>
                    <p>Sign out of your account?</p>
                </div>
            </div>
            <div className='row mb-3'>
                <div className='col text-center'>
                    <Button
                        inputType='button'
                        inputName='logoutUser'
                        inputClass='btn btn-primary'
                        inputID='logoutUser'
                        inputLabel='Sign Out'
                        inputClickEvent={logOutUser}
                    />
                </div>
            </div>
        </>
    )
}

export default Logout;