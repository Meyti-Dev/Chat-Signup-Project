// dependencies
import { Link } from "react-router-dom";
// icons
import axios from "axios";
// pictures
import userMan from "../../pictures/219988.png";
import userWoman from "../../pictures/female-avatar-girl-face-woman-user-4.svg";
import useSWRMutation from "swr/mutation";

// component
export default function User({
    userId,
    userName,
    fullName,
    password,
    phone,
    gender,
}) {
    // delete user
    const { trigger } = useSWRMutation(
        "http://localhost:4000/users/",
        async (url, { arg }) => await axios.delete(`${url}${arg}`)
    );

    // jsx
    return (
        <div className="bg-zinc-700 p-5 rounded-xl overflow-hidden space-y-6">
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
                    <div className="flex items-center justify-between bg-zinc-600 overflow-hidden rounded-xl py-2 px-3">
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
                    <div className="flex items-center justify-between bg-zinc-600 overflow-hidden rounded-xl py-2 px-3">
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
                    <div className="flex items-center justify-between bg-zinc-600 overflow-hidden rounded-xl py-2 px-3">
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
                    <div className="flex items-center justify-between bg-zinc-600 overflow-hidden rounded-xl py-2 px-3">
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
                    <div className="flex items-center justify-between bg-zinc-600 overflow-hidden rounded-xl py-2 px-3">
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
                <div className="flex items-center justify-center gap-2.5">
                    {/* btn, view */}
                    <Link
                        to={`/view/${userId}`}
                        className="flex items-center justify-center font-vazir-medium text-sm w-16 h-10 word rounded-xl bg-yellow-500 hover:bg-yellow-600 transition-colors"
                    >
                        دیدن
                    </Link>
                    {/* btn, edit */}
                    <Link
                        to={`/edit/${userId}`}
                        className="flex items-center justify-center font-vazir-medium text-sm w-16 h-10 word rounded-xl bg-blue-500 hover:bg-blue-600 transition-colors"
                    >
                        ویرایش
                    </Link>
                    {/* btn, delete */}
                    <button
                        onClick={() => trigger(userId)}
                        className="flex items-center justify-center font-vazir-medium text-sm w-16 h-10 word rounded-xl bg-red-500 hover:bg-red-600 transition-colors"
                    >
                        حذف
                    </button>
                </div>
            </div>
        </div>
    );
}
