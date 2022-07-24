import DeleteAccount from "./DeleteAccount";
import ProfilePrivacy from "./ProfilePrivacy";
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
                <ProfilePrivacy />
                <UserInformation />
                <UpdateUserPassword />
                <DeleteAccount />
            </div>
        </div>
        </>
    )
}

export default UserSettings;