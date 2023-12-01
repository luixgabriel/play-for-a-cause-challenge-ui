import Image from 'next/image'
import React from 'react'
import { useAuth } from '../hooks/useauth'
import ProfilePicture from './profile-picture'

const Profile = () => {
  const { user } = useAuth()
  return (
    <div className="flex items-center justify-center gap-3 py-3 px-5 bg-slate-700 bg-opacity-20">
      {user?.imageUrl ? (
        <>
          {' '}
          <Image
            src="https://avatars.githubusercontent.com/u/70019908?v=4"
            width={55}
            height={55}
            className="rounded-full"
            alt="user-photo"
          />
        </>
      ) : (
        <ProfilePicture widht="55" height="55" />
      )}

      <span className="text-lg">{user?.name}</span>
    </div>
  )
}

export default Profile
