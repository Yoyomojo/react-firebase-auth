import useUploadAvatar from '../../api/profile/uploadAvatar';
import ErrorAlert from '../alerts/ErrorAlert';
import SuccessAlert from '../alerts/SuccessAlert';
import Button from '../form/Button';

const UploadAvatar = () => {
    const { uploadUsersAvatar, resizeImage, avatarError, avatarSuccess, submitDisabled, user } = useUploadAvatar();

    return (
        <div className='row mb-3'>
            <div className='col'>
                <div className='card'>
                    <h5 className='card-header'>Change Avatar</h5>
                    <div className='card-body'>
                        <div className='row'>
                            <div className='col'>
                                {avatarSuccess.success ?
                                    <SuccessAlert alertMessage={avatarSuccess.success} />
                                    :
                                    null
                                }
                                {avatarError.error ?
                                    <ErrorAlert alertMessage={avatarError.error} />
                                    :
                                    null
                                }
                            </div>
                        </div>
                        <form id='update-user-avatar' onSubmit={uploadUsersAvatar}>
                            <div className='row mb-3'>
                                <div className='mb-3 col-xs-12 col-sm-12 col-md-6'>
                                    <input type='file' id='avatar-input' name='avatar-input' accept='image/*' onChange={resizeImage} />
                                </div>
                                <div className='col-xs-12 col-sm-12 col-md-6 text-center'>
                                    <img id='avatar-preview' alt='avatar preview' className='img-thumbnail img-fluid' src={user.avatar} width='300'></img>
                                    {/* <p><img className='img-thumbnail' src={imagePreview ? imagePreview : user.avatar} alt='Avatar Preview' width='150px' /></p> */}
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col text-center'>
                                    <Button
                                        inputDisabled={submitDisabled}
                                        inputType='submit'
                                        inputName='submitAvatarForm'
                                        inputClass='btn btn-primary btn-lg'
                                        inputID='submitAvatarForm'
                                        inputLabel='Upload Avatar'
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UploadAvatar;