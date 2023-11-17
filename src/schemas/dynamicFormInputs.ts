import { z } from "zod";

const dynamicSchema = {
  TEXT: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(1, {
      message: "Name is required",
    }),

  EMAIL: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email is not valid",
    })
    .email({
      message: "Email is not valid",
    }),

  PHONE_NUMBER: z.coerce
    .number({
      required_error: "Phone Number is required",
      invalid_type_error: "Phone Number must be a number",
    })
    .min(10000000, {
      message: "Invalid phone number",
    })
    .max(9999999999, {
      message: "Invalid phone number",
    }),

  FILE_INPUT: z.string().optional(),

  MULTIPLE_CHOICE: z.enum(["all", "mentions", "none"], {
    required_error: "You need to select a notification type.",
  }),

  CHECKBOX: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),

  DROPDOWN: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),

  DATE: z.date({
    required_error: "A date of birth is required.",
  }),

  TIME: z.string().min(1, {
    message: "Value is required",
  }),

  LINEAR_SCALE: z.number().min(1).max(5),
} as const;

export default dynamicSchema;

export type InputType = keyof typeof dynamicSchema;
