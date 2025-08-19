import { getAccessTokenFromRefresh } from "./googleTokens";

export async function syncUserGmail(userId: string) {
  const accessToken = await getAccessTokenFromRefresh(userId) as string
  const res = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=50", {
    headers: { Authorization: `Bearer ${accessToken}` }
  })
  const json = await res.json() as JSON
  return json
}