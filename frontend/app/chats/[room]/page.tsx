"use client";

import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import Navbar from '@/app/components/Nav';
import { GradientBackground } from '@/app/components/GradientBackground';
import Chat from '@/app/components/chat';


export default function Page() {
    const [socket,setSocket] = useState<any>(null)
    const [newMessage,setNewMessage] = useState("")
    const [messages,setMessages] = useState<any []>([])
    const [myMessages,setMyMessages] = useState<any []>([])
    const[username,setUsername] = useState<string>("")
    
    useEffect(() => {

        const socket = new WebSocket(`ws://localhost:3000/`);

        socket.onopen = () => {
            console.log('WebSocket connection opened');
            
        };

        socket.onmessage = (event ) => {
           // console.log( JSON.parse(event.data));
           // setNewMessage(event.data)
          //  setMessages([...messages,event.data])
            setMessages((prevMessages) => [...prevMessages, event.data])
          //  console.log(event?.username)
          //  console.log(messages)
        };

        socket.onclose = () => {
            console.log('WebSocket connection closed');
        };

        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
        setSocket(socket)
        return () => {
            socket.close();
        };
    }, []);

    
    return (
        <div className='bg-primaryColor h-screen pt-8'>
        <Navbar/>
        <div className=' max-w-[1200px] m-auto font-sans mt-10'>
           
          <h1 className='text-slate-300 font-semibold text-[24px] tracking-wide'>Room <span className='font-thin'>#</span>4325</h1>
           <div className='mt-2 flex gap-2'>
           <div className='w-[700px] h-[500px] bg-slate-700 rounded-xl'>
            <div>
             <Chat/>
            </div>
           </div>

           <div className='w-[450px] h-[500px] bg-slate-900 rounded-lg '>

           </div>

           </div>
           
                {/* <div>
                    <h1>MY MESSAGES</h1>
                    {
                        myMessages.map(item => <div key={item}>{item}</div>)
                    }
                </div>
                <div>
                    <h1>OTHERS MESSAGES</h1>
                    {
                        messages.map(item => <div key={item}>{item}</div>)
                    }
                </div> */}
                
                
          
        </div>
        </div>
    )
}