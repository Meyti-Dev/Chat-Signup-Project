// dependencies
import { Link } from "react-router-dom";
// icons
import axios from "axios";
// pictures
import userMan from "../../pictures/219988.png";
import userWoman from "../../pictures/female-avatar-girl-face-woman-user-4.svg";
import useSWRMutation from "swr/mutation";
import { useSelector } from "react-redux";
import { selectUsers } from "../../redux/users";
import { selectChats } from "../../redux/chats";

// component
export default function User({
    userObject,
    userId,
    userName,
    fullName,
    password,
    phone,
    gender,
    chat,
}) {
    // current user
    const { currentUser } = useSelector(selectUsers);
    const { chats } = useSelector(selectChats);

    // -------------------------------------------------------------------------------------------- delete & update chats
    // deleted user
    const { trigger } = useSWRMutation(
        "http://localhost:4000/users/",
        async (url, { arg }) => await axios.delete(`${url}${arg}`)
    );

    // update chats after deleted user
    const { trigger: updateChatsAfterDeletedUser } = useSWRMutation(
        "http://localhost:4000/chats/",
        async (url, { arg }) => await axios.put(`${url}${arg.id}`, arg)
    );

    // delete user
    async function deletedUser(id) {
        const isDeleted = await trigger(id);

        if (isDeleted.statusText === "OK") {
            chats?.map((globalChat) => {
                return (
                    currentUser?.chat.some(
                        (currentUserChatId) =>
                            currentUserChatId === globalChat.chatId
                    ) &&
                    updateChatsAfterDeletedUser({
                        ...globalChat,
                        deletedAccount: true,
                    })
                );
            });
        }
    }
    // --------------------------------------------------------------------------------------------

    // set suggest
    const { trigger: suggets } = useSWRMutation(
        `http://localhost:4000/users/${userId}`,
        async (url, { arg }) =>
            await axios.put(url, {
                ...userObject,
                suggests: [
                    ...userObject.suggests,
                    { userName: arg.userName, userId: arg.id },
                ],
            })
    );

    function setSuggest() {
        suggets(currentUser);
    }

    // isChat
    const isChat = currentUser?.chat.some((currentUserChat) =>
        chat?.some((userChat) => userChat === currentUserChat)
    );

    // jsx
    return (
        <div className="bg-gray-800 p-5 rounded-xl overflow-hidden space-y-6">
            {/* user image */}
            <div className="flex items-center justify-center w-full overflow-hidden border-b border-solid border-white/10 pb-5">
                {/* image */}
                <img
                    className="object-cover object-center w-56"
                    src={gender === "مرد" ? userMan : userWoman}
                    alt="..."
                />
            </div>

            {/* content */}
            <div className="space-y-6">
                {/* user imformations */}
                <div className="space-y-2">
                    {/* user name */}
                    <div className="flex items-center justify-between bg-gray-700 overflow-hidden rounded-xl py-2 px-3">
                        {/* title */}
                        <p className="text-[rgba(255,255,255,.6)] font-vazir-medium text-sm word">
                            نام کاربری
                        </p>
                        {/* user name */}
                        <span className="font-vazir-regular text-sm text-[rgba(255,255,255,1)] capitalize">
                            {userName}
                        </span>
                    </div>

                    {/* full name */}
                    <div className="flex items-center justify-between bg-gray-700 overflow-hidden rounded-xl py-2 px-3">
                        {/* title */}
                        <p className="text-[rgba(255,255,255,.6)] font-vazir-medium text-sm word">
                            نام کامل
                        </p>
                        {/* full name */}
                        <span className="font-vazir-regular text-sm text-[rgba(255,255,255,1)] capitalize">
                            {fullName}
                        </span>
                    </div>

                    {/* password */}
                    <div className="flex items-center justify-between bg-gray-700 overflow-hidden rounded-xl py-2 px-3">
                        {/* title */}
                        <p className="text-[rgba(255,255,255,.6)] font-vazir-medium text-sm word">
                            رمز عبور
                        </p>
                        {/* user password */}
                        <span className="font-vazir-regular text-sm text-[rgba(255,255,255,1)]">
                            {password}
                        </span>
                    </div>

                    {/* phone number */}
                    <div className="flex items-center justify-between bg-gray-700 overflow-hidden rounded-xl py-2 px-3">
                        {/* title */}
                        <p className="text-[rgba(255,255,255,.6)] font-vazir-medium text-sm word">
                            شماره تلفن
                        </p>
                        {/* user phone number */}
                        <span className="font-vazir-regular text-sm text-[rgba(255,255,255,1)]">
                            {phone}
                        </span>
                    </div>

                    {/* gender */}
                    <div className="flex items-center justify-between bg-gray-700 overflow-hidden rounded-xl py-2 px-3">
                        {/* title */}
                        <p className="text-[rgba(255,255,255,.6)] font-vazir-medium text-sm word">
                            جنسیت
                        </p>
                        {/* user gender */}
                        <span className="font-vazir-regular text-sm text-[rgba(255,255,255,1)]">
                            {gender}
                        </span>
                    </div>
                </div>

                {/* buttons [ delete, update, view ] */}
                <div className="space-y-2.5">
                    <div className="flex items-center justify-center gap-2.5">
                        {/* btn, view */}
                        <Link
                            to={`/view/${userId}`}
                            className="flex-grow flex items-center justify-center font-vazir-medium text-sm w-16 h-10 word rounded-xl bg-yellow-500 hover:bg-yellow-600 transition-colors"
                        >
                            دیدن
                        </Link>
                        {/* btn, edit */}
                        <Link
                            to={`/edit/${userId}`}
                            className="flex-grow flex items-center justify-center font-vazir-medium text-sm w-16 h-10 word rounded-xl bg-blue-500 hover:bg-blue-600 transition-colors"
                        >
                            ویرایش
                        </Link>
                        {/* btn, delete */}
                        <button
                            onClick={() => deletedUser(userId)}
                            className="flex-grow flex items-center justify-center font-vazir-medium text-sm w-16 h-10 word rounded-xl bg-red-500 hover:bg-red-600 transition-colors"
                        >
                            حذف
                        </button>
                    </div>
                    {!(currentUser?.id === userId) && (
                        <button
                            disabled={isChat}
                            onClick={() => setSuggest(userId)}
                            className={`font-vazir-medium text-sm w-full h-10 rounded-xl flex items-center justify-center ${
                                isChat
                                    ? "text-green-500"
                                    : "bg-white/40 hover:bg-white/50 hover:scale-105"
                            } word transition-all`}
                        >
                            {isChat ? "درخواست چت پذیرفته شد" : "درخواست چت"}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
