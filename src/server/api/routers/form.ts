import { z } from "zod";

import { QuestionType } from "@prisma/client";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

const formRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.form.findMany({
      where: { createdById: ctx.session.user.id },
    });
  }),
  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.form.findUnique({
        where: { id: input.id },
      });
    }),
  create: protectedProcedure
    .input(
      z.object({ name: z.string().min(1), description: z.string().optional() }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.form.create({
        data: {
          name: input.name,
          description: input.description,
          createdById: ctx.session.user.id,
        },
      });
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1),
        description: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.form.update({
        where: { id: input.id },
        data: {
          name: input.name,
          description: input.description,
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
      return ctx.db.question.createMany({
        data: input.questions,
      });
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.form.delete({
        where: { id: input.id },
      });
    }),
});

export default formRouter;
