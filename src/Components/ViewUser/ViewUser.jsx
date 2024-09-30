// dependencies component
import { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import context from "../../Contexts/context"
// picture
import picture from "../../pictures/transparent-3.png"

export default function ViewUser() {

    const { allUsers, flagFetch, setFlagFetch } = useContext(context) 
    const { ID } = useParams() // Getting user id from url
    const [user, setUser] = useState()

    // Find user from database
    if (allUsers.length) {
        const findUser = allUsers.find( user => user.id === ID) // Find the user
        if (!(findUser === user)) {
            setUser(findUser)
        }
    }

    // unmounting
    useEffect( () => {
        return function () {
            setFlagFetch(!flagFetch)
        }
    }, [])

    // jsx
    return (
      <main className="flex items-center justify-center h-screen">
        <div className="container">
            <section className="flex items-center justify-center pt-12 pr-12 space-y-2">
                {/* wrapper */}
                <div className="relative space-y-2">
                    {/* shapes */}
                    <div className="absolute -top-5 -right-[84px] w-28 h-28 bg-blue-500 shadow-[0_0_1rem_#3b82f6] rounded-full -z-10"></div>
                    <div className="absolute -bottom-14 -left-20 w-32 h-32 bg-blue-500 shadow-[0_0_1rem_#3b82f6] rounded-full -z-10"></div>
                    {/* title */}
                    <h1 className="text-white text-sm text-center">{`اطلاعات کاربر با شناسه ${user && user.id}`}</h1>
                    <div className="relative p-5 bg-[rgba(63,63,70,.5)] border border-solid border-white/5 backdrop-blur-md rounded-xl space-y-2.5">
                        <p className="text-white/60 text-lg word">شناسه کابر :<span className="text-white text-base word"> {user && user.id}</span></p>
                        <p className="text-white/60 text-lg word">نام کاربری :<span className="text-white text-base word"> {user && user.userName}</span></p>
                        <p className="text-white/60 text-lg word">نام و نام خانوادگی :<span className="text-white text-base word"> {user && user.fullName}</span></p>
                        <p className="text-white/60 text-lg word">رمز عبور :<span className="text-white text-base word"> {user && user.password}</span></p>
                        <p className="text-white/60 text-lg word">شماره تلفن :<span className="text-white text-base word"> {user && user.phone}</span></p>
                        <p className="text-white/60 text-lg word">تاریخ ثبت نام :<span className="text-white text-base word"> {user && user.date}</span></p>
                        <p className="text-white/60 text-lg word">ساعت ثبت نام :<span className="text-white text-base word"> {user && user.hours}</span></p>
                        {/* Return to main page */}
                        <div className="pt-4">
                            <Link to='/' className="w-full flex items-center justify-center h-10 rounded-xl bg-yellow-500 hover:bg-yellow-600 transition-colors font-vazir-medium -tracking-wider">بازگشت به صفحه اصلی</Link>
                        </div>
                    </div>
                </div>
                {/* picture */}
                <img src={picture} alt="pictures" />
            </section>
        </div>
      </main>
    )
}
