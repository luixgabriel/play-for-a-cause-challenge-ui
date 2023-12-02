import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import ProfilePicture from './profile-picture'
import LoadingScreen from './loading-screen'
import { Power } from 'lucide-react'
import Cookies from 'js-cookie'

const Profile = () => {
  const [isHovered, setIsHovered] = useState(false)
  const logout = () => {
    Cookies.remove('token')
    localStorage.removeItem('user')
    window.location.reload()
  }
  const { user } = useAuth()

  return (
    <div className="flex items-center justify-center gap-3 py-3 px-5 bg-slate-700 bg-opacity-20">
      {!user && <LoadingScreen />}
      {user?.imageUrl ? (
        <>
          {' '}
          <div className="w-12 h-12 overflow-y-hidden rounded-full flex items-center justify-center">
            <Image
              src={user.imageUrl}
              width={100}
              height={100}
              className="rounded-lg"
              alt="user-photo"
            />
          </div>
        </>
      ) : (
        <ProfilePicture widht="55" height="55" />
      )}

      <span className="text-lg">{user?.name}</span>

      <Power
        color={isHovered ? 'red' : '#55ff1c'}
        className="cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={logout}
      />
    </div>
  )
}

export default Profile
