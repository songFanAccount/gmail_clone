import type { GmailMessage } from "~/app/_components/MainContent/MainContent";
import { getAccessTokenFromRefresh } from "./googleTokens";
import { gmail_v1 } from "googleapis";
type GMsg = gmail_v1.Schema$Message;
type GThread = gmail_v1.Schema$Thread;

function parseGmailMessage(raw: GMsg): GmailMessage {
  const headers = raw.payload?.headers ?? [];
  const getHeader = (headers: NonNullable<GMsg["payload"]>["headers"], name: string) =>
    headers?.find(h => h.name?.toLowerCase() === name.toLowerCase())?.value ?? "";
  return {
    id: raw.id!,
    threadId: raw.threadId!,
    labels: raw.labelIds ?? [],
    snippet: raw.snippet ?? "",
    date: new Date(getHeader(headers, "Date") ?? Number(raw.internalDate)),
    from: getHeader(headers, "From") ?? "",
    to: getHeader(headers, "To") || undefined,
    subject: getHeader(headers, "Subject") ?? "",
  };
}

export async function syncUserGmail(userId: string, labelId: string, pageToken?: string) {
  const accessToken = await getAccessTokenFromRefresh(userId);

  if (labelId === "DRAFT") {
    const listUrl = new URL("https://gmail.googleapis.com/gmail/v1/users/me/drafts")
    listUrl.searchParams.set("maxResults", "50")
    if (pageToken) listUrl.searchParams.set("pageToken", pageToken)
    const listRes = await fetch(listUrl, {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
    if (!listRes.ok) throw new Error("Fetching drafts failed")
    const { drafts = [], nextPageToken } = await listRes.json() as {
      drafts?: { id: string; message: { id: string; threadId: string } }[];
      nextPageToken?: string;
    };
    const fetches = drafts.map(async (draft) => {
      const url = new URL(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${draft.message.id}`);
      url.searchParams.set("format", "metadata");
      url.searchParams.append("metadataHeaders", "From");
      url.searchParams.append("metadataHeaders", "Subject");
      url.searchParams.append("metadataHeaders", "Date");
  
      const r = await fetch(url.toString(), { headers: { Authorization: `Bearer ${accessToken}` } });
      if (!r.ok) return null;
      const msg = await r.json() as GMsg;
      const parsed = parseGmailMessage(msg);
      parsed.threadId = msg.threadId ?? draft.message.threadId;
      return parsed;
    });
  
    const messages = (await Promise.all(fetches)).filter(Boolean) as GmailMessage[];
    return { messages, nextPageToken };
  }

  const labelPrefix = labelId === "STARRED" || labelId === "IMPORTANT" ? "is" : "in"
  const listUrl = new URL("https://gmail.googleapis.com/gmail/v1/users/me/threads");
  listUrl.searchParams.set("q", `${labelId === "SPAM" || labelId === "TRASH" || labelId === "DRAFT" ? "" : "category:primary "}${labelPrefix}:${labelId}`); // Primary tab view
  listUrl.searchParams.set("maxResults", "50");
  listUrl.searchParams.set("includeSpamTrash", "true")
  if (pageToken) listUrl.searchParams.set("pageToken", pageToken);

  const listRes = await fetch(listUrl.toString(), {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!listRes.ok) throw new Error(`threads.list failed: ${listRes.status} ${await listRes.text()}`);

  const { threads = [], nextPageToken } = await listRes.json() as {
    threads?: { id: string; snippet?: string }[];
    nextPageToken?: string;
  };

  if (!threads.length) {
    return { messages: [] as GmailMessage[], nextPageToken: undefined };
  }
  const threadFetches = threads.map(async (t) => {
    try {
      const url =
        `https://gmail.googleapis.com/gmail/v1/users/me/threads/${t.id}` +
        `?format=metadata&metadataHeaders=From&metadataHeaders=Subject&metadataHeaders=Date`;

      const tr = await fetch(url, { headers: { Authorization: `Bearer ${accessToken}` } });
      if (!tr.ok) throw new Error(`threads.get failed: ${tr.status}`);
      const thread = await tr.json() as {
        id: string;
        messages: GThread[];
      };
      if (!thread.messages?.length) return null;
      const latest: GMsg = thread.messages[thread.messages.length - 1] as GMsg;
      const parsed = parseGmailMessage(latest);
      parsed.threadId = latest.threadId ?? thread.id;
      return parsed;
    } catch {
      return null;
    }
  });
  const results = (await Promise.all(threadFetches)).filter(Boolean) as GmailMessage[];
  return {
    messages: results,
    nextPageToken
  };
}