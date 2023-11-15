import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const formRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.form.findMany({
      where: { createdById: ctx.session.user.id },
    });
  }),
  create: protectedProcedure
    .input(
      z.object({ name: z.string().min(1), description: z.string().optional() }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.form.create({
        data: {
          name: input.name,
          description: input.description,
          createdById: ctx.session.user.id,
        },
      });
    }),
});

export const questions = [
  "Name",
  "Email Address",
  "Phone Number",
  "Upload your CV",
  "Select One of the options below",
  "What do you prefer to be contact?",
  "Select one",
  "What is your preferred time to be contacted?",
  "What is your preferred day to be contacted?",
  "Rate the experience you had with us",
];
