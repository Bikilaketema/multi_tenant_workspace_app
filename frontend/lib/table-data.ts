export type SectionType = "Cover page" | "Table of contents" | "Narrative" | "Technical content"
export type Status = "Done" | "In Process"

export interface Section {
  id: string
  header: string
  sectionType: SectionType
  status: Status
  target: number
  limit: number
  reviewer: string
}

export const initialData: Section[] = [
  {
    id: "1",
    header: "Cover page",
    sectionType: "Cover page",
    status: "In Process",
    target: 18,
    limit: 5,
    reviewer: "Eddie Lake",
  },
  {
    id: "2",
    header: "Table of contents",
    sectionType: "Table of contents",
    status: "Done",
    target: 29,
    limit: 24,
    reviewer: "Eddie Lake",
  },
  {
    id: "3",
    header: "Executive summary",
    sectionType: "Narrative",
    status: "Done",
    target: 10,
    limit: 13,
    reviewer: "Eddie Lake",
  },
  {
    id: "4",
    header: "Technical approach",
    sectionType: "Narrative",
    status: "Done",
    target: 27,
    limit: 23,
    reviewer: "Jamik Tashpulatov",
  },
  {
    id: "5",
    header: "Design",
    sectionType: "Narrative",
    status: "In Process",
    target: 2,
    limit: 16,
    reviewer: "Jamik Tashpulatov",
  },
  {
    id: "6",
    header: "Capabilities",
    sectionType: "Narrative",
    status: "In Process",
    target: 20,
    limit: 8,
    reviewer: "Jamik Tashpulatov",
  },
  {
    id: "7",
    header: "Integration with existing systems",
    sectionType: "Narrative",
    status: "In Process",
    target: 19,
    limit: 21,
    reviewer: "Jamik Tashpulatov",
  },
  {
    id: "8",
    header: "Innovation and Advantages",
    sectionType: "Narrative",
    status: "Done",
    target: 25,
    limit: 26,
    reviewer: "",
  },
  {
    id: "9",
    header: "Overview of EMR's Innovative Solutions",
    sectionType: "Technical content",
    status: "Done",
    target: 7,
    limit: 23,
    reviewer: "",
  },
  {
    id: "10",
    header: "Advanced Algorithms and Machine Learning",
    sectionType: "Narrative",
    status: "Done",
    target: 30,
    limit: 28,
    reviewer: "",
  },
]

export const sectionTypes: SectionType[] = ["Cover page", "Table of contents", "Narrative", "Technical content"]

export const reviewers = ["Eddie Lake", "Jamik Tashpulatov", "Sarah Johnson", "Michael Chen"]
