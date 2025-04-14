import React from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { removeUserFromFeed } from '../utils/feedSlice'
import axios from 'axios'

const UserCard = ({user}) => {

    const {firstName, lastName,_id,photoUrl,age,gender,about}=user
    const dispatch=useDispatch()

    const handleClick=async (status,userid)=>{
      try{
        const res=await axios.post(BASE_URL+"/request/send/"+status+"/"+userid,{},{withCredentials:true})
        dispatch(removeUserFromFeed(userid))
      }
      catch(err){
        console.log(err)
      }
    }

  return (
    <div className="card bg-base-300 w-96  shadow-sm">
    <figure>
    <img
      src={photoUrl}
      alt="Person" />
    </figure>
    <div className="card-body">
    <h2 className="card-title">{firstName +" "+lastName}</h2>
    {age && gender && <p>{age + ", " + gender}</p>}
    <p>{about}</p>
    <div className="card-actions justify-center">
      <button className="btn btn-primary" onClick={()=>handleClick("ignored",_id)}>Ignore</button>
      <button className="btn btn-primary" onClick={()=>handleClick("interested",_id)}>Interested</button>
    </div>
    </div>
    </div>
  )
}

export default UserCard