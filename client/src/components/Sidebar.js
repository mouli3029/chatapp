import React from 'react'
import './Sidebar.css'

function Sidebar({users}) {
    console.log(users)
    return (
        <div className="sidebar">
            <div className="contents">
            <h1 className="contents_h1">Users</h1>
            {users!== undefined && users.map(user=>{
                return(
                    <li className="li-item" key={user.id}> {user.username} </li>
                )
            })}
            </div>
        </div>
    )
}



export default Sidebar
