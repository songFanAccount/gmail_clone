import { signOut, useSession } from "next-auth/react"
import * as Popover from "@radix-ui/react-popover";

const ProfileButton = () => {
  const { data: session } = useSession()
  const userName = session?.user.name
  const profileLetter = userName?.length ? userName[0]?.toUpperCase() : ""
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button className="
          flex flex-row items-center justify-center
          w-8 h-8 bg-[#004d40] rounded-full cursor-pointer
        ">
          <span className="text-white">
            {profileLetter}
          </span>
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          side="bottom"
          align="start"
          className="bg-white rounded-[6px] p-2 z-50 relative top-2 right-3"
          style={{
            boxShadow: "0 4px 16px 0 rgba(0, 0, 0, .25)",
            width: "80px"
          }}
        >
          <button className="
            w-full hover:bg-gray-200 rounded-[6px] cursor-pointer text-gray-700 text-[13px] py-1
          "
          onClick={() => signOut()}
          >
            <span>Log out</span>
          </button>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}

export default ProfileButton