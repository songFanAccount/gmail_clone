import { CgInbox as InboxIcon } from "react-icons/cg";

const Tabs = () => {
  return (
    <div className="
      h-[56px] w-full flex flex-row items-center text-blue-700 ml-1 border-b-[1px] border-gray-200
    ">
      <button className="flex flex-row items-center gap-4 pl-[10px] h-full w-[200px] border-b-[3px] cursor-pointer">
        <InboxIcon className="w-4 h-4"/>
        <span className="text-[14px] relative top-[1px]">Primary</span>
      </button>
    </div>
  )
}

export default Tabs