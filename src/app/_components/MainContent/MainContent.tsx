import type { LabelInfo } from "../HomePage"
import ActionsHeader from "./ActionsHeader"
import Emails from "./Emails"
import Tabs from "./Tabs"

interface MainContentProps {
  selectedLabelInfo?: LabelInfo
}
const MainContent = ({ selectedLabelInfo } : MainContentProps) => {
  // const [threadsMetadata, setThreadsMetadata] = 
  return (
    <div className="
      flex-1 bg-white rounded-[16px] mb-4 mr-3 px-1 pt-1
      flex flex-col
    ">
      <ActionsHeader selectedLabelInfo={selectedLabelInfo}/>
      <div className="pr-2">
        <Tabs/>
      </div>
      <Emails/>
    </div>
  )
}

export default MainContent