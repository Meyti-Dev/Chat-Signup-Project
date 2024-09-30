// picture
import picture from "../../pictures/notfound.png"

export default function NotFoundUser() {
  
  // jsx
  return (
    <div className="overflow-hidden w-[500px] h-[400px] mx-auto">
      {/* picture */}
      <img className="w-full h-full object-cover" src={picture} alt="pictures" />
      {/* title */}
      <h2 className="text-white text-xl text-center -mt-24">مخاطب مورد نظر یافت نشد !</h2>
    </div>
  )
}
