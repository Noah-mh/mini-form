import { z } from "zod";

const newFormSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  description: z.string().optional(),
});

export default newFormSchema;
