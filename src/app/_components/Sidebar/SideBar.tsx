import { RiPencilLine as ComposeIcon, RiSendPlane2Line as SentIcon } from "react-icons/ri";
import { CgInbox as InboxIcon } from "react-icons/cg";
import { IoMdStarOutline as StarredIcon } from "react-icons/io";
import { FiClock as SnoozedIcon } from "react-icons/fi";
import { FaRegFile as DraftIcon } from "react-icons/fa";
import { MdKeyboardArrowDown as DropdownIcon } from "react-icons/md";

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
  name: string,
  Icon: React.ElementType,
  size?: number | string,
  numEmails?: number
}
const SideBar = () => {
  const emailCategories: EmailCategory[] = [
    {name: "Inbox", Icon: InboxIcon, numEmails: 42},
    {name: "Starred", Icon: StarredIcon, size: "20px"},
    {name: "Snoozed", Icon: SnoozedIcon},
    {name: "Sent", Icon: SentIcon},
    {name: "Drafts", Icon: DraftIcon},
  ]
  return (
    <div className="
      w-[256px] flex flex-col
    ">
      <ComposeButton/>
      <div className="
        flex flex-col w-[240px] text-gray-800
      ">
        {emailCategories.map((category, index) => {
          const {name, Icon, size, numEmails} = category
          const selected = index === 0
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
                  fontWeight: selected ? 500 : undefined
                }}
              >
                {name}
              </span>
              {
                numEmails !== undefined &&
                <span className="text-[12px] font-[500] ml-auto mr-3">
                  {numEmails.toLocaleString()}
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
        >
          <div className="w-[56px] flex justify-center items-center">
            <DropdownIcon className="w-5 h-5"/>
          </div>
          <span className="text-[14px]"
          >
            More
          </span>
        </button>
      </div>
    </div>
  )
}
export default SideBar