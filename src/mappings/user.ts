import { Prisma } from "@prisma/client";

export const AccountRefreshTokenQuery = Prisma.validator<Prisma.AccountDefaultArgs>()({
  select: { refresh_token: true }
})