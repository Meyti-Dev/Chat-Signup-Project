// dependencies component
import { Link, useLocation } from "react-router-dom";
import context from "../../Contexts/context";
import { useContext } from "react";
// icons
import { IoSearchSharp } from "react-icons/io5";

export default function HeaderButtons() {

    // location in brower
    const urlLocation = useLocation()

    // useContext
    const { allUsers, setUsers, setPreLoaderSearch } = useContext(context)

    // Search to show contacts
    function searchUser (event) {
        setPreLoaderSearch(true)
        setTimeout(() => {
            setPreLoaderSearch(false)
            if (!event.target.value.length) {
                setUsers(allUsers)
            } else {
                const findUser = allUsers.filter( user => user.userName.toLowerCase().includes(event.target.value.toLowerCase()))
                setUsers(findUser)
            }
        }, 1000);
    }


    // jsx
    return (
        // wrapper
        <div className="flex items-center justify-center gap-2.5 flex-row-reverse">
            {/* btn, add user */}
            {(urlLocation.pathname === '/' || urlLocation.pathname === 'edituser') && (
                <Link className="flex items-center justify-center h-10 px-5 rounded-xl bg-yellow-500 hover:bg-yellow-600 transition-colors font-vazir-medium word" to='/adduser'>مخاطب جدید</Link>
            )}
            {/* btn, search user */}
            {urlLocation.pathname === '/' && (
                <div className="flex items-center justify-center flex-row-reverse rounded-xl overflow-hidden group">
                    <button className="flex items-center justify-center w-10 h-10 bg-red-600 hover:bg-red-700 transition-colors">
                        <IoSearchSharp className="text-white text-xl" />
                    </button>
                    <input onChange={searchUser} className="block w-0 h-10 group-hover:px-5 group-hover:w-52 text-sm word transition-all delay-100 placeholder:text-sm" type="text" placeholder="مخاطب را جست و جو کنید" />
                </div>
            )}
        </div>
    )
}
