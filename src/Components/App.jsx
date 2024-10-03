// pages
import { useEffect, useState } from "react";
import axios from "axios";
import { Outlet, useLocation } from "react-router-dom";
import HeaderTitle from "./Header/HeaderTitle";
import HeaderButtons from "./Header/HeaderButtons";
// icons
import { IoIosArrowForward } from "react-icons/io";
import useSWR from "swr";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, selectUsers } from "../redux/users";
import { getChats, selectChats } from "../redux/chats";

export default function App() {
    // dispatch
    const dispatch = useDispatch();

    // get [users, chats]
    useEffect(() => {
        dispatch(getUsers());
        dispatch(getChats());
    }, []);

    // select chats
    const { chats } = useSelector(selectChats);
    const { currentUser } = useSelector(selectUsers);

    // find chats
    const findChats = chats?.filter(
        (chat, index) => chat.chatId === currentUser?.chat[index]
    );
    console.log(findChats);

    // url location
    const { pathname } = useLocation();

    // states
    const [openChat, setOpenChat] = useState(false); //!ok
    const [massageValue, setMassageValue] = useState("");
    const [massage, setMassage] = useState([]);
    const [flagMassage, setFlagMassage] = useState(false);

    // open chat
    function openChatPage() {
        setOpenChat(true);
    }

    function changeValue(event) {
        console.log(event);
        setMassageValue(event.target.value);
    }
    async function sendMassage() {
        await axios.post("http://localhost:4000/massage", {
            massage: massageValue,
        });
        setMassageValue("");
        setFlagMassage(!flagMassage);
    }

    // jsx
    return (
        <>
            {/* header */}
            <header className="fixed top-0 right-0 left-0 flex items-center justify-center bg-zinc-700 h-[80px] px-10 border-b border-solid border-white/10">
                <div className="flex items-center justify-between w-full">
                    <HeaderTitle />
                    <HeaderButtons />
                </div>
            </header>

            {/* button chat [open, close] */}
            <button
                onClick={openChatPage}
                className="fixed top-0 bottom-0 left-0 flex items-center justify-center w-8 h-20 bg-zinc-700 my-auto rounded-tr-xl rounded-br-xl border border-solid border-white/10"
            >
                <IoIosArrowForward className="text-xl text-lime-500" />
            </button>

            {/* chat */}
            <div
                onClick={() => setOpenChat(false)}
                className={`fixed inset-0 bg-black/10 backdrop-blur-lg z-50 ${
                    openChat ? "visible opacity-100" : "invisible opacity-0"
                } transition-all`}
            >
                {/* wrapper */}
                <div
                    onClick={(event) => event.stopPropagation()}
                    className={`fixed top-0 bottom-0 flex items-stretch justify-center gap-5 w-[700px] bg-zinc-700 p-5 border-r border-solid border-white/10 z-50 ${
                        openChat ? "left-0" : "-left-96"
                    } transition-all`}
                >
                    {/* contacts chats */}
                    <div className="bg-zinc-600 h-full w-1/2 rounded-xl p-5">
                        <ul className="space-y-2">
                            {findChats?.map((chat, index) => (
                                <li
                                    key={index}
                                    className="py-2 px-3 rounded-xl overflow-hidden bg-zinc-700 text-white hover:scale-105 hover:bg-white/10 cursor-pointer transition-all"
                                >
                                    <h3>{chat.chatId}</h3>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* chat */}
                    <div className="flex items-center justify-between w-1/2 flex-col space-y-3">
                        {/* title */}
                        <div className="flex items-center justify-center gap-3">
                            <div className="w-3 h-3 rounded-full bg-lime-500 shadow-[0_0_1rem_#84cc16]"></div>
                            <h1 className="text-white text-xl text-center word">
                                صفحه چت با مخاطبین
                            </h1>
                        </div>
                        {/* chat */}
                        <div className="grow w-full h-full bg-zinc-800 p-5 rounded-xl overflow-auto border border-solid border-white/20 chat">
                            {massage.map((massage) => (
                                <p className="text-white text-sm p-3 bg-zinc-700 rounded-xl mb-2.5">
                                    {massage.massage}
                                </p>
                            ))}
                        </div>
                        {/* [input, btn] */}
                        <div className="shrink-0 flex items-center justify-center w-full rounded-xl overflow-hidden">
                            <input
                                className="w-full h-10 font-vazir-medium text-sm px-5 word"
                                onChange={changeValue}
                                onKeyDown={(event) =>
                                    event.key === "Enter" && sendMassage()
                                }
                                type="text"
                                placeholder="پیام خود را بنویسید"
                                value={massageValue}
                            />
                            <button
                                onClick={sendMassage}
                                className="shrink-0 h-10 px-5 font-vazir-medium bg-yellow-500 hover:bg-yellow-600 -tracking-wider transition-colors"
                            >
                                ارسال
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Outlet />
        </>
    );
}
