import React, { useState,useEffect } from 'react'
import ioClient from "socket.io-client"
import Sidebar from './Sidebar';
import './Chat.css'
import Message from './Message';

const ENDPOINT = 'localhost:5000';
let socket

function Chat({location}) {

    const[message,setMessage] = useState('')
    const[messages,setMessages] = useState([])
    const[roomData,setRoomData] = useState()
    const[username,setUsername] = useState('')
    const[room,setRoom] = useState('')


    useEffect(() => {
        const obj = location.search.replace('?','').split('&')

        // Getting username,room from the url.
        const username = obj[0].split('=')[1];
        const room = obj[1].split('=')[1];

        setUsername(username)
        setRoom(room)

        socket = ioClient(ENDPOINT);

        socket.emit('join',{username,room},(error)=>{
            if(error){
                alert(error);
            }
        })

    }, [ENDPOINT,location])
    
    useEffect(() => {
          // Recieveing message
          socket.on("message",(message)=>{
            setMessages(messages => [...messages,message])
        })

        // Retreiving the room data
        socket.on('roomData',({users})=>{
            setRoomData(users)
            console.log(roomData)
        })
    }, [])


    const handleChange = (e) =>{
        e.preventDefault()
        
        socket.emit('sendMessage',{username,message,room},(error)=>{


            console.log("Message is delivered");
            if(error){
                
                throw new Error("Message is not sent..");
            }
            //console.log("Message is delivered");
        })
    }
    return (
        <div className="chat">
                <Sidebar className="chat__sidebar" users = {roomData}/>
                <div className="chat__msg">
                   <div className="chat__win">
                   <Message username={username} messages={messages}/>
                    <form className="chat__input">
                        <input className="chat__input_text" type="text" placeholder="Message" 
                            onChange = {e => setMessage(e.target.value)} />
                        <button type="submit" onClick={handleChange} > Send </button>
                    </form>
                   </div>
            </div>
        </div>
    )
}

export default Chat
