import { useSession } from "next-auth/react"
import type { LabelInfo } from "../HomePage"
import ActionsHeader from "./ActionsHeader"
import Emails from "./Emails"
import Tabs from "./Tabs"
import { useEffect, useState } from "react"

export interface GmailMessage {
  id: string;
  threadId: string;
  labels: string[];
  snippet: string;
  date: Date;
  from: string;
  to?: string;
  subject: string;
}
export interface ThreadsMetadata {
  messages: (GmailMessage | null)[],
  nextPageToken: string,
  resultSizeEstimate: number
}
interface MainContentProps {
  selectedLabelInfo?: LabelInfo
}
const MainContent = ({ selectedLabelInfo } : MainContentProps) => {
  const labelId = selectedLabelInfo?.id
  const { data: session } = useSession()
  const [threadsMetadata, setThreadsMetadata] = useState<ThreadsMetadata | undefined>(undefined)
  const [selectAll, setSelectAll] = useState<boolean>(false)
  const [selectedIndices, setSelectedIndices] = useState<Set<number>>(new Set())
  const [starredIndices, setStarredIndices] = useState<Set<number>>(new Set())
  function onCheckIndex(i: number) {
    const newIndices = new Set(selectedIndices)
    if (newIndices.has(i)) {
      newIndices.delete(i)
      setSelectAll(false)
    } else newIndices.add(i)
    setSelectedIndices(newIndices)
  }
  function onSelectAll() {
    if (selectedIndices.size > 0) {
      setSelectedIndices(new Set())
      setSelectAll(false)
    } else {
      if (threadsMetadata) {
        setSelectedIndices(new Set(Array.from({ length: threadsMetadata.messages.length}, (_, i) => i)))
      }
      setSelectAll(true)
    }
  }
  function onStarIndex(i: number) {
    const newIndices = new Set(starredIndices)
    if (newIndices.has(i)) {
      newIndices.delete(i)
    } else newIndices.add(i)
    setStarredIndices(newIndices)
  }
  async function syncInitEmails(labelId: string) {
    if (!session?.user) return
    const res = await fetch(`/api/gmail/sync?labelId=${labelId.toUpperCase()}`)
    const data = await res.json() as ThreadsMetadata
    setThreadsMetadata(data)
  }
  useEffect(() => {
    if (labelId) {
      void syncInitEmails(labelId)
    }
  }, [labelId])
  return (
    <div className="
      flex-1 bg-white rounded-[16px] mb-4 mr-3 pr-1 pt-1
      flex flex-col overflow-y-hidden
    ">
      <ActionsHeader selectedLabelInfo={selectedLabelInfo} selectAll={selectAll} selectSome={selectedIndices.size > 0} onCheck={onSelectAll}/>
      <div className="pr-2 pl-1 flex-none">
        <Tabs/>
      </div>
      <div className="flex-1 overflow-hidden">
        <Emails threadsMetadata={threadsMetadata} selectedIndices={selectedIndices} starredIndices={starredIndices} onCheckIndex={onCheckIndex} onStarIndex={onStarIndex}/>
      </div>
    </div>
  )
}

export default MainContent