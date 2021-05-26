const users = []
const addUser = ({id,username,room}) =>{
    //console.log(typeof(username))
    username = username.toLowerCase();
    room = room.trim().toLowerCase();

    if(!username || !room){
        return {
            error : "Username and room are required!"
        }
    }
    const existingUser = users.find(user=>{
        return user.room === room && user.username === username
    })

    if(existingUser){
        return {
            error : "Already name is in use ."
        }
    }
    const user = {id,username,room}
    users.push(user)
    // console.log(users)
    return {user}

}

const removeUser = (id) =>{
    const index = users.findIndex(user => user.id === id)
    if(index!== -1){
        return users.splice(index,1)[0];
    }
}
const getUser = (id) => {
    const user = users.find(user => user.id === id)
    return user
}
const getUsersInRoom = (room) =>{
    room = room.trim().toLowerCase();
    const usersAr = users.filter(user=> user.room=== room)
    return usersAr
}

module.exports ={
    addUser,
    getUser,
    removeUser,
    getUsersInRoom
}