// dependencies
import User from "./User";
import NotFoundUser from "../NotFoundUser/NotFoundUser";
import { useSelector } from "react-redux";
import { selectUsers } from "../../redux/users";
import imageMan from "../../pictures/219988.png";
import imageWoman from "../../pictures/female-avatar-girl-face-woman-user-4.svg";
import { Link } from "react-router-dom";

// component
export default function Users() {
    // get [ users, copyUsers s]
    const { copyUsers, currentUser } = useSelector(selectUsers);

    // remove user account
    function removeAccount() {
        "removed account";
    }

    // jsx
    return (
        <main
            className={`container py-32 space-y-5 ${
                0 ? "h-screen overflow-hidden" : ""
            }`}
        >
            {/* current user */}
            <div
                className={`${
                    currentUser ? "bg-zinc-700" : "bg-red-500"
                } rounded-xl overflow-hidden p-5
                `}
            >
                {currentUser ? (
                    <div className="flex items-stretch justify-between gap-5">
                        {/* content */}
                        <div className="shrink-0 bg-zinc-600 w-96 rounded-xl overflow-hidden flex items-center justify-between flex-col p-5">
                            <div className="w-full flex items-center justify-between">
                                <p className="word text-white/50">شناسه</p>
                                <p className="text-white">{currentUser?.id}</p>
                            </div>
                            <div className="w-full flex items-center justify-between">
                                <p className="word text-white/50">نام کاربری</p>
                                <p className="text-white">
                                    {currentUser?.userName}
                                </p>
                            </div>
                            <div className="w-full flex items-center justify-between">
                                <p className="word text-white/50">نام کامل</p>
                                <p className="text-white">
                                    {currentUser?.fullName}
                                </p>
                            </div>
                            <div className="w-full flex items-center justify-between">
                                <p className="word text-white/50">رمز عبور</p>
                                <p className="text-white">
                                    {currentUser?.password}
                                </p>
                            </div>
                            <div className="w-full flex items-center justify-between">
                                <p className="word text-white/50">شماره تلفن</p>
                                <p className="text-white">
                                    {currentUser?.phoneNumber}
                                </p>
                            </div>
                            <div className="w-full flex items-center justify-between">
                                <p className="word text-white/50">جنسیت</p>
                                <p className="text-white">
                                    {currentUser?.gender}
                                </p>
                            </div>
                            <div className="w-full flex items-center justify-between">
                                <p className="word text-white/50">
                                    تاریخ ثبت نام
                                </p>
                                <p className="text-white">
                                    {currentUser?.date}
                                </p>
                            </div>
                        </div>
                        {/* buttons */}
                        <div className="w-full space-y-3">
                            <button className="w-full flex items-center justify-center h-10 bg-blue-500 hover:bg-blue-600 rounded-xl word font-vazir-medium transition-colors">
                                رفتن به صفحه چت
                            </button>
                            <Link
                                to={`/edit/${currentUser?.id}`}
                                className="flex items-center justify-center h-10 bg-green-500 hover:bg-green-600 rounded-xl word font-vazir-mediu transition-colorsm"
                            >
                                ویرایش اطلاعات
                            </Link>
                            <Link
                                to={`/view/${currentUser?.id}`}
                                className="flex items-center justify-center h-10 bg-yellow-500 hover:bg-yellow-600 rounded-xl word font-vazir-mediu transition-colorsm"
                            >
                                دیدن دقیق اطلاعات
                            </Link>
                            <button
                                onClick={removeAccount}
                                className="w-full flex items-center justify-center h-10 bg-red-500 hover:bg-red-600 rounded-xl word font-vazir-medium transition-colors"
                            >
                                حذف حساب کاربری
                            </button>
                        </div>
                        {/* image */}
                        <div className="shrink-0">
                            <img
                                className="w-80"
                                src={
                                    currentUser?.gender === "مرد"
                                        ? imageMan
                                        : imageWoman
                                }
                                alt="..."
                            />
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center justify-center">
                        <p className="text-white font-vazir-bold">
                            ابتدا باید در سایت ثبت نام کنید
                        </p>
                    </div>
                )}
            </div>

            {/* title */}
            <div className="flex items-center justify-start gap-3">
                <div className="w-3 h-3 rounded-full bg-lime-500 shadow-[0_0_1rem_#84cc16]"></div>
                <h2 className="text-lg text-white word">مخاطبین پیشنهاد شده</h2>
            </div>
            {/* show users */}
            <div
                className={`grid ${
                    copyUsers?.length ? "grid-cols-4" : "grid-cols-1"
                } gap-4`}
            >
                {copyUsers?.length ? (
                    copyUsers.map((user, index) => (
                        <User
                            userObject={user}
                            key={index}
                            userId={user.id}
                            userName={user.userName}
                            fullName={user.fullName}
                            password={user.password}
                            phone={user.phone}
                            gender={user.gender}
                        />
                    ))
                ) : (
                    <NotFoundUser />
                )}
            </div>
            {/* footer */}
            <div className="fixed bottom-0 right-0 left-0 flex items-center justify-center gap-3 text-white bg-zinc-700 h-14 border-t border-solid border-white/10">
                <div className="w-3 h-3 rounded-full bg-lime-500 shadow-[0_0_1rem_#84cc16]"></div>
                {/* text */}
                <h1 className="text-white word">
                    ساخته شده توسط{" "}
                    <span className="text-lime-500">مهدی رمضانی</span>
                </h1>
            </div>
        </main>
    );
}
