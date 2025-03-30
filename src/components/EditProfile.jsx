import {React ,useState}from 'react'
import UserCard from './userCard';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const EditProfile = ({data}) => {
    const [firstName,setfirstName]=useState(data.firstName);
    const [lastName,setlastName]=useState(data.lastName);
    const [error,setError]=useState("");
    const [showToast,setShowToast]=useState(false);
    const dispatch=useDispatch()

    const saveProfile=async()=>{
        try{
            const res=await axios.patch(BASE_URL+"/profile/edit",{firstName,lastName},{withCredentials:true})
            dispatch(addUser(res?.data?.data))

            setShowToast(true)
            setTimeout(() => {
                setShowToast(false)
            }, 3000);
        }
        catch(err){
            setError(err.message)
        }
    }

  return (
    
    <div className="flex gap-8 justify-center items-center my-10">

    <div className="flex justify-center">
    <div className="card card-border bg-blue-600 w-96">
    <div className="card-body">
    <h2 className="card-title flex justify-center">Edit Profile</h2>

    <div>
      <label className="input validator">
        <div className="label">
            <span className="label-text">First Name</span>
        </div>
      <input type="text" value={firstName} onChange={(e)=>{setfirstName(e.target.value)}}  required/>
      </label>
    </div>

    <div>
    <label className="input validator">
    <div className="label">
            <span className="label-text">Last Name</span>
    </div>
    <input type="text" value={lastName} onChange={(e)=>{setlastName(e.target.value)}} required  />
    </label>

    </div>
    <p className="text-red-50"> {error}</p>
    <div className="card-actions justify-center"> 
      <button className="btn btn-primary" onClick={saveProfile}>Save Profile</button>
    </div>

    </div>
    </div>
        </div>
        <UserCard user={{firstName,lastName}}/>

        {showToast && <div className="toast toast-center toast-middle">
        <div className="alert alert-success">
        <span>Profile Saved Successfully</span>
        </div>
        </div>}
    </div>
  )
}

export default EditProfile