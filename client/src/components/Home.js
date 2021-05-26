import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import './Home.css'


function Home() {
    const [name, setName] = useState("");
    const [room,setRoom] = useState("");

    return (
        <div className="home">
            <form className="home_login">
                <h1>Join Room</h1>
                <input 
                    className="home__input"
                    onChange={e => setName(e.target.value)}
                    type="text" placeholder="Username"/>
                <input
                    className ="home__input"
                    onChange={e=> setRoom(e.target.value)}
                    type="text" placeholder="Room" required/>
                {name && room ? 
                <Link to={`/room?username=${name}&room=${room}`}>
                <button className="btn">Join Room</button>
                </Link> 
                :
                <Link to={`/room?username=${name}&room=${room}`}>
                <button className="disable" disabled>Join Room</button>
                </Link>
               }
            </form>
        </div>
    )
}

export default Home
