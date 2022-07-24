import { useContext, useState } from 'react';
import { AuthContext } from '../../firebase/context';
import useForm from '../../util/useForm';
import validate from '../../util/validateForm';

const ProfilePrivacy = () => {
    const { user } = useContext(AuthContext);
    const [privacy, setPrivacy] = useState(user.isPrivate);

    const { handleProfilePrivacyToggle } = useForm({
        privacyToggle: privacy
    }, validate);
        
    const togglePrivacy = () => {
        setPrivacy(!privacy);
        handleProfilePrivacyToggle(!privacy);
    }

    return (
        <div className='row mb-3'>
            <div className='col'>
                <div className='card'>
                    <h5 className='card-header'>Profile Privacy</h5>
                    <div className='card-body'>
                        <p className='card-text'>Change your profile privacy.</p>
                        <div className='form-check form-switch'>
                            <input className='form-check-input' type='checkbox' id='privacyToggle' name='privacyToggle' defaultChecked={!!privacy} onChange={togglePrivacy} />
                            <label className='form-check-label' htmlFor='privacyToggle'>{privacy ? 'Make Profile Public' : 'Make Profile Private'}</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePrivacy;