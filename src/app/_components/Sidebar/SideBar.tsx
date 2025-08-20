import { RiPencilLine as ComposeIcon, RiSendPlane2Line as SentIcon } from "react-icons/ri";
import { CgInbox as InboxIcon } from "react-icons/cg";
import { IoMdStarOutline as StarredIcon } from "react-icons/io";
import { FaRegFile as DraftIcon, FaRegTrashAlt as TrashIcon } from "react-icons/fa";
import { MdKeyboardArrowDown as DropdownIcon, MdKeyboardArrowUp as CollapseIcon, MdLabelImportantOutline as ImportantIcon, MdOutlineScheduleSend as ScheduledIcon } from "react-icons/md";
import { PiWarningOctagonFill as SpamIcon } from "react-icons/pi";
import { useState } from "react";
import { EmailCategories, type LabelInfo } from "../HomePage";

const ComposeButton = () => {
  return (
    <button className="
      w-[142px] h-[56px] bg-[#c2e7ff] rounded-[14px] ml-2 mt-2 mb-4
      flex flex-row items-center
      cursor-pointer shadow-[0_1px_2px_0_rgb(60_64_67_/_15%)]
      hover:shadow-[0_2px_6px_rgb(60_64_67_/_30%)]
    ">
      <div className="w-[56px] h-[56px] flex justify-center items-center">
        <ComposeIcon className="w-6 h-6"/>
      </div>
      <span className="text-[14px]">Compose</span>
    </button>
  )
}
interface EmailCategory {
  category: EmailCategories,
  Icon: React.ElementType,
  size?: number | string,
}
interface SideBarProps {
  labelsInfo?: Record<string, LabelInfo>,
  selectedCategory: EmailCategories,
  setSelectedCategory: (newCategory: EmailCategories) => void
}
const SideBar = ({ labelsInfo, selectedCategory, setSelectedCategory } : SideBarProps) => {
  const [showMore, setShowMore] = useState<boolean>(false)  
  const emailCategories: EmailCategory[] = [
    {category: EmailCategories.INBOX, Icon: InboxIcon},
    {category: EmailCategories.STARRED, Icon: StarredIcon, size: "20px"},
    {category: EmailCategories.SENT, Icon: SentIcon},
    {category: EmailCategories.DRAFTS, Icon: DraftIcon},
  ]
  const moreEmailCategories: EmailCategory[] = [
    {category: EmailCategories.IMPORTANT, Icon: ImportantIcon, size: "18px"},
    {category: EmailCategories.SCHEDULED, Icon: ScheduledIcon},
    {category: EmailCategories.SPAM, Icon: SpamIcon},
    {category: EmailCategories.TRASH, Icon: TrashIcon, size: "14px"},
  ]
  return (
    <div className="
      w-[256px] min-w-[256px] flex flex-col flex-shrink-0
    ">
      <ComposeButton/>
      <div className="
        flex flex-col w-[240px] text-gray-800
      ">
        {emailCategories.map((category, index) => {
          const {category: c, Icon, size} = category
          const name = c as string
          const selected = c === selectedCategory
          const labelInfo = labelsInfo?.[name]
          const numUnreadThreads = labelInfo?.threadsUnread
          const hasUnread = numUnreadThreads !== undefined && numUnreadThreads > 0
          return (
            <button key={index} className="
              h-8 rounded-tr-[16px] rounded-br-[16px] 
              hover:bg-[var(--hover-color)] cursor-pointer
              flex flex-row items-center pl-2
            "
              style={{
                backgroundColor: selected ? "#d3e3fd" : undefined,
                '--hover-color': selected ? "#d3e3fd" : "#ebedf0",
                color: selected ? "black" : undefined
              } as React.CSSProperties}
              onClick={() => setSelectedCategory(name as EmailCategories)}
            >
              <div className="w-[56px] flex justify-center items-center">
                <Icon
                  style={{
                    width: size ?? "16px" ,
                    height: size ?? "16px"
                  }}
                />
              </div>
              <span className="text-[14px]"
                style={{
                  fontWeight: (selected || hasUnread) ? 500 : undefined
                }}
              >
                {name}
              </span>
              {
                hasUnread &&
                <span className="text-[12px] font-[500] ml-auto mr-3">
                  {numUnreadThreads.toLocaleString()}
                </span>
              }
            </button>
          )
        })}
        <button className="
          h-8 rounded-tr-[16px] rounded-br-[16px] 
          hover:bg-[#ebedf0] cursor-pointer
          flex flex-row items-center pl-2
        "
          onClick={() => setShowMore(prev => !prev)}
        >
          <div className="w-[56px] flex justify-center items-center">
            {
              showMore
              ?
                <CollapseIcon className="w-5 h-5"/>
              :  
                <DropdownIcon className="w-5 h-5"/>
            }
          </div>
          <span className="text-[14px]"
          >
            {`${showMore ? "Less" : "More"}`}
          </span>
        </button>
        {showMore && moreEmailCategories.map((category, index) => {
          const {category: c, Icon, size} = category
          const name = c as string
          const selected = c === selectedCategory
          const numUnreadThreads = labelsInfo?.[name.toUpperCase()]?.threadsUnread
          const hasUnread = numUnreadThreads !== undefined && numUnreadThreads > 0
          return (
            <button key={index} className="
              h-8 rounded-tr-[16px] rounded-br-[16px] 
              hover:bg-[var(--hover-color)] cursor-pointer
              flex flex-row items-center pl-2
            "
              style={{
                backgroundColor: selected ? "#d3e3fd" : undefined,
                '--hover-color': selected ? "#d3e3fd" : "#ebedf0",
                color: selected ? "black" : undefined
              } as React.CSSProperties}
              onClick={() => setSelectedCategory(name as EmailCategories)}
            >
              <div className="w-[56px] flex justify-center items-center">
                <Icon
                  style={{
                    width: size ?? "16px" ,
                    height: size ?? "16px"
                  }}
                />
              </div>
              <span className="text-[14px]"
                style={{
                  fontWeight: (selected || hasUnread) ? 500 : undefined
                }}
              >
                {name}
              </span>
              {
                hasUnread &&
                <span className="text-[12px] font-[500] ml-auto mr-3">
                  {numUnreadThreads.toLocaleString()}
                </span>
              }
            </button>
          )
        })}
      </div>
    </div>
  )
}
export default SideBar