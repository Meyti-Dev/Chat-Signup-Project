// dependencies component
import { Link, useLocation } from "react-router-dom";
// icons
import { IoSearchSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { filter, selectUsers } from "../../redux/users";
import { useState } from "react";

export default function HeaderButtons() {
    // search box
    const [searchBoxValue, setSearchBoxValue] = useState("");

    // location in brower
    const { pathname } = useLocation();

    // dispatch
    const dispatch = useDispatch();

    // get [users, copyUsers]
    const { users } = useSelector(selectUsers);

    // Search to show contacts
    function searchUser(e) {
        setSearchBoxValue(e.target.value);
        if (e.target.value.length) {
            const filterUsers = users.filter((user) =>
                user.userName.includes(e.target.value)
            );
            setTimeout(() => {
                dispatch(filter(filterUsers));
            }, 1000);
        } else {
            setTimeout(() => {
                dispatch(filter(users));
            }, 1000);
        }
    }

    // jsx
    return (
        // wrapper
        <div className="flex items-center justify-center gap-2.5 flex-row-reverse">
            {/* btn, add user */}
            {pathname === "/" && (
                <Link
                    className="flex items-center justify-center h-10 px-5 rounded-xl bg-yellow-500 hover:bg-yellow-600 transition-colors font-vazir-medium word"
                    to="/adduser"
                >
                    مخاطب جدید
                </Link>
            )}
            {/* btn, search user */}
            {pathname === "/" && (
                <div className="flex items-center justify-center flex-row-reverse rounded-xl overflow-hidden group">
                    <button className="flex items-center justify-center w-10 h-10 bg-red-600 hover:bg-red-700 transition-colors">
                        <IoSearchSharp className="text-white text-xl" />
                    </button>
                    <input
                        onChange={searchUser}
                        className="block w-0 h-10 group-hover:px-5 group-hover:w-52 text-sm word transition-all delay-100 placeholder:text-sm"
                        type="text"
                        placeholder="مخاطب را جست و جو کنید"
                        value={searchBoxValue}
                    />
                </div>
            )}
        </div>
    );
}
