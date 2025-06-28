import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { useState } from 'react';
import { createSocketConnection } from '../utils/constants';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
const Chat = () => {

    // Extract the targetUserId from the URL parameters
    // This assumes that the route is defined as /chat/:targetUserId

    const { targetUserId } = useParams();

    const [messages,setMessages]=useState([])
    const [newMessage,setNewMessage]=useState("");

    const loggedInUser= useSelector((store) => store.user);
    const loggedInUserId=loggedInUser?._id;

    const fetchchat=async ()=>{

        const chats= await axios.get(BASE_URL+"/chat/"+targetUserId,{withCredentials:true})

        console.log(chats.data.messages)

        const chatMessages = chats?.data?.messages.map((message) => {

            const {senderId,text}=message

            return{
                firstName:senderId?.firstName,
                lastName:senderId?.lastName,
                text
            }
        })
        setMessages(chatMessages);
    }

    useEffect(() => {fetchchat()},[])

    useEffect(() => {
        if(!loggedInUserId) return;

        const socket=createSocketConnection();
        socket.emit("joinChat",{loggedInUserId,targetUserId, firstName: loggedInUser.firstName});

        socket.on("receiveMessage", ({firstName,lastName,text}) => {
            setMessages((prevMessages) => [...prevMessages, { firstName,lastName,text }]);
        })

        return () => {
            socket.disconnect();
        }
    },[loggedInUserId,targetUserId]);

    const sendMessage = () => {

        const socket = createSocketConnection();

        socket.emit("sendMessage", {firstName:loggedInUser.firstName,lastName:loggedInUser.lastName,loggedInUserId, targetUserId, text: newMessage});

        setNewMessage("");
    }

  return (
    <div className="flex justify-center min-h-screen"> 
        <div className="w-3/4 h-fit  mx-10 border-2 border-gray-600">
            <div className='text-center text-xl border-2 border-gray-600'>chat</div>
            <div className='h-[55vh] border-2 border-gray-600 overflow-auto p-2'>

                {messages.map((message, index) => {
                    return (<div key={index} className={"chat"+ (message.firstName === loggedInUser.firstName ? " chat-end" : " chat-start")}>
                            <div className="chat-header">
                                {message.firstName +" " + message.lastName}
                            </div>
                            <div className="chat-bubble">{message.text}</div>
                            </div>
                        )
                })}

            </div>
            <div className='w-full flex justify-between gap-4 p-2'>
                <input value={newMessage} onChange={(e)=>{setNewMessage(e.target.value)}}type="text"  placeholder="Type Here..." className='bg-black px-4 w-[85%] text-white'/>
                <button onClick={sendMessage} className='btn btn-primary'>Send</button>
            </div>   
        </div>
    </div>
  )
}

export default Chat