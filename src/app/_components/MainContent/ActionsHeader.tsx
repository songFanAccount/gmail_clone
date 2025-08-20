import { RiCheckboxBlankLine as UncheckedIcon, RiCheckboxLine as CheckedIcon, RiCheckboxIndeterminateLine as SomeCheckedIcon, RiArrowDropDownFill as DropdownIcon } from "react-icons/ri";

import { IoMdRefresh as RefreshIcon, IoMdMore as MoreIcon } from "react-icons/io";
import { MdOutlineKeyboardArrowLeft as LeftArrowIcon, MdOutlineKeyboardArrowRight as RightArrowIcon  } from "react-icons/md";
import type { LabelInfo } from "../HomePage";

interface ActionsHeaderProps {
  selectedLabelInfo?: LabelInfo,
  selectAll: boolean,
  selectSome: boolean,
  onCheck: () => void
}
const ActionsHeader = ({ selectedLabelInfo, selectAll, selectSome, onCheck } : ActionsHeaderProps) => {
  const canGoBackPage = false
  const canGoForwardPage = true
  const totalNumThreads = selectedLabelInfo?.threadsTotal
  const CheckboxIcon = selectAll ? CheckedIcon : selectSome ? SomeCheckedIcon : UncheckedIcon
  async function syncEmails() {
    // const res = await fetch("/api/gmail/sync")
    // const data = await res.json() as JSON
    // console.log(data)
  }
  return (
    <div className="
      h-12 w-full flex flex-row items-center justify-between
      pl-4 text-gray-600
    ">
      <div className="flex flex-row items-center">
        <CheckboxIcon className="w-5 h-5 cursor-pointer" onClick={onCheck}/>
        <DropdownIcon className="w-6 h-6 cursor-pointer"/>
        <button className="cursor-pointer ml-5"
          onClick={syncEmails}
        >
          <RefreshIcon className="w-5 h-5"/>
        </button>
        <MoreIcon className="w-5 h-5 ml-5 cursor-pointer"/>
      </div>
      <div className="flex flex-row items-center gap-4 mr-5">
        {totalNumThreads && <span className="text-[12px] tracking-wide">1-50 of {totalNumThreads.toLocaleString()}</span>}
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