import io from 'socket.io-client'

let BASE_URL="https://devtinder-backend-v7ia.onrender.com"

if(location.hostname === "localhost") BASE_URL="http://localhost:2607"

const createSocketConnection=()=>{
    if(location.hostname === "localhost")  return io(BASE_URL)
    else return io(BASE_URL,{path:"/socket.io"})
};

export { BASE_URL, createSocketConnection };
