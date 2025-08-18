import { useSession } from "next-auth/react"

const ProfileButton = () => {
  const session = useSession()
  const userName = session.data?.user.name
  const profileLetter = userName?.length ? userName[0]?.toUpperCase() : ""
  return (
    <button className="
      flex flex-row items-center justify-center
      w-8 h-8 bg-[#004d40] rounded-full
    ">
      <span className="text-white">
        {profileLetter}
      </span>
    </button>
  )
}

export default ProfileButton