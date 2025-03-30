import React from 'react'
import EditProfile from './EditProfile'
import { useSelector } from 'react-redux'
const Profile = () => {
  const data=useSelector(store=>store.user)
  return data && (
    <div>
      <EditProfile data={data}/>
    </div>
  )
}

export default Profile