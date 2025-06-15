import React from 'react'
import { useSelector ,useDispatch} from 'react-redux'
import { Link ,useNavigate} from 'react-router'
import { BASE_URL } from '../utils/constants'
import axios from 'axios'
import { removeUser } from '../utils/userSlice'
import { removeFeed } from '../utils/feedSlice'
const NavBar = () => {

  const user=useSelector(store=>store.user)
  const dispatch=useDispatch()
  const navigate=useNavigate()

  const handleLogout=async () => {
    try{
      await axios.post(BASE_URL + "/logout",{},{withCredentials:true})
      dispatch(removeUser())
      dispatch(removeFeed())
      navigate('/login')
    }
    catch(err){console.log(err)}
  }
  
  return (
    <div className="navbar bg-base-100 shadow-sm">

    <div className="flex-1">
      <Link to="/" className="btn btn-ghost text-xl">👩‍💻DevTinder</Link>
    </div>

    {user && (<div className="flex gap-4 mx-4">

      <div className="my-2">Welcome {user.firstName}</div>
      <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="LoggedIn User"
            src={user.photoUrl} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <Link to="/profile" className="justify-between">
            Profile
          </Link>
        </li>
        <li><Link to="/connections">Connections</Link></li>
        <li><Link to="/requests">Requests</Link></li>
        <li><a onClick={handleLogout}>Logout</a></li>
      </ul>
    </div>

    </div>)}

  </div>
  )
}

export default NavBar