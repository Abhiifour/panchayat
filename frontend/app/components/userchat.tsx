export default function UserChat({message}:{message:string}){
    return (
        <div className="flex gap-2 flex-row-reverse items-center">
            <div className="w-[40px] h-[40px] rounded-full bg-slate-400">

            </div>
            <div className="text-[16px] px-3 py-2 bg-slate-400 rounded-lg max-w-[450px]">
                    {message}
            </div>
        </div>
    )
}