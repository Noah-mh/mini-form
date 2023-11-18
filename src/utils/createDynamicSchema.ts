//import for Prisma types
import type { Question } from "@prisma/client";

// Zod imports
import { z } from "zod";
import dynamicSchema from "@/validators/dynamicFormInputs";
import type { InputType } from "@/validators/dynamicFormInputs";

/**
 * createDynamicSchema creates a z.object schema that is meant to be passed
 * into useForm's zodResolver.
 */
const createDynamicSchema = (formData: Question[]) => {
  const schemaObject: Record<string, (typeof dynamicSchema)[InputType]> = {};

  formData.forEach((question) => {
    schemaObject[question.id] = dynamicSchema[question.type];
  });

  return z.object(schemaObject);
};

export default createDynamicSchema;
