import useGetUserProfile from '../../api/profile/getUserProfile';
import { useParams } from 'react-router-dom';
import Loader from '../loader/Loader';
import { AuthContext } from '../../firebase/context';
import { useContext } from 'react';

const ViewProfile = () => {
    const username = useParams();
    const { user } = useContext(AuthContext);

    const { profileUser, isLoading } = useGetUserProfile(username.username);

    return (
        <>
            {!isLoading && profileUser.username && !!profileUser.isPrivate && !!profileUser.active ? <h1 className='text-center'>This profile is private and cannot be viewed at this time.</h1> : null}
            {!isLoading && profileUser.username && !profileUser.active ? <h1 className='text-center'>This profile is currently inactive.</h1> : null}
            {!isLoading && !profileUser.username ? <h1 className='text-center'>No profile found for <span className='text-capitalize'>{username.username}</span>.</h1> : null}
            {!isLoading && profileUser && !profileUser.isPrivate && !!profileUser.active ?
                <>
                    <div className='row mb-3'>
                        <div className='col text-center'>
                            <img src={profileUser.avatar ? profileUser.avatar : process.env.REACT_APP_DEFAULT_AVATAR_URL} alt='Avatar' className={user && user.theme === 'dark' ? 'rounded-circle border border-5 border-light' : 'rounded-circle border border-5 border-dark'} width='120' height='120' />
                            <h1><span className='text-capitalize fw-bold'>{profileUser.username}</span></h1>
                        </div>
                    </div>
                </>
                :
                null
            }
            {isLoading ? <Loader /> : null}
        </>
    );
};

export default ViewProfile;