"use client";

import { signIn, useSession } from "next-auth/react";

const HomePage = () => {
  const user = useSession()
  return (
    <div className="w-screen h-screen">
      <button className="p-2 cursor-pointer bg-gray-600"
        onClick={() => signIn("google")}
      >
        <span>Log in</span>
      </button>
      {
        user.data?.user.name
      }
    </div>
  )
}

export default HomePage