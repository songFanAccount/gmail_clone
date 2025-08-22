import type { PrismaClient } from "@prisma/client";
import { AccountRefreshTokenQuery } from "~/mappings/user";
import { AllLabelsMetadataSchema, EmailCategories, GoogleTokenSchema, LabelMetadataSchema, type Gmail, type LabelsArray } from "~/types/gmails";

export interface GmailService {
  updateAccessToken(): Promise<string>,
  fetchLabelsMetadata(): Promise<LabelsArray>,
  fetchPageThreads(): Promise<Gmail[]>
}

export class GmailServiceImpl implements GmailService {
  constructor(
    private readonly db: PrismaClient, 
    private readonly userId: string
  ) {}
  async updateAccessToken(): Promise<string> {
    const account = await this.db.account.findFirst({
      ...AccountRefreshTokenQuery,
      where: { userId: this.userId, provider: "google"}
    })
    if (!account?.refresh_token) throw new Error(`No refresh token or account found`)
    const body = new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      refresh_token: account.refresh_token,
      grant_type: "refresh_token"
    })
    const res = await fetch("https://oauth2.googleapis.com/token", { method: "POST", body })
    if (!res.ok) throw new Error("Failed to refresh access token")
    const tokens = GoogleTokenSchema.parse(await res.json())
    if (tokens.refresh_token) {
      await this.db.account.updateMany({
        where: { userId: this.userId, provider: "google" },
        data: { refresh_token: tokens.refresh_token }
      })
    }
    return tokens.access_token
  }
  async fetchPageThreads(): Promise<Gmail[]> {
    return []
  }
  async fetchLabelsMetadata(): Promise<LabelsArray> {
    const access_token = await this.updateAccessToken()
    console.log(access_token)
    const labels: [string, EmailCategories][] = [
      ["INBOX", EmailCategories.INBOX],
      ["STARRED", EmailCategories.STARRED],
      ["SENT", EmailCategories.SENT],
      ["DRAFT", EmailCategories.DRAFTS],
      ["IMPORTANT", EmailCategories.IMPORTANT],
      ["SCHEDULED", EmailCategories.SCHEDULED],
      ["SPAM", EmailCategories.SPAM],
      ["TRASH", EmailCategories.TRASH]
    ]
    const requests = labels.map(async label => {
      try {
        const url = new URL(`https://gmail.googleapis.com/gmail/v1/users/me/labels/${label[0]}`);
        const res = await fetch(url, {
          headers: {Authorization: `Bearer ${access_token}`}
        })
        if (!res.ok) throw new Error(`${label[0]} not available`)
        const json = await res.json() as JSON
        return LabelMetadataSchema.parse({
          ...json,
          name: label[1]
        })
      } catch (_) {
        return null
      }
    })
    const results = (await Promise.all(requests)).filter(Boolean)
    return AllLabelsMetadataSchema.parse(results)
  }
}

export const getGmailService = (db: PrismaClient, userId: string): GmailService => {
  return new GmailServiceImpl(db, userId)
}