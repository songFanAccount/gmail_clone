import { RiPencilLine as ComposeIcon, RiSendPlane2Line as SentIcon } from "react-icons/ri";
import { CgInbox as InboxIcon } from "react-icons/cg";
import { IoMdStarOutline as StarredIcon } from "react-icons/io";
import { FaRegFile as DraftIcon, FaRegTrashAlt as TrashIcon } from "react-icons/fa";
import { MdKeyboardArrowDown as DropdownIcon, MdKeyboardArrowUp as CollapseIcon, MdLabelImportantOutline as ImportantIcon, MdOutlineScheduleSend as ScheduledIcon } from "react-icons/md";
import { PiWarningOctagonFill as SpamIcon } from "react-icons/pi";
import { useState } from "react";
import { EmailCategories, type LabelMetadata } from "~/types/gmails";
import { useRouter } from "next/navigation";

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

const LabelButton = ({ category, selected, labelMetadata, onClick } : { category: EmailCategory, selected: boolean, labelMetadata?: LabelMetadata, onClick: () => void}) => {
  const {category: c, Icon, size} = category
  const name = c as string
  const numUnreadThreads = c === EmailCategories.DRAFTS ? labelMetadata?.threadsTotal : labelMetadata?.threadsUnread
  const hasUnread = numUnreadThreads !== undefined && numUnreadThreads > 0
  return (
    <button className="
      h-8 rounded-tr-[16px] rounded-br-[16px] 
      hover:bg-[var(--hover-color)] cursor-pointer
      flex flex-row items-center pl-2
    "
      style={{
        backgroundColor: selected ? "#d3e3fd" : undefined,
        '--hover-color': selected ? "#d3e3fd" : "#ebedf0",
        color: selected ? "black" : undefined
      } as React.CSSProperties}
      onClick={onClick}
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
}
interface EmailCategory {
  category: EmailCategories,
  categoryUrl: string,
  Icon: React.ElementType,
  size?: number | string,
}
interface SideBarProps {
  labelsMetadata: Partial<Record<EmailCategories, LabelMetadata>>,
  selectedCategory?: EmailCategories,
}
const SideBar = ({ labelsMetadata, selectedCategory } : SideBarProps) => {
  const router = useRouter()
  function setSelectedCategory(urlName: string) {
    router.push(`/mail/${urlName}`)
  }
  const emailCategories: EmailCategory[] = [
    {category: EmailCategories.INBOX, categoryUrl: "inbox", Icon: InboxIcon},
    {category: EmailCategories.STARRED, categoryUrl: "starred", Icon: StarredIcon, size: "20px"},
    {category: EmailCategories.SENT, categoryUrl: "sent", Icon: SentIcon},
    {category: EmailCategories.DRAFTS, categoryUrl: "drafts", Icon: DraftIcon},
  ]
  const moreEmailCategories: EmailCategory[] = [
    {category: EmailCategories.IMPORTANT, categoryUrl: "imp", Icon: ImportantIcon, size: "18px"},
    {category: EmailCategories.SCHEDULED, categoryUrl: "scheduled", Icon: ScheduledIcon},
    {category: EmailCategories.SPAM, categoryUrl: "spam", Icon: SpamIcon},
    {category: EmailCategories.TRASH, categoryUrl: "trash", Icon: TrashIcon, size: "14px"},
  ]
  const [showMore, setShowMore] = useState<boolean>(moreEmailCategories.some(category => category.category === selectedCategory))
  return (
    <div className="
      w-[256px] min-w-[256px] flex flex-col flex-shrink-0
    ">
      <ComposeButton/>
      <div className="
        flex flex-col w-[240px] text-gray-800
      ">
        {emailCategories.map((category, index) => <LabelButton key={index} category={category} selected={category.category === selectedCategory} onClick={() => setSelectedCategory(category.categoryUrl)} labelMetadata={labelsMetadata?.[category.category]}/>)}
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
              ? <CollapseIcon className="w-5 h-5"/>
              : <DropdownIcon className="w-5 h-5"/>
            }
          </div>
          <span className="text-[14px]"
          >
            {`${showMore ? "Less" : "More"}`}
          </span>
        </button>
        {showMore && moreEmailCategories.map((category, index) => <LabelButton key={index} category={category} selected={category.category === selectedCategory} onClick={() => setSelectedCategory(category.categoryUrl)} labelMetadata={labelsMetadata?.[category.category]}/>)}
      </div>
    </div>
  )
}
export default SideBar