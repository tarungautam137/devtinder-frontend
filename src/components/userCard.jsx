import React from 'react'

const UserCard = ({user}) => {
    const {firstName, lastName}=user
  return (
    <div className="card bg-base-300 w-96  shadow-sm">
    <figure>
    <img
      src="https://as2.ftcdn.net/v2/jpg/03/60/90/07/1000_F_360900705_uXsGkXMosq4T69jwIgluj9wDeEX9EWQy.jpg"
      alt="Shoes" />
    </figure>
    <div className="card-body">
    <h2 className="card-title">{firstName +" "+lastName}</h2>
    <div className="card-actions justify-center">
      <button className="btn btn-primary">Ignore</button>
      <button className="btn btn-primary">Interested</button>
    </div>
    </div>
    </div>
  )
}

export default UserCard