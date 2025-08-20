"use client";

import { useEffect, useState } from "react";
import Header from "./Header/Header";
import MainContent from "./MainContent/MainContent";
import SideBar from "./Sidebar/SideBar";
import { useSession } from "next-auth/react";

export interface LabelInfo {
  id: string;
  name: string;
  type: string;
  messagesTotal?: number;
  messagesUnread?: number;
  threadsTotal?: number;
  threadsUnread?: number;
}
export const enum EmailCategories {
  INBOX = "Inbox",
  STARRED = "Starred",
  SENT = "Sent",
  DRAFTS = "Drafts",
  IMPORTANT = "Important",
  SCHEDULED = "Scheduled",
  SPAM = "Spam",
  TRASH = "Trash"  
}
const HomePage = () => {
  const { data: session } = useSession()
  const [labelsInfo, setLabelsInfo] = useState<Record<string, LabelInfo> | undefined>(undefined)
  const [selectedCategory, setSelectedCategory] = useState<EmailCategories>(EmailCategories.INBOX)
  async function syncEmailLabels() {
    if (!session?.user) return
    const res = await fetch("/api/gmail/labels")
    const data = (await res.json()) as LabelInfo[]
    const newLabelsInfo: Record<string, LabelInfo> = {}
    data.forEach(labelInfo => {
      const key = (labelInfo.id[0]?.toUpperCase() ?? "") + labelInfo.id.slice(1).toLowerCase()
      newLabelsInfo[key] = labelInfo
    })
    setLabelsInfo(newLabelsInfo)
  }
  useEffect(() => {
    if (session?.user) {
      void syncEmailLabels()
    }
  }, [session?.user])
  return (
    <div className="w-screen h-screen bg-[#f8fafd] flex flex-col">
      <Header/>
      <div className="h-full w-full flex flex-row">
        <SideBar labelsInfo={labelsInfo} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>
        <MainContent selectedLabelInfo={labelsInfo?.[selectedCategory as string]}/>
      </div>
    </div>
  )
}

export default HomePage