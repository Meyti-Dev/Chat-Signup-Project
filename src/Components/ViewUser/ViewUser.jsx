// dependencies component
import { Link, useParams } from "react-router-dom";
import useSWR from "swr";
import axios from "axios";
// picture
import picture from "../../pictures/transparent-3.png";

export default function ViewUser() {
    // git url params
    const { ID } = useParams();

    const { data: userData } = useSWR(
        "http://localhost:4000/users/",
        async (url) => await axios.get(`${url}${ID}`)
    );

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
                        <h1 className="text-white text-sm text-center">{`اطلاعات کاربر با شناسه ${userData?.data.id}`}</h1>
                        {/* wrapper */}
                        <div className="relative p-5 w-96 bg-[rgba(63,63,70,.5)] border border-solid border-white/5 backdrop-blur-md rounded-xl space-y-2.5">
                            <p className="flex items-center justify-between py-2 px-3 bg-zinc-600 rounded-xl overflow-hidden text-white/60 word">
                                شناسه کابر
                                <span className="text-white text-base word">
                                    {userData?.data.id}
                                </span>
                            </p>
                            <p className="flex items-center justify-between py-2 px-3 bg-zinc-600 rounded-xl overflow-hidden text-white/60 word">
                                نام کاربری
                                <span className="text-white text-base word">
                                    {userData?.data.userName}
                                </span>
                            </p>
                            <p className="flex items-center justify-between py-2 px-3 bg-zinc-600 rounded-xl overflow-hidden text-white/60 word">
                                نام و نام خانوادگی
                                <span className="text-white text-base word">
                                    {userData?.data.fullName}
                                </span>
                            </p>
                            <p className="flex items-center justify-between py-2 px-3 bg-zinc-600 rounded-xl overflow-hidden text-white/60 word">
                                رمز عبور
                                <span className="text-white text-base word">
                                    {userData?.data.password}
                                </span>
                            </p>
                            <p className="flex items-center justify-between py-2 px-3 bg-zinc-600 rounded-xl overflow-hidden text-white/60 word">
                                شماره تلفن
                                <span className="text-white text-base word">
                                    {userData?.data.phoneNumber}
                                </span>
                            </p>
                            <p className="flex items-center justify-between py-2 px-3 bg-zinc-600 rounded-xl overflow-hidden text-white/60 word">
                                تاریخ ثبت نام
                                <span className="text-white text-base word">
                                    {userData?.data.date}
                                </span>
                            </p>
                            <p className="flex items-center justify-between py-2 px-3 bg-zinc-600 rounded-xl overflow-hidden text-white/60 word">
                                ساعت ثبت نام
                                <span className="text-white text-base word">
                                    {userData?.data.hours}
                                </span>
                            </p>
                            {/* Return to main page */}
                            <div className="pt-4">
                                <Link
                                    to="/"
                                    className="w-full flex items-center justify-center h-10 rounded-xl bg-yellow-500 hover:bg-yellow-600 transition-colors font-vazir-medium -tracking-wider"
                                >
                                    بازگشت به صفحه اصلی
                                </Link>
                            </div>
                        </div>
                    </div>
                    {/* picture */}
                    <img src={picture} alt="pictures" />
                </section>
            </div>
        </main>
    );
}
