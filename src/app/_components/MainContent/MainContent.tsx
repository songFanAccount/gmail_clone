import ActionsHeader from "./ActionsHeader"
import Emails from "./Emails"
import Tabs from "./Tabs"

const MainContent = () => {
  return (
    <div className="
      flex-1 bg-white rounded-[16px] mb-4 mr-3 px-1 pt-1
      flex flex-col
    ">
      <ActionsHeader/>
      <div className="pr-2">
        <Tabs/>
      </div>
      <Emails/>
    </div>
  )
}

export default MainContent