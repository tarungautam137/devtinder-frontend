import React,{useState} from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router';
import { BASE_URL } from '../utils/constants';
const Login = () => {

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [firstName,setfirstName]=useState("");
  const [lastName,setLastName]=useState("");
  const [error,setError]=useState("");
  const [isLoginForm,setIsLoginForm]=useState(true);


  const dispatch=useDispatch();
  const navigate=useNavigate();

  const handleLogin= async ()=>{
    
    try{
      const res=await axios.post( BASE_URL+"/login",{email,password},{withCredentials:true})
      dispatch(addUser(res.data))
      navigate("/")
    }
    catch(err){
      setError(err?.response?.data)
      console.log(err)}  
  }

  const handleSignUp= async ()=>{
    try{

      const res=await axios.post( BASE_URL+"/signup",{email,password,firstName,lastName},{withCredentials:true})
      console.log(res.data)
      dispatch(addUser(res.data.data))
      navigate("/profile")
    }
    catch(err){
      setError(err?.response?.data)
      console.log(err)
    }
  }

  return (
    <div className="flex justify-center">
    <div className="card card-border bg-blue-600 w-96">
    <div className="card-body">
    <h2 className="card-title">{isLoginForm?"Login":"Sign Up"}</h2>


    {!isLoginForm && <div>
    <fieldset className="fieldset">
    <legend className="fieldset-legend">First Name</legend>
    <input type="text" className="input" placeholder="Type here" value={firstName} onChange={(e)=>setfirstName(e.target.value)} />
    </fieldset>

    <fieldset className="fieldset">
    <legend className="fieldset-legend">Last Name</legend>
    <input type="text" className="input" placeholder="Type here"  value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
    </fieldset>
    </div>}


    <div>
      <label className="input validator">
      <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></g></svg>
      <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder="Enter email Id" required/>
      </label>
    <div className="validator-hint hidden">Enter valid email address</div>
    </div>

    <div>
      <label className="input validator">
      <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle></g></svg>
      <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} required placeholder="Password"  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must be more than 8 characters, including number, lowercase letter, uppercase letter" />
      </label>
      <p className="validator-hint hidden">
      Must be more than 8 characters, including
      <br/>At least one number
      <br/>At least one lowercase letter
      <br/>At least one uppercase letter
      </p>
    </div>
    
    <p className='text-black-500'>{error}</p>
    <div className="card-actions justify-center">
      <button className="btn btn-primary" onClick={isLoginForm?handleLogin:handleSignUp}>{isLoginForm? "Login" :"Sign Up"}</button>
    </div>
    <div className="text-center cursor-pointer" onClick={()=>setIsLoginForm(value=>!value)}>{isLoginForm?"New User? Sign Up Here":"Existing User Login Here"}</div>
    </div>
    </div>
    </div>
  )
}

export default Login