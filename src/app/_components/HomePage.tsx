"use client";

import Header from "./Header/Header";
import SideBar from "./Sidebar/SideBar";

const HomePage = () => {
  return (
    <div className="w-screen h-screen bg-[#f8fafd] flex flex-col">
      <Header/>
      <div className="h-full w-full flex flex-row">
        <SideBar/>
      </div>
    </div>
  )
}

export default HomePage