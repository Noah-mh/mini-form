import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { QuestionType } from "@prisma/client";

export const responseRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.response.findMany();
  }),
  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.response.findMany({
        where: { formId: input.id },
      });
    }),
  createResponse: protectedProcedure
    .input(
      z.object({
        responses: z.array(
          z.object({
            questionId: z.string().min(1),
            value: z.string().nullable(),
            formId: z.string(),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.response.createMany({
        data: input.responses,
      });
    }),
  updateResponses: protectedProcedure
    .input(
      z.object({
        responses: z.array(
          z.object({
            questionId: z.string().min(1),
            value: z.string().nullable(),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const updatedResponses = await Promise.all(
        input.responses.map((response) =>
          ctx.db.response.updateMany({
            where: { questionId: response.questionId },
            data: { value: response.value },
          }),
        ),
      );
      return updatedResponses;
    }),
});
