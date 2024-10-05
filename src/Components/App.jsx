// dependencies
import { useEffect, useState } from "react";
import axios from "axios";
import { Outlet } from "react-router-dom";
import HeaderTitle from "./Header/HeaderTitle";
import HeaderButtons from "./Header/HeaderButtons";
// icons
import { IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, selectUsers } from "../redux/users";
import { getChats, selectChats } from "../redux/chats";
import useSWRMutation from "swr/mutation";
import { MdOutlineMenu } from "react-icons/md";
import { IoClose } from "react-icons/io5";

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

    // messages font size

    // find chats
    const findChats = chats?.filter((chat) => {
        return currentUser?.chat.find((userChat) => userChat === chat.chatId);
    });

    const [whichChat, setWhichChat] = useState(0);

    // states
    const [openChat, setOpenChat] = useState(false); //!ok
    const [massageValue, setMassageValue] = useState("");
    const [openSettings, setOpenSettings] = useState(false);

    // open chat
    function openChatPage() {
        setOpenChat(true);
    }

    function changeValue(event) {
        setMassageValue(event.target.value);
    }

    // send message -------------------------------------------------------------------------------
    const { trigger } = useSWRMutation(
        "http://localhost:4000/chats/",
        async (url, { arg }) =>
            await axios.put(`${url}${findChats[whichChat].id}`, {
                ...arg,
                chat: [
                    ...arg.chat,
                    { userName: currentUser.userName, content: massageValue },
                ],
            })
    );
    async function sendMassage() {
        await trigger(findChats[whichChat]);
        setMassageValue("");
    }

    function enterClick(e) {
        if (findChats && !findChats[whichChat]?.deletedAccount) {
            if (e.key === "Enter") {
                sendMassage();
            }
        }
    }
    // --------------------------------------------------------------------------------------------

    // change font size ---------------------------------------------------------------------------
    // state
    const [fontSize, setFontSize] = useState();
    useEffect(() => setFontSize(currentUser?.settings.fontSize), [currentUser]);
    // conect
    const { trigger: changeSize } = useSWRMutation(
        `http://localhost:4000/users/${currentUser?.id}`,
        async (url, { arg }) =>
            await axios.put(url, {
                ...currentUser,
                settings: { ...currentUser.settings, fontSize: arg },
            })
    );
    // validation
    async function changeFontSize(e) {
        if (e.target.innerHTML === "بزرگ") {
            const status = await changeSize("text-lg");
            status.statusText === "OK" && setFontSize("text-lg");
        } else if (e.target.innerHTML === "متوسط") {
            const status = await changeSize("text-base");
            status.statusText === "OK" && setFontSize("text-base");
        } else if (e.target.innerHTML === "کوچک") {
            const status = await changeSize("text-sm");
            status.statusText === "OK" && setFontSize("text-sm");
        }
    }
    // ---------------------------------------------------------------------------------------------

    // jsx
    return (
        <>
            {/* header */}
            <header className="fixed top-0 right-0 left-0 flex items-center justify-center bg-gray-800 h-[80px] px-10 border-b border-solid border-white/10">
                <div className="flex items-center justify-between w-full">
                    <HeaderTitle />
                    <HeaderButtons />
                </div>
            </header>

            {/* button chat [open, close] */}
            <button
                onClick={openChatPage}
                className="fixed top-0 bottom-0 left-0 flex items-center justify-start w-8 hover:w-10 h-20 bg-gray-800 my-auto rounded-tr-xl rounded-br-xl border border-solid border-white/10 transition-all"
            >
                <IoIosArrowForward className="text-xl text-lime-500 mr-1" />
            </button>

            {/* chat */}
            <div
                onClick={() => setOpenChat(false)}
                className={`fixed inset-0 bg-black/20 backdrop-blur-lg z-50 ${
                    openChat ? "visible opacity-100" : "invisible opacity-0"
                } transition-all`}
            >
                {/* wrapper */}
                <div
                    onClick={(event) => event.stopPropagation()}
                    className={`fixed top-0 bottom-0 flex items-stretch justify-center gap-5 w-[700px] bg-gray-900 p-5 border-r border-solid border-white/10 z-50 ${
                        openChat ? "left-0" : "-left-96"
                    } transition-all`}
                >
                    {/* contacts chats */}
                    <div className="h-full w-1/2 rounded-xl">
                        <ul className="space-y-2">
                            {findChats?.map((chat, index) => (
                                <li
                                    onClick={() => setWhichChat(index)}
                                    key={index}
                                    className={`py-2 px-3 rounded-xl overflow-hidden ${
                                        index === whichChat
                                            ? "bg-gray-700"
                                            : "hover:scale-105 bg-gray-800 hover:bg-white/10 cursor-pointer"
                                    } text-white border border-solid border-white/10 transition-all`}
                                >
                                    <h3>{chat.chatId}</h3>
                                    <p>
                                        {chat.deletedAccount === true ? (
                                            <p className="text-sm text-red-500 word">
                                                کاربر حساب خود را حذف کرد
                                            </p>
                                        ) : (
                                            <p>mahdi</p>
                                        )}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* chat */}
                    <div className="flex items-center justify-between w-1/2 flex-col space-y-3">
                        {/* features */}
                        <div className="w-full flex items-center justify-between">
                            {/* clear chat */}
                            {/* <button className="py-1 px-3 bg-[#3b82f633] rounded-xl border border-solid border-[#3b82f64d]">
                                <span className="font-vazir-bold text-blue-500 word text-sm">
                                    حذف پیام ها
                                </span>
                            </button> */}

                            {/* block contact */}
                            {/* <button className="py-1 px-3 bg-[#3b82f633] rounded-xl border border-solid border-[#3b82f64d]">
                                <span className="font-vazir-bold text-blue-500 word text-sm">
                                    مسدود کردن کاربر
                                </span>
                            </button> */}

                            {/* other fatures */}
                            <button
                                onClick={() => setOpenSettings((prev) => !prev)}
                                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-700 hover:bg-gray-600 border border-solid border-white/10 transition-colors"
                            >
                                <MdOutlineMenu className="text-white text-xl" />
                            </button>
                            {/* menu */}
                            <div
                                className={`fixed top-0 bottom-0 ${
                                    openSettings ? "left-0" : "-left-[700px]"
                                }  w-[700px] bg-gray-900 border border-solid border-white/10 transition-all  p-5 space-y-7`}
                            >
                                {/* header */}
                                <div className="flex items-center justify-start">
                                    {/* close settings */}
                                    <button
                                        onClick={() =>
                                            setOpenSettings((prev) => !prev)
                                        }
                                    >
                                        <IoClose className="text-white text-xl" />
                                    </button>
                                </div>
                                {/* main */}
                                <div className="">
                                    {/* settings */}
                                    <div className="p-5">
                                        {/* size */}
                                        <div className="space-y-3">
                                            {/* size title */}
                                            <h3 className="text-white text-xl word">
                                                اندازه متن پیام
                                            </h3>
                                            {/* size config */}
                                            <div>
                                                <ul className="text-white space-y-3">
                                                    <li
                                                        className={`p-2 rounded-xl ${
                                                            fontSize ===
                                                            "text-lg"
                                                                ? "bg-[#15803d33] border border-solid border-[#15803d66] text-green-600 font-vazir-medium"
                                                                : "bg-gray-700"
                                                        } cursor-pointer`}
                                                        onClick={changeFontSize}
                                                    >
                                                        بزرگ
                                                    </li>
                                                    <li
                                                        className={`p-2 rounded-xl ${
                                                            fontSize ===
                                                            "text-base"
                                                                ? "bg-[#15803d33] border border-solid border-[#15803d66] text-green-600 font-vazir-medium"
                                                                : "bg-gray-700"
                                                        } cursor-pointer`}
                                                        onClick={changeFontSize}
                                                    >
                                                        متوسط
                                                    </li>
                                                    <li
                                                        className={`p-2 rounded-xl ${
                                                            fontSize ===
                                                            "text-sm"
                                                                ? "bg-[#15803d33] border border-solid border-[#15803d66] text-green-600 font-vazir-medium"
                                                                : "bg-gray-700"
                                                        } cursor-pointer`}
                                                        onClick={changeFontSize}
                                                    >
                                                        کوچک
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* chat */}
                        <div className="grow w-full h-full bg-gray-800 p-5 rounded-xl overflow-auto border border-solid border-white/10 chat space-y-2">
                            {findChats &&
                                findChats[whichChat]?.chat.map(
                                    (message, index) => (
                                        <div
                                            key={index}
                                            className={`rounded-xl py-2 px-3 ${
                                                message.userName ===
                                                currentUser.userName
                                                    ? "bg-blue-500"
                                                    : "bg-white/10"
                                            }`}
                                        >
                                            <h4 className="text-xs text-white/50">
                                                {message.userName}
                                            </h4>
                                            <p
                                                className={`text-white word ${fontSize}`}
                                            >
                                                {message.content}
                                            </p>
                                        </div>
                                    )
                                )}
                            {findChats &&
                                findChats[whichChat]?.deletedAccount ===
                                    true && (
                                    <p className="font-vazir-medium text-sm text-center text-red-500 bg-[#ef44441a] border border-solid border-[#ef444433] word rounded-xl p-2">
                                        نمیتوانید با این مخاطب چت کنید
                                    </p>
                                )}
                        </div>

                        {/* [input, btn] */}
                        <div className="shrink-0 flex items-center justify-center w-full rounded-xl overflow-hidden">
                            <input
                                className="w-full h-10 font-vazir-medium text-sm px-5 word"
                                onChange={changeValue}
                                onKeyDown={enterClick}
                                type="text"
                                placeholder="پیام خود را بنویسید"
                                value={massageValue}
                            />
                            <button
                                disabled={
                                    findChats &&
                                    findChats[whichChat]?.deletedAccount
                                }
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
            {/* footer */}
            <section className="bg-gray-800 border-t border-solid border-white/10">
                {/* content */}
                <div className="container flex items-center justify-center text-white py-12">
                    <div className="">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Sit, inventore nulla! Est dolores modi similique rerum
                        reiciendis omnis, possimus cumque id saepe dignissimos
                        aspernatur repellat vero libero alias sed ullam minus
                        beatae nobis ab quo excepturi asperiores, doloremque
                        nesciunt. Nostrum saepe cupiditate accusantium labore
                        cumque? Repudiandae deserunt quas, voluptate temporibus
                        eligendi a enim, nihil esse reiciendis amet quia, sint
                        molestias quod maiores quaerat numquam unde hic
                        provident consequuntur ullam. Illum, ipsa amet sit totam
                        ea vel neque aspernatur quos quia, nemo commodi
                        quibusdam temporibus sint modi, dignissimos dolorum
                        omnis explicabo. Eius delectus est illum possimus iure
                        soluta pariatur vel veritatis?
                    </div>
                    <p className="">
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Quibusdam architecto nulla consequatur a ipsa
                        mollitia est eum fuga dignissimos commodi voluptate
                        eligendi, autem dolorem eveniet quaerat illum totam quod
                        placeat possimus numquam ducimus sed vero! Eligendi
                        dolore recusandae possimus velit magnam quasi quis quo
                        quia! Obcaecati amet, minima facilis magni nobis
                        corrupti? Illum fugiat necessitatibus dolore quisquam
                        aliquam soluta eligendi vitae asperiores quos doloribus!
                        Et eveniet, quod eaque iste, nesciunt fugit doloribus
                        incidunt officia ut repellendus, possimus distinctio hic
                        rerum ex at? Dolore totam, vel eaque explicabo
                        quibusdam, exercitationem atque dignissimos provident
                        laboriosam mollitia minus ullam impedit magnam expedita
                        consectetur?
                    </p>
                </div>

                {/* builder */}
                <div className="text-white bg-gray-900 py-4">
                    <h1 className="text-white text-center word">
                        <p>
                            ساخته شده توسط{" "}
                            <span className="text-lime-500">مهدی رمضانی</span>
                        </p>
                    </h1>
                </div>
            </section>
        </>
    );
}
