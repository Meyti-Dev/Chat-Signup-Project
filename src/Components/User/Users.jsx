import { useContext } from "react"
import User from "./User"
import context from "../../Contexts/context"
import PreLoader from "../PreLoader/PreLoader"
import NotFoundUser from "../NotFoundUser/NotFoundUser"

export default function Users() {

    const { users, preLoaderSearch, openChat} = useContext(context)
    
    // jsx
    return (
        <main className={`container py-32 space-y-5 ${openChat ? 'h-screen overflow-hidden' : ''}`}>
            <div className="flex items-center justify-start gap-3">
                <div className="w-3 h-3 rounded-full bg-lime-500 shadow-[0_0_1rem_#84cc16]"></div>
                <h2 className="text-lg text-white word">مخاطبین ثبت نام کرده در سایت</h2>    
            </div>
            <div className={`grid ${users.length && !preLoaderSearch ? 'grid-cols-4' : 'grid-cols-1'} gap-4`}>
                {preLoaderSearch ? <PreLoader /> : users.length ? users.map( user => <User userId={user.id} userName={user.userName} fullName={user.fullName} password={user.password} phone={user.phone} />) : <NotFoundUser /> }
            </div>
            <div className="fixed bottom-0 right-0 left-0 flex items-center justify-center gap-3 text-white bg-zinc-700 h-14 border-t border-solid border-white/10">
                <div className="w-3 h-3 rounded-full bg-lime-500 shadow-[0_0_1rem_#84cc16]"></div>
                {/* text */}
                <h1 className="text-white word">ساخته شده توسط <span className="text-lime-500">مهدی رمضانی</span></h1>
            </div>
        </main>
    )
}
