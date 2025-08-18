import { RiCheckboxBlankLine as CheckboxIcon, RiArrowDropDownFill as DropdownIcon } from "react-icons/ri";
import { IoMdRefresh as RefreshIcon, IoMdMore as MoreIcon } from "react-icons/io";
import { MdOutlineKeyboardArrowLeft as LeftArrowIcon, MdOutlineKeyboardArrowRight as RightArrowIcon  } from "react-icons/md";

const ActionsHeader = () => {
  const canGoBackPage = false
  const canGoForwardPage = true
  return (
    <div className="
      h-12 w-full flex flex-row items-center justify-between
      pl-3 text-gray-600
    ">
      <div className="flex flex-row items-center">
        <CheckboxIcon className="w-5 h-5 cursor-pointer"/>
        <DropdownIcon className="w-6 h-6 cursor-pointer"/>
        <RefreshIcon className="w-5 h-5 ml-5 cursor-pointer"/>
        <MoreIcon className="w-5 h-5 ml-5 cursor-pointer"/>
      </div>
      <div className="flex flex-row items-center gap-4 mr-6">
        <span className="text-[12px] tracking-wide">1-50 of 3,120</span>
        <LeftArrowIcon className="w-5 h-5 cursor-pointer"
          style={{
            color: canGoBackPage ? undefined : "#aeb0af",
            cursor: canGoBackPage ? "pointer" : "default"
          }}
        />
        <RightArrowIcon className="w-5 h-5 cursor-pointer relative"
          style={{
            color: canGoForwardPage ? undefined : "#aeb0af",
            cursor: canGoForwardPage ? "pointer" : "default"
          }}
        />
      </div>
    </div>
  )
}
export default ActionsHeader