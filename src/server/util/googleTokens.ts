import { db } from "../db";

export async function getAccessTokenFromRefresh(userId: string) {
  const account = await db.account.findFirst({
    where: { userId, provider: "google" },
    select: { refresh_token: true }
  })
  if (!account?.refresh_token) throw new Error("No Google refresh_token on file")
  const body = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID!,
    client_secret: process.env.GOOGLE_CLIENT_SECRET!,
    refresh_token: account.refresh_token,
    grant_type: "refresh_token"
  })
  const res = await fetch("https://oauth2.googleapis.com/token", { method: "POST", body })
  if (!res.ok) throw new Error("Failed to refresh access token")
  interface GoogleTokenResponse {
    access_token: string;
    expires_in: number;
    scope: string;
    token_type: string;
    refresh_token?: string;
  }
  const json = await res.json() as GoogleTokenResponse
  if (json.refresh_token) {
    await db.account.updateMany({
      where: { userId, provider: "google" },
      data: { refresh_token: json.refresh_token }
    })
  }
  return json.access_token
}