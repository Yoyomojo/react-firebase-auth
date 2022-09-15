import { useContext, useState } from 'react';
import { AuthContext } from '../../firebase/context';
import useForm from '../../util/useForm';
import validate from '../../util/validateForm';

const ProfileTheme = () => {
    const { user } = useContext(AuthContext);
    const [theme, setTheme] = useState(user.theme);

    const { handleThemeToggle } = useForm({
        themeToggle: theme
    }, validate);

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
        handleThemeToggle(theme === 'dark' ? 'light' : 'dark');
    }

    return (
        <div className='row h-100'>
            <div className='col mb-3'>
                <div className={user && user.theme === 'dark' ? 'card bg-dark text-white h-100' : 'card bg-light h-100'}>
                    <h5 className='card-header'>Site theme</h5>
                    <div className='card-body'>
                        <p className='card-text'>Change your site theme. Current theme <b className='text-capitalize'>{theme}</b>.</p>
                        <div className='form-check form-switch'>
                            <input className='form-check-input' type='checkbox' id='themeToggle' name='themeToggle' defaultChecked={theme === 'light' ? false : true} onChange={toggleTheme} />
                            <label className='form-check-label' htmlFor='themeToggle'>{theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileTheme;