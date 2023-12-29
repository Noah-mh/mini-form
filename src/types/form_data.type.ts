import type { z } from "zod";
import type { Control } from "react-hook-form";
import type { Form, Question, Response } from "@prisma/client";
import type newFormSchema from "@/validators/form_schema.type";
import type createDynamicSchema from "@/utils/createDynamicSchema";

// input type for creating a new form
export type FormInfoInputType = z.infer<typeof newFormSchema>;

// input type for submitting a response to a form

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

// type for the different inputs
export type DynamicInputProps = {
  question: Question;
  control: Control<DynamicSchemaType>;
  placeholder?: string;
};

export type DynamicSchemaType = z.infer<ReturnType<typeof createDynamicSchema>>;
