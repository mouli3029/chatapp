import React from 'react'
import Moment from 'react-moment';
import "./MessageOne.css"

function MessageOne({username,message}) {
    const messagedUser = message.username;
    const currentUser  = username;
    let isMatch = messagedUser === currentUser ? true : false
    return (
        isMatch ? 
        <div className="message right">
            <p>{message.username}</p>
            <p>
                {message.text} - 
                <Moment date={message.createdAt} format="hh:mm">
            </Moment>
            </p>
        </div>
        :
        <div className="message">
            <p>{message.username}</p>
            <p>
                {message.text} - 
                <Moment date={message.createdAt} format="hh:mm">
            </Moment>
            </p>
        </div>
    )
}

export default MessageOne
