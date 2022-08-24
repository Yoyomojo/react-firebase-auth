import DeleteAccount from "./DeleteAccount";
import ProfilePrivacy from "./ProfilePrivacy";
import ProfileTheme from "./ProfileTheme";
import UpdateUserPassword from "./UpdateUserPassword";
import UploadAvatar from "./UploadAvatar";
import UserInformation from "./UserInformation";

const UserSettings = () => {
    return (
        <>
            <div className='row mb-3'>
                <div className='col'>
                    <h1>Account Settings</h1>
                    <hr />
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                    <UploadAvatar />
                </div>
                <div className='col'>
                    <div className='row'>
                        <div className='col'>
                            <ProfilePrivacy />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <ProfileTheme />
                        </div>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col-xs-12 col-sm-12 col-md-6'>
                    <UserInformation />
                </div>
                <div className='col-xs-12 col-sm-12 col-md-6'>
                    <UpdateUserPassword />
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                    <DeleteAccount />
                </div>
            </div>
        </>
    )
}

export default UserSettings;