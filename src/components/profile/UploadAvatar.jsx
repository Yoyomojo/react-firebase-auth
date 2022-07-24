import Button from '../form/Button';
import useUploadAvatar from '../../api/profile/uploadAvatar';

const UploadAvatar = () => {
    const { uploadUsersAvatar, selectImage, avatarError, avatarSuccess, imagePreview, submitDisabled, user } = useUploadAvatar();

    return (
        <div className='row mb-3'>
            <div className='col'>
                <div className='card'>
                    <h5 className='card-header'>Change Avatar</h5>
                    <div className='card-body'>
                        <div className='row'>
                            <div className='col'>
                                {avatarSuccess.success ?
                                    <div className='col-xs-12 col-sm-12 col-md-6 col-lg-4 ms-auto me-auto'>
                                        <div className='alert alert-success alert-dismissible fade show' role='alert'>
                                            <strong>{avatarSuccess.success}</strong>
                                            <button type='button' className='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>
                                        </div>
                                    </div>
                                    :
                                    null
                                }
                                {avatarError.error ?
                                    <div className='col-xs-12 col-sm-12 col-md-6 col-lg-4 ms-auto me-auto'>
                                        <div className='alert alert-danger alert-dismissible fade show' role='alert'>
                                            <strong>{avatarError.error}</strong>
                                            <button type='button' className='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>
                                        </div>
                                    </div>
                                    :
                                    null
                                }
                            </div>
                        </div>
                        <form id='update-user-avatar' onSubmit={uploadUsersAvatar}>
                            <div className='row mb-3'>
                                <div className='mb -3 col-xs-12 col-sm-12 col-md-6'>
                                    <input type='file' id='uploadAvatar' name='uploadAvatar' accept='image/*' onChange={selectImage} />
                                </div>
                                <div className='col-xs-12 col-sm-12 col-md-6 text-center'>
                                    <p><img className='img-thumbnail' src={imagePreview ? imagePreview : user.avatar} alt='Avatar Preview' width='150px' /></p>
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