import type { GmailMessage, ThreadsMetadata } from "./MainContent"
import { RiCheckboxBlankLine as CheckboxIcon } from "react-icons/ri";
import { IoMdStarOutline as StarredIcon } from "react-icons/io";
import he from "he"

interface GmailThreadDisplay {
  from: string,
  subject: string,
  date: Date,
  snippet: string,
  labels: string[]
}
function cleanGmailMessage(message: GmailMessage): GmailThreadDisplay {
  const {from, subject, snippet, labels, date} = message
  const regex = /^(.*?)(?:\s*<(.+)>)?$/
  const match = regex.exec(from)
  const fromName = match?.[1]?.replace(/^"|"$/g, "").trim();
  return {
    from: fromName ?? "",
    subject,
    snippet,
    labels,
    date: new Date(date)
  }
}
interface EmailsProps {
  threadsMetadata?: ThreadsMetadata
}
const Emails = ({ threadsMetadata } : EmailsProps) => {
  const messages = threadsMetadata?.messages
  return (
    <div className="w-full h-full max-h-full flex-1 flex flex-col overflow-y-auto pr-1">
      {
        messages?.map((message, index) => {
          if (!message) return <div key={index} className="
            w-full h-10 cursor-pointer
          "/>
          const {from, subject, date, snippet, labels} = cleanGmailMessage(message)
          const formattedDate = date.toDateString() === (new Date()).toDateString()
          ?
            date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true }).toUpperCase()
          :
            date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })
          return (
            <button key={index} className="
              w-full h-10 flex-shrink-0 cursor-pointer bg-[#f3f6fd] pl-2
              border-b-[1px] border-gray-200
            ">
              <div className="
                flex flex-row items-center text-[14px]
                font-[300]
              ">
                <div className="flex justify-center items-center w-10 h-10 flex-shrink-0 text-gray-400">
                  <CheckboxIcon className="w-4 h-4"/>
                </div>
                <div className="pr-[10px] pb-[1px]">
                  <StarredIcon className="w-5 h-5 flex-shrink-0 text-gray-400"/>
                </div>
                <div className="flex flex-row justify-start min-w-[200px] w-[200px] max-w-[200px] pr-8">
                  <span className="truncate">{from}</span>
                </div>
                <span className="overflow-hidden whitespace-nowrap flex-shrink-1 pr-2">{subject}</span>
                <span className="truncate text-gray-500 flex-shrink-50">- {he.decode(snippet)}</span>
                <span className="flex justify-end whitespace-nowrap ml-auto pl-10 mr-4 w-[80px] flex-shrink-0 text-gray-600 text-[12px]">{formattedDate}</span>
              </div>
            </button>
          )
        })
      }
    </div>
  )
}

export default Emails