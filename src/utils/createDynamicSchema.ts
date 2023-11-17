import { FormQuestionType } from "@/types/form_data.type";

// Zod imports
import { z } from "zod";
import dynamicSchema from "@/schemas/dynamicFormInputs";
import type { InputType } from "@/schemas/dynamicFormInputs";

/**
 * createDynamicSchema creates a z.object schema that is meant to be passed
 * into useForm's zodResolver.
 */
const createDynamicSchema = (formData: FormQuestionType[]) => {
  const schemaObject: Record<string, (typeof dynamicSchema)[InputType]> = {};

  formData.forEach((question) => {
    schemaObject[question.id] = dynamicSchema[question.type];
  });

  return z.object(schemaObject);
};

export type DynamicSchemaType = z.infer<ReturnType<typeof createDynamicSchema>>;

export default createDynamicSchema;
