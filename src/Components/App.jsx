// pages
import { useEffect, useState } from "react"
import axios from "axios"
import context from "../Contexts/context"
import { Outlet, useLocation } from "react-router-dom"
import HeaderTitle from "./Header/HeaderTitle"
import HeaderButtons from "./Header/HeaderButtons"
// icons
import { IoIosArrowForward } from "react-icons/io"


export default function App() {
    // url location
    const { pathname } = useLocation()

    // states
    const [allUsers, setAllUsers] = useState([])
    const [users, setUsers] = useState([])
    const [flagFetch, setFlagFetch] = useState(false)
    const [preLoaderSearch, setPreLoaderSearch] = useState(false)
    const [openChat, setOpenChat] = useState(false)
    const [massageValue, setMassageValue] = useState('')
    const [massage, setMassage] = useState([])
    const [flagMassage ,setFlagMassage] = useState(false)

    // mounting
    useEffect(function () {
        (async function () {
            const { data: responseUsers } = await axios.get('http://localhost:4000/users')
            const { data: responseMassage } = await axios.get('http://localhost:4000/massage')
            setMassage(responseMassage)
            setAllUsers(responseUsers)
            setUsers(responseUsers)
        }())
    }, [])

    // Update to show contacts
    useEffect( () => {
        (async function () {
            const { data } = await axios.get('http://localhost:4000/users')
            setAllUsers(data)
            setUsers(data)
        }())
    }, [flagFetch])
    // get, massages
    useEffect( () => {
        (async function () {
            const { data } = await axios.get('http://localhost:4000/massage')
            setMassage(data)
        }())
    }, [flagMassage])
    
    // open chat
    function openChatPage () {
        setOpenChat(true)
    }

    function changeValue (event) {
        console.log(event)
        setMassageValue(event.target.value)
    }
    async function sendMassage () {
        await axios.post('http://localhost:4000/massage', {
            massage: massageValue
        })
        setMassageValue('')
        setFlagMassage(!flagMassage)
    }

    function closeCaht () {
        setOpenChat(false)
    }

    // jsx
    return (
        <context.Provider value={{allUsers, users, setUsers, flagFetch, setFlagFetch, preLoaderSearch, setPreLoaderSearch, openChat}}>
            <header className="fixed top-0 right-0 left-0 flex items-center justify-center bg-zinc-700 h-[80px] px-10 border-b border-solid border-white/10">
                <div className="flex items-center justify-between w-full">
                    <HeaderTitle />
                    <HeaderButtons />
                </div>
            </header>
            {/*  */}
            { pathname === '/' && (
                <button onClick={openChatPage} className="fixed top-0 bottom-0 left-0 flex items-center justify-center w-7 h-10 bg-zinc-700 my-auto rounded-tr-xl rounded-br-xl border border-solid border-white/10">
                    <IoIosArrowForward className="text-xl text-lime-500" />
                </button>
            )}
            {/*  */}
            { pathname === '/' && (
                <div onClick={closeCaht} className={`fixed inset-0 bg-black/10 backdrop-blur-lg z-50 ${openChat ? 'visible opacity-100' : 'invisible opacity-0'} transition-all`}>
                    <div onClick={ event => event.stopPropagation()} className={`fixed top-0 bottom-0 flex items-center justify-between flex-col gap-5 w-96 bg-zinc-700 p-5 border-r border-solid border-white/10 z-50 ${openChat ? 'left-0' : '-left-96'} transition-all`}>
                        {/* title */}
                        <div className="flex items-center justify-center gap-3">
                            <div className="w-3 h-3 rounded-full bg-lime-500 shadow-[0_0_1rem_#84cc16]"></div>
                            <h1 className="text-white text-xl text-center ">صفحه چت همگانی</h1>
                        </div>
                        {/* chat */}
                        <div className="grow w-full bg-zinc-800 p-5 rounded-xl overflow-auto border border-solid border-white/20 chat">
                            {massage.map( massage => <p className="text-white text-sm p-3 bg-zinc-700 rounded-xl mb-2.5">{massage.massage}</p>)}
                        </div>
                        {/* input */}
                        <div className="shrink-0 flex items-center justify-center w-full rounded-xl overflow-hidden">
                            <input className="w-full h-10 font-vazir-medium text-sm px-5 word" onChange={changeValue} onKeyDown={(event) => event.key === 'Enter' && sendMassage()} type="text" placeholder="پیام خود را بنویسید" value={massageValue} />
                            <button onClick={sendMassage} className="shrink-0 h-10 px-5 font-vazir-medium bg-yellow-500 hover:bg-yellow-600 -tracking-wider transition-colors">ارسال</button>
                        </div>
                    </div>
                </div>
            )}
            <Outlet />
        </context.Provider>
    )
}
