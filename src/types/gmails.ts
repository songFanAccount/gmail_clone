import { z } from "zod"

export const GoogleTokenSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string().optional()
})

export const GmailSchema = z.object({
  subject: z.string(),
  fromName: z.string(),
  fromEmail: z.string().email(),
  snippet: z.string(),
  date: z.date(),
  unread: z.boolean(),
  starred: z.boolean()
})

export const GmailPageSchema = z.array(GmailSchema)
export type Gmail = z.infer<typeof GmailSchema>

export enum EmailCategories {
  INBOX = "Inbox",
  STARRED = "Starred",
  SENT = "Sent",
  DRAFTS = "Drafts",
  IMPORTANT = "Important",
  SCHEDULED = "Scheduled",
  SPAM = "Spam",
  TRASH = "Trash"
}

export const mapUrlCategory: Record<string, EmailCategories> = {
  "inbox": EmailCategories.INBOX,
  "starred": EmailCategories.STARRED,
  "sent": EmailCategories.SENT,
  "drafts": EmailCategories.DRAFTS,
  "imp": EmailCategories.IMPORTANT,
  "scheduled": EmailCategories.SCHEDULED,
  "spam": EmailCategories.SPAM,
  "trash": EmailCategories.TRASH
}
export const LabelMetadataSchema = z.object({
  name: z.nativeEnum(EmailCategories),
  messagesTotal: z.number().int(),
  messagesUnread: z.number().int(),
  threadsTotal: z.number().int(),
  threadsUnread: z.number().int(),
})

export const AllLabelsMetadataSchema = z.array(LabelMetadataSchema)
export type LabelMetadata = z.infer<typeof LabelMetadataSchema>
export type LabelsArray = z.infer<typeof AllLabelsMetadataSchema>