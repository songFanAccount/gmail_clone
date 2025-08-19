import { getAccessTokenFromRefresh } from "./googleTokens";

export async function syncUserGmail(userId: string) {
  const accessToken = await getAccessTokenFromRefresh(userId)
  const res = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=50", {
    headers: { Authorization: `Bearer ${accessToken}` }
  })
  const json = await res.json() as JSON
  return json
}

export async function syncGmailLabels(userId: string) {
  const access_token = await getAccessTokenFromRefresh(userId)
  const labels: string[] = [
    "INBOX",
    "STARRED",
    "SNOOZED",
    "SENT",
    "DRAFT",
    "IMPORTANT",
    "SCHEDULED",
    "ALL_MAIL",
    "CATEGORY_PERSONAL",
    "SPAM",
    "TRASH"
  ]
  const requests = labels.map(async label => {
    try {
      const res = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/labels/${label}`, {
        headers: {Authorization: `Bearer ${access_token}`}
      })
      if (!res.ok) throw new Error(`${label} not available`)
        return await res.json() as JSON
    } catch (_) {
      return null
    }
  })
  const results = (await Promise.all(requests)).filter(Boolean) as JSON[]
  return results
}