import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { addConnections } from '../utils/connectionSlice'
import { useDispatch,useSelector } from 'react-redux'

const Connections = () => {

const dispatch=useDispatch()
const connections=useSelector((state)=>state.connections)

const fetchConnections=async () => {
    try{
        const res=await axios.get(BASE_URL+"/user/connections",{withCredentials:true})
        dispatch(addConnections(res.data.data))
    }
    catch(err){
        console.log(err)
    }
}

useEffect(()=>{fetchConnections()},[])

if(!connections) return 
if(connections.length===0) return <div>No Connections Found</div>

  return (
    <div className=" text-center my-10">
      <h1 className='text-bold text-white text-3xl'>Connections</h1>

      {
        connections.map(connection=>{
          const {_id,firstName,lastName,photoUrl,age,gender,about}=connection
          return (
          <div key={connection._id} className="flex justify-center gap-4 my-4">

            <div className="card card-border bg-blue-600 w-auto">

              <div className="flex-row card-body">
              
                <div>
                  <img alt="photo" className="w-20 h-20 rounded-full object-cover" src={photoUrl} />
                </div>

                <div className="text-left mx-4 ">
                  <h2 className="font-bold text-xl">
                    {firstName + " " + lastName}
                  </h2>
                  {age && gender && <p>{age + ", " + gender}</p>}
                  <p>{about}</p>
                </div>

              </div>

            </div>

          </div>
        )})
      }
    </div>
  )
}

export default Connections