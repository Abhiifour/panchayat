"use client"

import  {motion} from "framer-motion" 

export default function Landing(){
    return <div className="text-[54px] flex flex-col items-center justify-center text-center mt-52 text-slate-50 gap-10">
        <motion.div
        
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100 , duration: 400 }}
            
          
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
        <motion.div
            className="w-[200px] py-2 text-[24px] border-2 border-white rounded-full shadow-lg cursor-pointer"
           
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
        >
            Start Chat
        </motion.div>
    </div>
}