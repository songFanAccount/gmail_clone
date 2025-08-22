"use client";

import Header from "~/app/_components/Header/Header";
import SideBar from "~/app/_components/Sidebar/SideBar";
import MainContent from "~/app/_components/MainContent/MainContent";
import { type EmailCategories, mapUrlCategory, type LabelMetadata } from "~/types/gmails";
import { useParams } from "next/navigation";
import { api } from "~/trpc/react";

const MailPage = () => {
  const { category } = useParams<{ category: string }>()
  const selectedCategory = mapUrlCategory[category]
  const { data: labelsArray } = api.gmail.fetchLabelsMetadata.useQuery()
  const labelsMetadata: Partial<Record<EmailCategories, LabelMetadata>> = {}
  labelsArray?.forEach((label) => {
    labelsMetadata[label.name] = label
  })
  return (
    <div className="w-screen h-screen bg-[#f8fafd] flex flex-col overflow-hidden">
      <Header/>
      <div className="h-full w-full flex flex-row overflow-hidden">
        <SideBar labelsMetadata={labelsMetadata} selectedCategory={selectedCategory}/>
        <MainContent selectedLabelInfo={selectedCategory ? labelsMetadata?.[selectedCategory] : undefined}/>
      </div>
    </div>
  )
}

export default MailPage