import type { GmailMessage, ThreadsMetadata } from "./MainContent"
import { RiCheckboxBlankLine as UncheckedIcon, RiCheckboxLine as CheckedIcon } from "react-icons/ri";
import { IoMdStarOutline as UnstarredIcon, IoMdStar as StarredIcon } from "react-icons/io";
import { FaRegTrashAlt as TrashIcon } from "react-icons/fa";
import { HiOutlineMailOpen as ReadIcon } from "react-icons/hi";
import { MdOutlineMarkEmailUnread as UnreadIcon } from "react-icons/md";

import he from "he"
import { useState } from "react";

interface GmailThreadDisplay {
  from: string,
  subject: string,
  date: Date,
  snippet: string,
  labels: string[]
}
const baseStyle: React.CSSProperties = {
  boxShadow: "0 0px 2px rgba(60,64,67,0.15)",
  transition: "box-shadow  ease-in-out",
  zIndex: 3
};
const hoverStyle: React.CSSProperties = {
  boxShadow: "0 0px 2px rgba(60,64,67,0.30), 0 0px 3px 1px rgba(60,64,67,0.15)",
  zIndex: 4
};
const EmailListElement = ({ message, selected, starred, onCheck, onStar } : { message: GmailMessage | null, selected: boolean, onCheck: () => void, starred: boolean, onStar: () => void }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false)
  if (!message) return <div className="
    w-full h-10 cursor-pointer
  "/>
  const CheckboxIcon = selected ? CheckedIcon : UncheckedIcon
  const {from, subject, date, snippet, labels} = cleanGmailMessage(message)
  const unread = labels.includes('UNREAD')
  const now = new Date()
  const formattedDate = date.toDateString() === now.toDateString()
  ?
    date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit", hour12: true }).toUpperCase()
  :
    date.toLocaleDateString("en-US", {
      month: date.getFullYear() === now.getFullYear() ? "short" : "numeric",
      day: "numeric",
      year: date.getFullYear() === now.getFullYear() ? undefined : "2-digit"
    })
  interface ThreadButtonInfo {
    Icon: React.ElementType,
    func: () => void,
    size?: string
  }
  function onTrash() {
    console.log("trash")
  }
  function onRead() {
    console.log("read")
  }
  const threadButtons: ThreadButtonInfo[] = [
    {Icon: TrashIcon, func: onTrash, size: "14px"},
    {Icon: unread ? UnreadIcon : ReadIcon, func: onRead},
  ]
  const StarIcon = starred ? StarredIcon : UnstarredIcon
  return (
    <button className="
      w-full h-10 flex-shrink-0 cursor-pointer bg-[#f3f6fd] pl-2
      border-gray-200
    "
      style={{ ...baseStyle, ...(isHovered ? hoverStyle : {}), backgroundColor: selected ? "#c3dbff" : "#f3f6fd" }}
      onMouseEnter={() => {setIsHovered(true); console.log(labels)}}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="
        flex flex-row items-center text-[14px]
        font-[300]
      ">
        <div className="flex justify-center items-center w-9 h-9 flex-shrink-0"
          style={{
            color: isHovered || selected ? "black" : "#99a1af"
          }}
          onClick={onCheck}
        >
          <CheckboxIcon className="w-4 h-4"/>
        </div>
        <div className="pr-[10px] pb-[1px]"
          style={{
            color: starred ? (isHovered ? "#f4b300" : "#f4c867") : isHovered ? "black" : "#99a1af"
          }}
          onClick={onStar}
        >
          <StarIcon className="w-5 h-5 flex-shrink-0"/>
        </div>
        <div className="flex flex-row justify-start min-w-[200px] w-[200px] max-w-[200px] pr-8">
          <span className="truncate" style={{fontWeight: unread ? 600 : undefined}}>{from}</span>
        </div>
        <span className="overflow-hidden whitespace-nowrap flex-shrink-1 pr-2" style={{fontWeight: unread ? 600 : undefined}}>{subject}</span>
        {snippet.trim() !== "" && <span className="truncate text-gray-500 flex-shrink-50">- {he.decode(snippet)}</span>}
        {
          isHovered
          ?
            <div className="
              flex flex-row items-center h-full
              ml-auto pl-6 mr-2 flex-shrink-0
            ">
              {
                threadButtons.map((threadInfo, index) => {
                  const {Icon, func, size} = threadInfo
                  return (
                    <div key={index} className="w-8 h-8 rounded-full flex justify-center items-center hover:bg-gray-200 text-gray-600"
                      onClick={(e) => {
                        e.stopPropagation()
                        func()
                      }}
                    >
                      <Icon
                        style={{
                          width: size ?? "16px",
                          height: size ?? "16px",
                        }}
                      />
                    </div>
                  )
                })
              }
            </div>
          :
            <span className="flex justify-end whitespace-nowrap ml-auto pl-10 mr-4 w-[80px] flex-shrink-0 text-gray-600 text-[12px]"
              style={{fontWeight: unread ? 600 : undefined, color: unread ? "black" : undefined}}
            >{formattedDate}</span>
        }
      </div>
    </button>
  )
}
function cleanGmailMessage(message: GmailMessage): GmailThreadDisplay {
  const {from, subject, snippet, labels, date} = message
  const regex = /^(.*?)(?:\s*<(.+)>)?$/
  const match = regex.exec(from)
  const fromName = match?.[1]?.replace(/^"|"$/g, "").trim();
  const subjectCleaned = subject.trim() === "" ? "(no subject)" : subject.trim()
  return {
    from: fromName ?? "",
    subject: subjectCleaned,
    snippet,
    labels,
    date: new Date(date)
  }
}
interface EmailsProps {
  threadsMetadata?: ThreadsMetadata,
  selectedIndices: Set<number>,
  onCheckIndex: (i: number) => void,
  starredIndices: Set<number>,
  onStarIndex: (i: number) => void
}
const Emails = ({ threadsMetadata, selectedIndices, onCheckIndex, starredIndices, onStarIndex } : EmailsProps) => {
  const messages = threadsMetadata?.messages
  return (
    <div className="w-full h-full max-h-full flex-1 flex flex-col overflow-y-auto pr-1">
      {
        messages?.map((message, index) => 
          <EmailListElement key={index} message={message} selected={selectedIndices.has(index)} starred={starredIndices.has(index)} onCheck={() => onCheckIndex(index)} onStar={() => onStarIndex(index)}/>
        )
      }
    </div>
  )
}

export default Emails