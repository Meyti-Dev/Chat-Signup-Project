// dependencies component
import { useContext, useState } from "react";
import context from "../../Contexts/context";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
// icons
import { HiCheckCircle } from "react-icons/hi2";
// picture
import picture from "../../pictures/transparent-4.png"

export default function AddUser() {

    // Date
    const date = new Date()

    // useParams
    const { ID } = useParams()

    // useContext
    const { allUsers, flagFetch, setFlagFetch } = useContext(context)
    
    // flag
    const [getValue, setGetValue] = useState(false)

    // states for input value
    const [userNameValue, setUserNameValue] = useState('')
    const [fullNameValue, setFullNameValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    const [phone, setPhone] = useState('')
    
    // user value
    const [userValue, setUserValue] = useState()
    if (allUsers.length) {
        const findUser = allUsers.find( user => user.id === ID)
        if (!(userValue === findUser)) {
            setUserValue(findUser)
            setGetValue(true)
        }
    }
    if (getValue) {
        setUserNameValue(userValue ? userValue.userName : '')
        setFullNameValue(userValue ? userValue.fullName : '')
        setPasswordValue(userValue ? userValue.password : '')
        setPhone(userValue ? userValue.phone : '')
        setGetValue(false)
    }

    // userName value validation
    const [isUserName, setIsUserName] = useState(false)
    const [modal, setModal] = useState(false) // modal

    // form, submit
    async function formSubmitHandler (event) {
        event.preventDefault()
        await axios.put(`http://localhost:4000/users/${ID}`, {
            updateDate: `update in ${date.getFullYear()} / ${date.getMonth()} / ${date.getDay()}`,
            userName: userNameValue.trim(),
            fullName: fullNameValue.trim(),
            password: passwordValue.trim(),
            phone: phone,
            date: `${date.getFullYear()} / ${date.getMonth()} / ${date.getDay()}`,
            hours: date.getHours()
        })
        setUserNameValue('')
        setFullNameValue('')
        setPasswordValue('')
        setPhone('')
        setFlagFetch(!flagFetch)
        // modal
        setModal(true)
        setTimeout( () => {
            setModal(false)
        }, 7000)
    }

    // input, change value
    function changeValue (event) {
        if (event.target.name === 'userName') { // validation username
            setUserNameValue(event.target.value)
            // validation, Duplicate name
            const isUser = allUsers.some( user => user.userName.trim().toLowerCase() === event.target.value.trim().toLowerCase())
            const thisUser = allUsers.find( user => user.id === ID)
            if (thisUser.userName === event.target.value) { // userName this user, validation
                setIsUserName(false)
            } else {
                setIsUserName(isUser)
            }
        } else if (event.target.name === 'fullName') { // validation fullname
            setFullNameValue(event.target.value)
        } else if (event.target.name === 'password') { // validation password
            setPasswordValue(event.target.value)
        } else if (event.target.name === 'phone') { // validation phone
            const validationPhone = isNaN(event.target.value.trim())
            validationPhone ? setPhone(phone) : setPhone(event.target.value.trim())
        }
    }
    
    // input, clearData
    function clearData () {
        setUserNameValue('')
        setFullNameValue('')
        setPasswordValue('')
        setPhone('')
    }

    // jsx
    return (
        <main className="h-screen flex items-center justify-center">
            {/* container */}
            <div className="container">
                <section className="flex items-center justify-center gap-10 pt-12 pr-5">
                    <div className="relative">
                        <h1 className="text-white text-sm word mb-3">ویرایش مخاطب با شناسه {ID}</h1>
                        {/* shapes */}
                        <div className="absolute -top-12 -left-16 w-28 h-28 bg-yellow-500 shadow-[0_0_1rem_#eab308] rounded-full -z-10"></div>
                        <div className="absolute -bottom-20 -right-20 w-32 h-32 bg-yellow-500 shadow-[0_0_1rem_#eab308] rounded-full -z-10"></div>
                        {/* form */}
                        <form className="block w-72 p-5 bg-[rgba(63,63,70,.5)] backdrop-blur-md rounded-xl border border-solid border-white/5" onSubmit={formSubmitHandler}>
                            {/* form, wrapper inputs */}
                            <div className="space-y-3">
                                {/* input, username */}
                                <div className="flex items-center justify-between gap-2.5">
                                    <input className="w-full bg-transparent text-white placeholder:word placeholder:text-white/60" onChange={changeValue} name="userName" value={userNameValue} autoComplete="off" type="text" placeholder="نام کاربری" maxLength={12} />
                                    <HiCheckCircle className={`text-xl ${(userNameValue.length >= 5 && !isUserName) ? 'text-green-700' : 'text-red-500'} shrink-0`}/>
                                </div>
                                {/* input, fullname */}
                                <div className="flex items-center justify-between gap-2.5">
                                    <input className="w-full bg-transparent text-white placeholder:word placeholder:text-white/60" onChange={changeValue} name="fullName" value={fullNameValue} autoComplete="off" type="text" placeholder="نام و نام خانوادگی" maxLength={15} />
                                    <HiCheckCircle className={`text-xl ${fullNameValue.length >= 5 ? 'text-green-700' : 'text-red-500'} shrink-0`}/>
                                </div>
                                {/* input, password */}
                                <div className="flex items-center justify-between gap-2.5">
                                    <input className="w-full bg-transparent text-white placeholder:word placeholder:text-white/60" onChange={changeValue} name="password" value={passwordValue} autoComplete="off" type="password" placeholder="رمز عبور" maxLength={12} />
                                    <HiCheckCircle className={`text-xl ${passwordValue.length >= 8 ? 'text-green-700' : 'text-red-500'} shrink-0`}/>
                                </div>
                                {/* input, phone */}
                                <div className="flex items-center justify-between gap-2.5">
                                    <input className="w-full bg-transparent text-white placeholder:word placeholder:text-white/60" onChange={changeValue} name="phone" value={phone} autoComplete="off" type="text" placeholder="شماره تلفن  ( بدون فاصله )" maxLength={11} />
                                    <HiCheckCircle className={`text-xl ${phone.length === 11 && phone.substring(0,2) === '09' ? 'text-green-700' : 'text-red-500'} shrink-0`}/>
                                </div>
                            </div>
                            {/* buttons, clear and submit */}
                            <div className="flex items-center justify-center gap-3 mt-7">
                                <button disabled={userNameValue.length >= 5 && fullNameValue.length >= 5 && passwordValue.length >= 8 && phone.length === 11 && phone.substring(0,2) === '09' ? false : true} type="submit" className="flex items-center justify-center w-1/2 h-10 font-vazir-medium rounded-xl bg-yellow-500 hover:bg-yellow-600 transition-colors -tracking-wider cursor-pointer">ارسال</button>
                                <span onClick={clearData} className="flex items-center justify-center w-1/2 h-10 font-vazir-medium rounded-xl bg-red-500 hover:bg-red-600 transition-colors -tracking-wider cursor-pointer">حذف</span>
                            </div>
                            {/* Return to main page */}
                            <Link to='/' className="w-full flex items-center justify-center h-10 rounded-xl bg-blue-500 hover:bg-blue-600 mt-3 transition-colors font-vazir-medium -tracking-wider">بازگشت به صفحه اصلی</Link>
                        </form>
                    </div>
                    {/* picture */}
                    <img className="fixed top-[79px] right-0 w-[500px] -z-10" src={picture} alt="pictures" />
                </section>
            </div>
            {/* modal */}
            <div className={`fixed ${modal ? 'bottom-0' : '-bottom-14'} right-0 left-0 flex items-center justify-center h-14 font-vazir-medium bg-yellow-500 transition-all`}>مخاطب بروزرسانی شد. در صورتی که نمیخواهید دوباره تغییر دهید دکمه بازگشت به صفحه اصلی را بزنید.</div>
        </main>
    )
}
