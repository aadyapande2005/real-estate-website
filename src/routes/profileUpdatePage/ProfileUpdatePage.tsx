import './ProfileUpdatePage.scss'
import apiRequest from '../../lib/apiRequest'
import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { useAuth } from '../../context/authcontext'
import { useNavigate } from 'react-router-dom'
import UploadWidget from '../../components/uploadWidget/UploadWidget'
//import { Cloudinary } from '@cloudinary/url-gen';
// import { AdvancedImage, responsive, placeholder } from '@cloudinary/react';

function ProfileUpdatePage() {
  const {updateUser, currentUser} = useAuth()

  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [avatar, setAvatar] = useState<string | null | undefined>(currentUser?.avatar);

  const navigate = useNavigate()

  useEffect(() => {
    if (currentUser) currentUser.avatar = avatar
  }, [avatar, currentUser] )

  const handlesubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!currentUser) return;
    const formdata  = new FormData(e.currentTarget)

    const username = formdata.get("username")
    const email = formdata.get("email")
    const password = formdata.get("password")

    try {
      const response = await apiRequest.put("/user/" + currentUser.id, { username, email, password, avatar})

      setError("")
      setMessage("Profile updated successfully")
      updateUser(response.data)
      navigate("/profile")

    } catch (error) {
      console.log(error)
      setError(error instanceof Error ? error.message : String(error))
      setMessage("")
    }      
  }

   // Configuration
  const cloudName = 'dhtxeucrh';
  const uploadPreset = 'estate';


  // Upload Widget Configuration
  const uwConfig = {
    cloudName,
    uploadPreset,
    // Uncomment and modify as needed:
    // cropping: true,
    // showAdvancedOptions: true,
    // sources: ['local', 'url'],
    multiple: false,
    folder: 'avatars',
    // tags: ['users', 'profile'],
    // context: { alt: 'user_uploaded' },
    // clientAllowedFormats: ['images'],
    maxImageFileSize: 2000000,
    // maxImageWidth: 2000,
    // theme: 'purple',
  };

  if (!currentUser) return null;

  return (
    <div className="profile-update">
      <div className="left">

          <form onSubmit={handlesubmit}>
            <h1>Update Profile</h1>
            <div className='user field'>
            <label htmlFor="username">Username</label>
            <input type="text" name='username' id='username' defaultValue={currentUser.username} />
          </div>
          <div className='email field'>
            <label htmlFor="Email">Email</label>
            <input type="email" className='Email' name='email' defaultValue={currentUser.email} />
          </div>
          <div className='password field'>
            <label htmlFor="Password">Password</label>
            <input type="password" id='Password' name='password' />
          </div>
          <button type="submit">
            Update Profile
          </button>
          {error && <span style={{color:"red"}}>{error}</span>}
          {message && <span style={{color:"green"}}>{message}</span>}
          </form>
          

      </div>
      <div className="right">
        <img src={avatar || "/default-profile.avif"} />

        <UploadWidget uwConfig={uwConfig} setState={setAvatar} />

      </div>
    </div>
  )
}

export default ProfileUpdatePage    