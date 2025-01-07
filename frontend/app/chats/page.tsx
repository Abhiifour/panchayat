"use client"
import Image from "next/image";
import Navbar from "../components/Nav";
import Card from "../components/avatarCard";
import { useState } from "react";

import { userStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import { roomStore } from "@/store/roomStore";


const profileAvatars = [
    {
        title:'avatar1',
        url:"/assets/1.jpeg"
    },
    {
        title:'avatar2',
        url:"/assets/2.jpeg"
    },
    {
        title:'avatar3',
        url:"/assets/3.jpeg"
    },
    {
        title:'avatar4',
        url:"/assets/4.jpeg"
    },
    {
        title:'avatar5',
        url:"/assets/5.jpeg"
    },
    {
        title:'avatar6',
        url:"/assets/6.jpeg"
    },
    {
        title:'avatar7',
        url:"/assets/7.jpeg"
    },
    {
        title:'avatar8',
        url:"/assets/8.jpeg"
    },
    {
        title:'avatar9',
        url:"/assets/9.jpeg"
    },
    {
        title:'avatar10',
        url:"/assets/10.jpeg"
    },
    {
        title:'avatar11',
        url:"/assets/11.jpeg"
    },
    {
        title:'avatar12',
        url:"/assets/12.jpeg"
    },
    {
        title:'avatar13',
        url:"/assets/13.jpeg"
    },
    {
        title:'avatar14',
        url:"/assets/14.jpeg"
    },
    {
        title:'avatar15',
        url:"/assets/15.jpeg"
    },
    {
        title:'avatar16',
        url:"/assets/16.jpeg"
    }
]

export default function(){
    const updateUsername = userStore((state : any) => state.updateUsername)
    const username:string = userStore((state : any) => state.username)
    const avatar : string= userStore((state : any) => state.avatarUrl);
    const router = useRouter()
    const roomId = roomStore((state : any) => state.roomId)
   
    //console.log(username,avatar)
    // const [username , setUsername] = useState("JohnDoe46")

    // const [avatar , setAvatar] = useState("/assets/1.jpeg")
    return (<div className="bg-primaryColor h-screen pt-8">
        <Navbar/>
        <div className="w-[1200px] m-auto flex gap-6 mt-4  ">
           <div className="flex gap-3 flex-col">
           <h1 className="text-[24px] text-slate-400">Pick Avatar</h1>
             <div className='w-[690px] h-[500px] bg-slate-700 rounded-xl p-3 overflow-y-scroll'>
                        <div className='flex flex-wrap gap-3' >
                            {                                
                                profileAvatars.map((x) =>  <Card url={x.url} title={x.title} key={x.title}/>)
                            }                   
                        </div>
                       </div>
           </div>
           <div className="flex gap-6 flex-col">
           <div className="flex flex-col gap-3">
           <h1 className="text-[24px] text-slate-400">Username</h1>
            <input 
                onChange={(e) => updateUsername(e.target.value)}
                type="text" 
                className="bg-slate-700 px-2 py-1 rounded-lg border-none outline-none text-[16px] h-[40px] text-slate-400" 
            />
           </div>

            <div>
                <div className="flex gap-3 items-center">
                    <div className="w-[60px] h-[60px] bg-slate-600 rounded-full overflow-hidden">
                        <Image src={avatar} alt="profile" width={60} height={60} />
                    </div>
                    <div className="text-[18px] text-slate-400">
                       {username}
                    </div>
                </div>
            </div>
            <button className="bg-slate-700 px-4 py-2 text-[16px] text-center rounded-lg text-slate-400 w-[120px] hover:bg-slate-600 hover:text-slate-300 ease-in-out transition-all duration-200" onClick={() => 
            {router.push(`/chats/${roomId}`)
            // const socket = new WebSocket(`ws://localhost:3000/`);

            // socket.onopen = () => {
            //     console.log('WebSocket connection opened');        
            // }

            // socket.onerror = (error) => {
            //     console.error('WebSocket error:', error);
            // };
            }}>Save</button>
           </div>
        </div>
    </div>)
}


