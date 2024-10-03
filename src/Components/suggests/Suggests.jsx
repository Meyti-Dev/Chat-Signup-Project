// dependencies
import React from "react";
import { useSelector } from "react-redux";
import { selectUsers } from "../../redux/users";
import { Link } from "react-router-dom";
import { IoCloseCircle } from "react-icons/io5";
import { IoIosCheckmarkCircle } from "react-icons/io";
import useSWRMutation from "swr/mutation";
import axios from "axios";
import emptySuggest from "../../pictures/notfound.png";
import { nanoid } from "@reduxjs/toolkit";

// component
export default function Suggests() {
    // get current user
    const { currentUser, users } = useSelector(selectUsers);

    // me
    const { trigger: setItemMe } = useSWRMutation(
        "http://localhost:4000/users/",
        async (url, { arg }) =>
            await axios.put(`${url}${currentUser.id}`, {
                ...currentUser,
                suggests: arg.newSuggests,
                chat: [...currentUser.chat, arg.createId],
            })
    );
    // you
    const { trigger: setItemYou } = useSWRMutation(
        "http://localhost:4000/users/",
        async (url, { arg }) =>
            await axios.put(`${url}${arg.findUser.id}`, {
                ...arg.findUser,
                chat: [...arg.findUser.chat, arg.createId],
            })
    );

    // remove suggest
    const { trigger } = useSWRMutation(
        `http://localhost:4000/users/${currentUser?.id}`,
        async (url, { arg }) =>
            await axios.put(url, { ...currentUser, suggests: arg })
    );
    function removeSuggest(id) {
        const newSuggests = currentUser?.suggests.filter(
            (suggest) => !(suggest.userId === id)
        );
        trigger(newSuggests);
    }

    // accept suggest
    const { trigger: addChat } = useSWRMutation(
        "http://localhost:4000/chats",
        async (url, { arg }) => await axios.post(url, arg)
    );
    async function acceptSuggest(id) {
        const createId = nanoid();
        await addChat({
            chatId: createId,
            chat: [],
        });
        const newSuggests = currentUser?.suggests.filter(
            (suggest) => !(suggest.userId === id)
        );
        await setItemMe({ newSuggests, createId });
        const findUser = users.find((user) => user.id === id);
        await setItemYou({ findUser, createId });
    }

    // jsx
    return (
        <div className="mt-40">
            <div className="container">
                {/* title */}
                <div className="flex items-center justify-start gap-3 mb-5">
                    <div className="w-3 h-3 rounded-full bg-lime-500 shadow-[0_0_1rem_#84cc16]"></div>
                    <h2 className="text-xl font-vazir-bold text-white word">
                        درخواست های شما
                    </h2>
                </div>
                {/* suggests */}
                <div className="space-y-3">
                    {currentUser?.suggests.length ? (
                        currentUser.suggests.map((suggest, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between bg-zinc-700 rounded-xl p-4"
                            >
                                <p className="text-white word capitalize">
                                    شما از طرف {suggest.userName} یک درخواست چت
                                    دارید. آیا مایل به پذیرش هستید ؟
                                </p>
                                {/* wrapper */}
                                <div className="flex items-center justify-center gap-2">
                                    {/* view user profile */}
                                    <Link
                                        to={`/view/${suggest.userId}`}
                                        className="text-white/60 hover:text-white word text-sm transition-colors"
                                    >
                                        دیدن پروفایل کاربر
                                    </Link>
                                    {/* accept suggest */}
                                    <button
                                        onClick={() =>
                                            acceptSuggest(suggest.userId)
                                        }
                                    >
                                        <IoIosCheckmarkCircle className="text-green-600 hover:text-green-700 text-3xl hover:scale-110 transition-all" />
                                    </button>
                                    {/* remove sugges */}
                                    <button
                                        onClick={() =>
                                            removeSuggest(suggest.userId)
                                        }
                                    >
                                        <IoCloseCircle className="text-red-600 hover:text-red-700 text-3xl hover:scale-110 transition-all" />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex items-center justify-center">
                            <div>
                                <div>
                                    <img
                                        className="w-96"
                                        src={emptySuggest}
                                        alt="..."
                                    />
                                </div>
                                <p className="text-white word text-xl text-center -mt-24">
                                    شما هیچ درخواستی ندارید
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
