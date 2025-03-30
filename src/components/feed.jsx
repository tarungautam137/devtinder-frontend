import React from 'react'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch,useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import { useEffect } from 'react'
import UserCard from './userCard'

const Feed = () => {

  const data=useSelector(store=>store.feed)
  const dispatch=useDispatch()

  const getFeed = async () =>{
    try{
      if(!data){
        const feedData=await axios.get(BASE_URL +"/feed",{withCredentials:true})
        dispatch(addFeed(feedData.data))
      }
    }
    catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{getFeed()},[])

  return data &&(
    <div className='flex justify-center my-10'>
      <UserCard user={data[0]}/>
    </div>
  )
}

export default Feed