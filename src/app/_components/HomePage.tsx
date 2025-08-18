"use client";

import Header from "./Header/Header";
import MainContent from "./MainContent/MainContent";
import SideBar from "./Sidebar/SideBar";

const HomePage = () => {
  return (
    <div className="w-screen h-screen bg-[#f8fafd] flex flex-col">
      <Header/>
      <div className="h-full w-full flex flex-row">
        <SideBar/>
        <MainContent/>
      </div>
    </div>
  )
}

export default HomePage