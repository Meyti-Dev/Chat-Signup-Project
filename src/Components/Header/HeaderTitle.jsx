// icons
import { HiMiniUserCircle } from "react-icons/hi2"

export default function HeaderTitle() {
    
    // jsx
    return (
        <div className="flex items-center justify-center gap-4 cursor-default">
            <div className="w-3 h-3 rounded-full bg-lime-500 shadow-[0_0_1rem_#84cc16]"></div>
            {/* text */}
            <h1 className="text-white text-xl word">مدیریت کننده <span className="text-lime-500">مخاطبین</span> و چت همگانی</h1>
        </div>
    )
}
