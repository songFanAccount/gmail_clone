import { getGmailService } from "~/services/gmails/service";
import { db } from "../db";

export function injectProtectedServices(userId: string) {
  const gmailService = getGmailService(db, userId)
  return {
    gmailService
  }
}