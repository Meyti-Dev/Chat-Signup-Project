// dependencies
import User from "./User";
import NotFoundUser from "../NotFoundUser/NotFoundUser";
import { useSelector } from "react-redux";
import { selectUsers } from "../../redux/users";

// component
export default function Users() {
    // get [ users, copyUsers s]
    const { copyUsers } = useSelector(selectUsers);

    // jsx
    return (
        <main
            className={`container py-32 space-y-5 ${
                0 ? "h-screen overflow-hidden" : ""
            }`}
        >
            {/* title */}
            <div className="flex items-center justify-start gap-3">
                <div className="w-3 h-3 rounded-full bg-lime-500 shadow-[0_0_1rem_#84cc16]"></div>
                <h2 className="text-lg text-white word">
                    مخاطبین ثبت نام کرده در سایت
                </h2>
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
