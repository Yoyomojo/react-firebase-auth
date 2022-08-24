import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../firebase/context';

const Navigation = () => {
    const { user } = useContext(AuthContext);

    return (
        <nav className={user && user.theme === 'light' ? 'navbar navbar-expand-lg navbar-light bg-light fixed-top' : 'navbar navbar-expand-lg navbar-dark bg-dark fixed-top'}>
            <div className='container-fluid'>
                <Link className='navbar-brand' to='/'>{process.env.REACT_APP_SITE_NAME}</Link>
                <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
                    <span className='navbar-toggler-icon'></span>
                </button>
                {!!user ?
                    <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                        <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                            <li className='nav-item'>
                                <NavLink className='nav-link active' to='/'>Home</NavLink>
                            </li>
                        </ul>
                        <div className='d-flex'>
                            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                                <li className='nav-item dropdown' data-toggle='dropdown'>
                                    <NavLink className='nav-link dropdown-toggle' to='/' id='navbarDropdown' role='button' data-bs-toggle='dropdown' aria-expanded='false'>
                                        <img src={user.avatar ? user.avatar : process.env.REACT_APP_DEFAULT_AVATAR_URL} alt='User Avatar' className={user && user.theme === 'light' ? 'me-2 rounded-circle border border-5 border-dark': 'me-2 rounded-circle border border-5 border-light'} width='50' height='50' /> <span className='text-capitalize'>{user.firstName + ' '+ user.lastName}</span>
                                    </NavLink>
                                    <ul className='dropdown-menu' aria-labelledby='navbarDropdown'>
                                        {user && user.active === true ?
                                            <>
                                                <li><Link className='dropdown-item' to={'/' + user.username}>My Profile</Link></li>
                                                <li><hr className='dropdown-divider' /></li>
                                                <li><Link className='dropdown-item' to={process.env.REACT_APP_USER_SETTINGS_ROUTE}>Account Settings</Link></li>
                                            </>
                                            :
                                            null
                                        }
                                        {user && user.role === process.env.REACT_APP_ADMIN_TITLE && user.active === true ?
                                            <>
                                                <li><hr className='dropdown-divider' /></li>
                                                <li><Link className='dropdown-item' to={process.env.REACT_APP_MANAGE_USERS_ROUTE}>Manage Users</Link></li>
                                            </>
                                            :
                                            null
                                        }
                                        <li><hr className='dropdown-divider' /></li>
                                        <li><Link className='dropdown-item' to={process.env.REACT_APP_LOGOUT_ROUTE}>Sign Out</Link></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                    :
                    <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                        <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                            <li className='nav-item'>
                                <NavLink className='nav-link' to={process.env.REACT_APP_REGISTER_ROUTE}>Register</NavLink>
                            </li>
                            <li className='nav-item'>
                                <NavLink className='nav-link' to={process.env.REACT_APP_LOGIN_ROUTE}>Sign In</NavLink>
                            </li>
                        </ul>
                    </div>
                }
            </div>
        </nav>
    )
}

export default Navigation;