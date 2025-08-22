import { RiCheckboxBlankLine as UncheckedIcon, RiCheckboxLine as CheckedIcon, RiCheckboxIndeterminateLine as SomeCheckedIcon, RiArrowDropDownFill as DropdownIcon } from "react-icons/ri";

import { IoMdRefresh as RefreshIcon, IoMdMore as MoreIcon } from "react-icons/io";
import { MdOutlineKeyboardArrowLeft as LeftArrowIcon, MdOutlineKeyboardArrowRight as RightArrowIcon  } from "react-icons/md";
import type { LabelMetadata } from "~/types/gmails";

interface ActionsHeaderProps {
  selectedLabelInfo?: LabelMetadata,
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
        <button className="cursor-pointer ml-2 w-8 h-8 flex justify-center items-center rounded-full hover:bg-gray-200"
          onClick={syncEmails}
        >
          <RefreshIcon className="w-5 h-5"/>
        </button>
        <button className="w-8 h-8 ml-2 flex justify-center items-center hover:bg-gray-200 rounded-full">
          <MoreIcon className="w-5 h-5 cursor-pointer flex-shrink-0"/>
        </button>
      </div>
      <div className="flex flex-row items-center gap-1 mr-5">
        {totalNumThreads && <span className="text-[12px] tracking-wide mr-2">1-50 of {totalNumThreads.toLocaleString()}</span>}
        <button className="w-8 h-8 flex justify-center items-center rounded-full cursor-pointer hover:bg-[var(--hover-color)]"
          style={{
            color: canGoBackPage ? undefined : "#aeb0af",
            cursor: canGoBackPage ? "pointer" : "default",
            '--hover-color': canGoBackPage ? "#e5e7eb" : undefined
          } as React.CSSProperties}
        >
          <LeftArrowIcon className="w-5 h-5"/>
        </button>
        <button className="w-8 h-8 flex justify-center items-center rounded-full cursor-pointer hover:bg-[var(--hover-color)]"
          style={{
            color: canGoForwardPage ? undefined : "#aeb0af",
            cursor: canGoForwardPage ? "pointer" : "default",
            '--hover-color': canGoForwardPage ? "#e5e7eb" : undefined
          } as React.CSSProperties}
        >
          <RightArrowIcon className="w-5 h-5 relative"/>
        </button>
      </div>
    </div>
  )
}
export default ActionsHeader