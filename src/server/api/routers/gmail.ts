import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { AllLabelsMetadataSchema, GmailPageSchema } from "~/types/gmails";

export const gmailRouter = createTRPCRouter({
  fetchPageThreads: protectedProcedure
    .output(GmailPageSchema)
    .query(async ({ctx}) => {
      const data = ctx.gmailService.fetchPageThreads()
      return GmailPageSchema.parse(data)
    }),
  fetchLabelsMetadata: protectedProcedure
    .output(AllLabelsMetadataSchema)
    .query(async ({ctx}) => {
      const data = await ctx.gmailService.fetchLabelsMetadata()
      return data
    })
});
