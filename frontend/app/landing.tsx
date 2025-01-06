"use client";

import  {motion} from "framer-motion" 
import { useState } from "react";


export default function Landing(){
    const [isvisible, setIsVisible] = useState(false)
    const [isJoinVisible, setIsJoinVisible] = useState(false)

    return <div className="text-[54px] flex flex-col items-center justify-center text-center mt-48 text-slate-50 gap-10 font-sans">
        <motion.div
        
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100 , duration: 400 }}
            className="tracking-tighter"
          
        >
            {["Connect,", "Collaborate,", "Converse"].map((word, index) => (
                <motion.span
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.5 }}
                >
                    {word}{" "}
                </motion.span>
            ))}
           <br />
        <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
        >
            Your Chat Room, Reimagined.
        </motion.span>
        </motion.div>
        <div className="flex gap-4">
        <motion.div
            className="w-[200px] py-2 text-[22px] border border-slate-400 rounded-full shadow-lg cursor-pointer text-slate-300 tracking-tight"
           
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            onClick={() => {
                setIsVisible(false)
                setIsJoinVisible(!isJoinVisible)}}
            
        >
          Join Room
        </motion.div>

        <motion.div
            className="w-[200px] py-2 text-[22px] border border-slate-400 rounded-full shadow-lg cursor-pointer text-slate-300 tracking-tight"
           
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            onClick={() => {
                setIsJoinVisible(false)
                setIsVisible(!isvisible)}}
        >
            Create Room
        </motion.div>
        </div>
        {
            isvisible && (
                <motion.div 
                    initial={{ opacity: 0, y: 1 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-slate-300 text-[18px] px-10 py-4 bg-slate-800 rounded-lg tracking-wider ease-in transition-all"
                >
                    Room Id : 43253
                </motion.div>
            )
        }


        {  
            isJoinVisible && (
                <motion.div 
                    initial={{ opacity: 0, y: 1 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-slate-300 text-[18px] px-10 py-4 bg-slate-800 rounded-lg tracking-wider flex flex-col gap-2 items-center justify-center"
                >
                   
                   <div className="gap-2 flex">
                   <input 
                        type="text" 
                        className="bg-slate-700 px-2 py-1 rounded-lg border-none outline-none text-[16px]" 
                    />
                    <button className="bg-slate-900 px-4 py-1 text-[16px] text-center rounded-lg text-slate-300">Join</button>
                   
                   </div>
                   <div className="text-[14px] text-slate-600">
                        please enter your room id
                    </div>
                </motion.div>
                
            )
        }
    </div>
}