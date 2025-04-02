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
        connections.map(connection=>(
          <div key={connection._id} className="flex justify-center gap-4 my-4">
            <div className="card card-border bg-blue-600 w-48">
              <div className="card-body">
                <div className="flex justify-between">
                    {connection.firstName+" "+connection.lastName}
                </div>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Connections