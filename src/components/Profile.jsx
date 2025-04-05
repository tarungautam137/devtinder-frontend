import React from 'react'
import EditProfile from './EditProfile'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
const Profile = () => {

  const data=useSelector(store=>store.user)
  const Navigate=useNavigate()

    return data && (
    <div>
      <EditProfile data={data}/>
    </div>
  )
}

export default Profile