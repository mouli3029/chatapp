import React,{Fragment} from 'react'
import MessageOne from './MessageOne'
import ScrollToBottom from 'react-scroll-to-bottom'
import './Message.css'

function Message({username,messages}) {
    return (
        <Fragment>
            <div className="top">
                <h3 className="username">{username.toUpperCase()}</h3>
            </div>
        <ScrollToBottom className="messages">
          {messages.map(message =>(
                    <MessageOne key={messages.indexOf(message)} username={username} message={message}></MessageOne>
                ))}
        </ScrollToBottom>
        </Fragment>
    )
}

export default Message
