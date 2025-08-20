import { CgInbox as InboxIcon } from "react-icons/cg";
import { GoTag as PromotionsIcon } from "react-icons/go";
import { MdOutlinePeople as SocialsIcon } from "react-icons/md";

interface TabInfo {
  name: string,
  Icon: React.ElementType
}
const Tabs = () => {
  const tabs: TabInfo[] = [
    {name: "Primary", Icon: InboxIcon},
    {name: "Promotions", Icon: PromotionsIcon},
    {name: "Social", Icon: SocialsIcon},
  ]
  return (
    <div className="
      h-[56px] w-full flex flex-row gap-3 items-center text-gray-800 ml-1 border-b-[1px] border-gray-200 z-1
    ">
      {
        tabs.map((tab, index) => {
          const {name, Icon} = tab
          const selected = index === 0
          return (
            <button key={index} className="flex flex-row items-center gap-4 pl-[10px] h-full w-[200px] cursor-pointer"
              style={{
                color: selected ? "blue" : undefined,
                borderBottom: selected ? "3px solid" : undefined
              }}
            >
              <Icon className="w-4 h-4"/>
              <span className="text-[14px]">{name}</span>
            </button>
          )
        })
      }
    </div>
  )
}

export default Tabs