"use client";
import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import Navbar from '@/app/components/Nav';
import Chat from '@/app/components/chat';
import UserChat from '@/app/components/userchat';
import { IoSendSharp } from "react-icons/io5";
import { PiSmileyStickerFill } from "react-icons/pi";
import EmojiPicker from 'emoji-picker-react';
import { roomStore } from '@/store/roomStore';
import { userStore } from '@/store/userStore';

export default function Page() {

    const roomId = roomStore((state : any) => state.roomId) 
    const username = userStore((state : any) => state.username) 
    const avatar = userStore((state:any) => state.avatarUrl)

    const [socket,setSocket] = useState<any>(null)
  //  const [newMessage,setNewMessage] = useState("")
    const [messages,setMessages] = useState<any []>([])
  //  const [myMessages,setMyMessages] = useState<any []>([])
    
    const[isOpen,setIsOpen] = useState(false)
    const[text,setText] = useState("")
    
    useEffect(() => {

        const socket = new WebSocket(`ws://localhost:3000/`);

        socket.onopen = () => {
            console.log('WebSocket connection opened');     
            socket.send(JSON.stringify({
                type:"join",
                payload:{
                    roomId,
                }
            }))   
            
        };

        socket.onmessage = (event ) => {
            const data = JSON.parse(event.data)
            setMessages((prevMessages) => [...prevMessages, data])
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

    function handleSubmit(){
        socket.send(JSON.stringify({
            type:"chat",
            payload:{
                roomId,
                message:text,
                username,
                avatar
            }
        }))  
    }

    
    return (
        <div className='bg-primaryColor h-screen pt-8'>
        <Navbar/>
        <div className=' max-w-[1200px] m-auto font-sans mt-10'>
           
          <h1 className='text-slate-300 font-semibold text-[24px] tracking-wide'>Room <span className='font-thin'>#{roomId}</span></h1>
           <div className='mt-2 flex gap-2'>
           <div className='w-[700px] h-[500px] bg-slate-700 rounded-xl p-3 overflow-y-scroll'>
            <div className='flex flex-col gap-2'>
                {
                    messages.map((x) => {
                        if(x.username !== username) return <Chat username={x.username} message={x.message} key={nanoid(8)} />
                        else return  <UserChat message={x.message} key={nanoid(8)}/>
                    })
                }
           

            </div>
           </div>
          

           <div className='w-[450px] h-[500px] bg-slate-900 rounded-lg flex flex-col justify-between p-2 '>
            {/* <div className='px-4'>
                <h1 className='text-[20px] text-slate-500'>Joined</h1>
                <div className='flex flex-col gap-2'>
                <div className='text-[16px] text-slate-500'>abhiifour</div>
                </div>
               
            </div> */}
            <div className='py-4 '>
            <EmojiPicker open={isOpen} height={400} width={435} theme='dark' onEmojiClick={(e)=> setText((state)=> state + e.emoji)}/>
            </div>
           <div className="gap-2 flex py-1">
                    <textarea name="message" id="message"  className="bg-slate-700 px-2 py-3 rounded-lg border-none outline-none text-[15px] w-[85%] text-slate-400" value={text} onChange={(e) => setText(e.target.value)}></textarea>
                    <div className='text-slate-500 text-[32px] flex items-center' onClick={() => setIsOpen(!isOpen)}>
                    <PiSmileyStickerFill />
                    </div>
                    <button className="bg-slate-700 px-4 py-1 text-[16px] text-center rounded-full text-slate-300" onClick={() =>{
                        handleSubmit()
                        setText("")
                    }}><IoSendSharp /></button>
                   
                   </div>
                   
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