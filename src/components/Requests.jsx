import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../utils/constants'
import { addRequest,removeRequest } from '../utils/requestSlice'
import { useEffect } from 'react'
import axios from 'axios'
const Requests = () => {

  const dispatch=useDispatch()
  const requests=useSelector(store=>store.requests)

  const fetchRequests=async()=>{
    try{
      const res=await axios.get(BASE_URL+'/user/requests',{withCredentials:true})
      dispatch(addRequest(res.data.data))
    }catch(error){
      console.error(error)
    }
  }

  const reviewRequest=async(status,id)=>{

    try{
      const res=await axios.post(BASE_URL+'/request/review/'+status+"/"+id,{},{withCredentials:true});
      dispatch(removeRequest(id))
    }catch(error){
      console.error(error)
    }
  }

useEffect(()=>{fetchRequests()},[])

if(!requests) return 
if(requests.length===0) return <div>No Requests Found</div>

  return (
    <div className=" text-center my-10  ">
      <h1 className='text-bold text-white text-3xl'>Connection Requests</h1>

      {
        requests.map(request=>{

          const {firstName, lastName,photoUrl,age,gender,about}=request.fromUserId
          return (
          <div key={request._id} className="flex justify-center gap-4 my-4 ">

            <div className=" flex-row card card-border bg-gray-400 w-100 items-center">

              <div className="card-body">

                <div className='object-contain'>
                <img alt="photo" className="w-20 h-20 rounded-full"src={photoUrl}/>
                </div>


                <div className="text-left mx-4 ">
                  <h2 className="font-bold text-xl">
                  {firstName + " " + lastName}
                  </h2>
                  {age && gender && <p>{age + ", " + gender}</p>}
                  <p>{about}</p>
                </div>

              </div>

              <div className="flex gap-4 mx-4">
              <button className="btn btn-primary" onClick={()=>reviewRequest("accepted",request._id)}>Accept</button>
              <button className="btn btn-secondary" onClick={()=>reviewRequest("rejected",request._id)}>Reject</button>
              </div>

            </div>

          </div>
        )})
      }
    </div>
  )
}

export default Requests