import React from 'react'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch,useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import { useEffect } from 'react'
import UserCard from './userCard'
import { useNavigate } from 'react-router'

const Feed = () => {

  const data=useSelector(store=>store.feed)
  const dispatch=useDispatch()
  const navigate=useNavigate()

  const getFeed = async () =>{
    try{
      if(!data){
        const feedData=await axios.get(BASE_URL +"/feed",{withCredentials:true})
        dispatch(addFeed(feedData.data))
      }
    }
    catch(err){
      console.log(err)
      if(err.response.data==="Please login to access this resource") navigate('/login')
    }
  }

  useEffect(()=>{getFeed()},[])

  if(!data) return
  if(data.length===0) return <h1 className='text-xl text-center '>No new Users found</h1>
  
  return data &&(
    <div className='flex justify-center my-2'>
      <UserCard user={data[0]}/>
    </div>
  )
}

export default Feed