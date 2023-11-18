import { formRouter } from "@/server/api/routers/form";
import { formDetailsRouter } from "@/server/api/routers/form_details";
import { createTRPCRouter } from "@/server/api/trpc";
import { responseRouter } from "./routers/response";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  form: formRouter,
  formDetails: formDetailsRouter,
  response: responseRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
