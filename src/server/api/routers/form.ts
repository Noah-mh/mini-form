import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { QuestionType } from "@prisma/client";

export const formRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.form.findMany({
      where: { createdById: ctx.session.user.id },
    });
  }),
  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.form.findUnique({
        where: { id: input.id },
      });
    }),
  create: protectedProcedure
    .input(
      z.object({ name: z.string().min(1), description: z.string().optional() }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.form.create({
        data: {
          name: input.name,
          description: input.description,
          createdById: ctx.session.user.id,
        },
      });
    }),
  bulkCreateQuestion: protectedProcedure
    .input(
      z.object({
        questions: z.array(
          z.object({
            text: z.string().min(1),
            type: z.nativeEnum(QuestionType),
            formId: z.string(),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.question.createMany({
        data: input.questions,
      });
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.form.delete({
        where: { id: input.id },
      });
    }),
});
