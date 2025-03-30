import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router'
const NavBar = () => {

  const user=useSelector(store=>store.user)
  return (
    <div className="navbar bg-base-100 shadow-sm">

    <div className="flex-1">
      <Link to="/" className="btn btn-ghost text-xl">DevTinder</Link>
    </div>

    <div className="flex gap-4 mx-4">

      {user && <div className="my-2">Welcome {user.firstName}</div>}
      <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
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
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>

    </div>

  </div>
  )
}

export default NavBar