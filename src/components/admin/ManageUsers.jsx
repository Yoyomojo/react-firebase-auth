import styled from 'styled-components';
import useResetUsersAvatar from '../../api/admin/resetUsersAvatar';
import useResetUsersPassword from '../../api/admin/sendPWResetEmail';
import useSetUsersStatus from '../../api/admin/setUsersActiveStatus';
import useSetUsersPrivacyStatus from '../../api/admin/setUsersPrivateStatus';
import useSetUsersRole from '../../api/admin/setUsersRole';
import useGetUsersList from '../../api/getUsersList';

const CustomSwitch = styled.input`
    font-size:2rem;
    width:4rem;
    .form-switch &.form-check-input {
        margin-left:auto;
    }
`;

const ManageUsers = () => {
    const { users, lastKey, getNextUsersSet } = useGetUsersList();
    const { resetPassword } = useResetUsersPassword();
    const { toggleUsersStatus } = useSetUsersStatus();
    const { resetAvatar } = useResetUsersAvatar();
    const { toggleUsersPrivacyStatus } = useSetUsersPrivacyStatus();
    const { setUsersRole } = useSetUsersRole();

    const userStatusValueOnChange = (uid) => {
        const status = document.getElementById(uid + '-active').checked;
        toggleUsersStatus(status, uid);
    }

    const userPrivacyValueOnChange = (uid) => {
        const status = document.getElementById(uid + '-privacy').checked;
        toggleUsersPrivacyStatus(status, uid);
    }

    const userRoleOnChange = (e, uid) => {
        const role = e.target.value;
        setUsersRole(role, uid);
    }

    return (
        <>
            <div className='row mb-3'>
                <div className='col'>
                    <h1>Manage Users</h1>
                    <hr />
                </div>
            </div>

            <div className='row'>
                <div className='col table-responsive'>
                    <table className='table table-striped table-bordered table-hover table-sm align-middle'>
                        <thead className='table-dark text-center'>
                            <tr>
                                <th>Account Active</th>
                                <th scope='col'>Role</th>
                                <th scope='col'>Is Private</th>
                                <th scope='col'>Avatar</th>
                                <th scope='col'>UID</th>
                                <th scope='col'>Name</th>
                                <th scope='col'>Email</th>
                                <th scope='col'>Created</th>
                                <th scope='col'>Updated</th>
                            </tr>
                        </thead>
                        <tbody className='table-light'>
                            {users && users.map((user, index) => {
                                return (
                                    <tr key={index} className='text-center'>
                                        <td>
                                            <div className='form-check form-switch'>
                                                <CustomSwitch className='form-check-input' type='checkbox' name={user.data.uid + '-active'} id={user.data.uid + '-active'} defaultChecked={user.data.active ? true : false} onChange={() => userStatusValueOnChange(user.data.uid)} />
                                            </div>
                                        </td>
                                        <td className='text-capitalize'>
                                            <select className='form-select' name={user.data.uid + '-role'} id={user.data.uid + '-role'} defaultValue={user.data.role} onChange={(e) => userRoleOnChange(e, user.data.uid)}>
                                                <option value={process.env.REACT_APP_USER_TITLE.toLowerCase()}>{process.env.REACT_APP_USER_TITLE}</option>
                                                <option value={process.env.REACT_APP_ADMIN_TITLE.toLowerCase()}>{process.env.REACT_APP_ADMIN_TITLE}</option>
                                            </select>
                                        </td>
                                        <td>
                                            <div className='form-check form-switch'>
                                                <CustomSwitch className='form-check-input' type='checkbox' name={user.data.uid + '-privacy'} id={user.data.uid + '-privacy'} defaultChecked={user.data.isPrivate ? true : false} onChange={() => userPrivacyValueOnChange(user.data.uid)} />
                                            </div>
                                        </td>
                                        <td>
                                            <p><img src={user.data.avatar} alt='User Avatar' className='rounded-circle border border-5 border-dark mt-2' width='50' height='50' /></p>
                                            <p><button className='btn btn-primary btn-md' onClick={() => resetAvatar(user.data.uid)} disabled={user.data.avatar === process.env.REACT_APP_DEFAULT_AVATAR_URL ? true : false}>Reset Avatar</button></p>
                                        </td>
                                        <td>{user.data.uid}</td>
                                        <td className='text-capitalize'>{user.data.firstName} {user.data.lastName}</td>
                                        <td>
                                            <p><a href={'mailto:' + user.data.email}>{user.data.email}</a></p>
                                            <p><button className='btn btn-primary btn-md col-xs-12' onClick={() => resetPassword(user.data.email)}>Send Password Reset Email</button></p>
                                        </td>
                                        <td>{new Date(user.data.createdAt.seconds * 1000).toLocaleDateString() + ' at ' + new Date(user.data.createdAt.seconds * 1000).toLocaleTimeString()}</td>
                                        <td>{new Date(user.data.updatedAt.seconds * 1000).toLocaleDateString() + ' at ' + new Date(user.data.updatedAt.seconds * 1000).toLocaleTimeString()}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    {lastKey ?
                        <div className='row mt-3'>
                            <div className='col'>
                                <p className='text-center'>
                                    <button type='button' className='btn btn-primary btn-lg' onClick={() => getNextUsersSet(lastKey)}>Load More Users</button>
                                </p>
                            </div>
                        </div>
                        :
                        <p className='text-center'>No more users</p>
                    }
                </div>
            </div>
        </>
    );
};

export default ManageUsers;