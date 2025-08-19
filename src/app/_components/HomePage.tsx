"use client";

import { useEffect, useState } from "react";
import Header from "./Header/Header";
import MainContent from "./MainContent/MainContent";
import SideBar from "./Sidebar/SideBar";

export interface LabelInfo {
  id: string;
  name: string;
  type: string;
  messagesTotal?: number;
  messagesUnread?: number;
  threadsTotal?: number;
  threadsUnread?: number;
}
const HomePage = () => {
  const [labelsInfo, setLabelsInfo] = useState<Record<string, LabelInfo> | undefined>(undefined)
  async function syncEmailLabels() {
    const res = await fetch("/api/gmail/labels")
    const data = await res.json() as LabelInfo[]
    const newLabelsInfo: Record<string, LabelInfo> = {}
    data.forEach(labelInfo => {
      newLabelsInfo[labelInfo.id] = labelInfo
    })
    setLabelsInfo(newLabelsInfo)
  }
  useEffect(() => {
    void syncEmailLabels()
  }, [])
  return (
    <div className="w-screen h-screen bg-[#f8fafd] flex flex-col">
      <Header/>
      <div className="h-full w-full flex flex-row">
        <SideBar labelsInfo={labelsInfo}/>
        <MainContent/>
      </div>
    </div>
  )
}

export default HomePage