import { MdPostAdd } from "react-icons/md";
import { useSelector } from "react-redux";
import { selectUsers } from "../../redux/users";
import { Link } from "react-router-dom";
import { BiMessageSquareDetail } from "react-icons/bi";
import { GrUserAdmin } from "react-icons/gr";

// component
export default function HeaderTitle() {
    // get current user
    const { currentUser } = useSelector(selectUsers);

    // jsx
    return (
        <div className="flex items-center justify-center gap-4 cursor-default">
            {/* suggests */}
            <Link
                to={`/suggests/${currentUser?.id}`}
                className="relative flex items-center justify-center rounded-xl bg-blue-500 hover:bg-blue-600 transition-colors h-10 w-10"
            >
                {/* count */}
                {currentUser && (
                    <div className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 bg-white rounded-full">
                        <p className="font-bold text-xs">
                            {currentUser?.suggests.length}
                        </p>
                    </div>
                )}
                {/* icon */}
                <MdPostAdd className="text-white text-2xl" />
            </Link>
            {/* messages */}
            <Link
                to={`/messages/${currentUser?.id}`}
                className="relative flex items-center justify-center rounded-xl bg-blue-500 hover:bg-blue-600 transition-colors h-10 w-10"
            >
                {/* count */}
                {currentUser && (
                    <div className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 bg-white rounded-full">
                        <p className="font-bold text-xs">
                            {currentUser?.suggests.length}
                        </p>
                    </div>
                )}
                {/* icon */}
                <BiMessageSquareDetail className="text-white text-xl" />
            </Link>
            {/* management panel */}
            <Link
                to={"/adminpanel"}
                className="relative flex items-center justify-center rounded-xl bg-red-500 hover:bg-red-600 transition-colors h-10 w-10"
            >
                {/* icon */}
                <GrUserAdmin className="text-white text-xl" />
            </Link>
        </div>
    );
}
