import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { QuestionType } from "@prisma/client";

export const formDetailsRouter = createTRPCRouter({
  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.question.findMany({
        where: { formId: input.id },
      });
    }),
  createQuestion: protectedProcedure
    .input(
      z.object({
        text: z.string().min(1),
        type: z.nativeEnum(QuestionType),
        formId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.question.create({
        data: {
          text: input.text,
          type: input.type,
          formId: input.formId,
        },
      });
    }),
});
