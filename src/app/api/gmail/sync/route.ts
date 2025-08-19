import { auth } from "~/server/auth";
import { syncUserGmail } from "~/server/util/gmailFuncs";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return new Response(JSON.stringify({ error: "Not authenticated" }), { status: 401 });
    }

    const data = await syncUserGmail(session.user.id);
    return Response.json(data);
  } catch (err) {
    console.error("Sync error:", err);
    return new Response(JSON.stringify({ error: (err as Error).message }), { status: 500 });
  }
}