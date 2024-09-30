// dependencies component
import { Link } from "react-router-dom";
// icons
import axios from "axios";
import { useContext } from "react";
import context from "../../Contexts/context";

export default function User({userId, userName, fullName, password, phone}) {

    // get values from context (flagFetch && setFlagFetch)
    const {flagFetch, setFlagFetch} = useContext(context)

    // Delete user
    async function removeUser () {
        await axios.delete(`http://localhost:4000/users/${userId}`)
        setFlagFetch(!flagFetch)
    }

    // jsx
  return (
    <div className="p-5 bg-zinc-700 rounded-xl overflow-hidden space-y-6">
        <div className="space-y-2">
            {/* username */}
            <p className="text-[rgba(255,255,255,.6)] font-vazir-medium text-sm word">نام کاربری : <span className="font-vazir-regular text-[rgba(255,255,255,1)]">{userName}</span></p>
            {/* fullname */}
            <p className="text-[rgba(255,255,255,.6)] font-vazir-medium text-sm word"> نام کامل : <span className="font-vazir-regular text-[rgba(255,255,255,1)]">{fullName}</span></p>
            {/* password */}
            <p className="text-[rgba(255,255,255,.6)] font-vazir-medium text-sm word">رمز عبور : <span className="font-vazir-regular text-[rgba(255,255,255,1)]">{password}</span></p>
            <p className="text-[rgba(255,255,255,.6)] font-vazir-medium text-sm word"> شماره تلفن : <span className="font-vazir-regular text-[rgba(255,255,255,1)]">{phone}</span></p>
        </div>
        {/* buttons */}
        <div className="flex items-center justify-center gap-2.5">
            {/* btn, view */}
            <Link to={`/view/${userId}`} className="flex items-center justify-center font-vazir-medium w-16 h-10 word rounded-xl bg-yellow-500 hover:bg-yellow-600 transition-colors">
                دیدن
            </Link>
            {/* btn, edit */}
            <Link to={`/edit/${userId}`} className="flex items-center justify-center font-vazir-medium w-16 h-10 word rounded-xl bg-blue-500 hover:bg-blue-600 transition-colors">
                ویرایش
            </Link>
            {/* btn, delete */}
            <button onClick={removeUser} className="flex items-center justify-center font-vazir-medium w-16 h-10 word rounded-xl bg-red-500 hover:bg-red-600 transition-colors">
                حذف
            </button>
        </div>
    </div>
  )
}
