import { auth } from "~/server/auth"
import { syncGmailLabels } from "~/server/util/gmailFuncs"

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user.id) {
      return new Response(JSON.stringify({ error: "Not authenticated" }))
    }
    const data = await syncGmailLabels(session.user.id)
    return Response.json(data)
  } catch (e) {
    console.error("Labels error:", e)
    return new Response(JSON.stringify({ error: (e as Error).message }))
  }
}