export default function Chat({username,message}:{username:string,message:string}){
    return (
        <div className="flex gap-2">
            <div className="w-[40px] h-[40px] rounded-full bg-slate-500 mt-1">

            </div>
            <div className="flex flex-col gap-1 ">
                
                <h2 className="text-[12px] text-slate-400">{username}</h2>
                <div className="text-[16px] px-3 py-2 bg-slate-500 rounded-lg max-w-[450px]">
                    {message}
                </div>
            </div>
        </div>
    )
}