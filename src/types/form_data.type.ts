import { z } from "zod";
import { newFormSchema } from "@/validators/form_schema.type";
import { Control } from "react-hook-form";
import createDynamicSchema from "@/utils/createDynamicSchema";
import { Form, Question, Response } from "@prisma/client";

//input type for creating a new form
export type FormInfoInputType = z.infer<typeof newFormSchema>;

//input type for submitting a response to a form

//
export type NewFormProps = {
  onSubmit: (values: FormInfoInputType) => void | Promise<void>;
};

export type DialogContextProps = {
  label?: string;
  formInfo?: Form;
  setFormInfo: React.Dispatch<React.SetStateAction<Form | undefined>>;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (
    values: FormInfoInputType,
    formId?: string,
  ) => void | Promise<void>;
};

//
export type FormDetailsProps = {
  formId: string;
};

//
export type DynamicFormProps = {
  questionsData: Question[];
  responsesData: Response[];
};

//type for the different inputs
export type DynamicInputProps = {
  question: Question;
  control: Control<DynamicSchemaType>;
  placeholder?: string;
};

export type DynamicSchemaType = z.infer<ReturnType<typeof createDynamicSchema>>;
