"use client";

import { signIn } from "next-auth/react";

const HomePage = () => {
  return (
    <div className="w-screen h-screen">
      <button className="p-2 cursor-pointer bg-gray-600"
        onClick={() => signIn("google")}
      >
        <span>Log in</span>
      </button>
    </div>
  )
}

export default HomePage