import Image from "next/image";
import { IoIosMenu as MenuIcon } from "react-icons/io";
import ProfileButton from "./ProfileButton";
import SearchBar from "./SearchBar";
import { signIn, useSession } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession()
  return (
    <div className="w-full h-16 p-2 flex flex-row items-center">
      <div className="w-[238px] flex flex-row gap-[6px] items-center">
        <button className="
          rounded-full w-12 h-12 flex items-center justify-center 
          text-gray-700 cursor-pointer hover:bg-gray-200
        ">
          <MenuIcon className="w-6 h-6"/>
        </button>
        <button className="
          w-[109px] h-10 flex flex-row gap-3 items-center
          cursor-pointer
        ">
          <Image
            src="/gmail.png"
            alt="Gmail Home Button"
            width={28}
            height={28}
            priority
          />
          <span className="
            text-gray-700 text-[22px]
          ">
            Gmail
          </span>
        </button>
      </div>
      <div className="
        flex-1 max-w-[720px]
      ">
        <SearchBar/>
      </div>
      <div className="mr-1 w-[238px] flex flex-row justify-end ml-auto">
        {
          session?.user
          ?
            <ProfileButton/>
          :
            <button className="
              border-[1px] rounded-[10px] px-2 py-1 text-gray-700
              cursor-pointer hover:bg-black hover:text-white
            "
              onClick={() => signIn("google")}
            >
              <span>
                Login
              </span>
            </button>
        }
      </div>
    </div>
  )
}
export default Header