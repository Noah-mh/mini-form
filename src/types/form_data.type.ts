import { z } from "zod";
import { RouterOutputs } from "@/utils/api";
import { newFormSchema } from "@/validators/form_schema.type";
import { Control } from "react-hook-form";
import { DynamicSchemaType } from "@/utils/createDynamicSchema";

//input type for creating a new form
export type FormInputType = z.infer<typeof newFormSchema>;

//input type for submitting a response to a form

//
export type NewFormProps = {
  onSubmit: (values: FormInputType) => void | Promise<void>;
};

//
export type FormDetailsProps = {
  formId: string;
};

//
export type DynamicFormProps = {
  formData: FormQuestionType[];
};

//type for the question info
export type FormQuestionType = RouterOutputs["formDetails"]["getOne"][0];

//type for the form info
export type FormType = RouterOutputs["form"]["getAll"][0];

//type for the different inputs
export type DynamicInputProps = {
  question: FormQuestionType;
  control: Control<DynamicSchemaType>;
  placeholder?: string;
};
