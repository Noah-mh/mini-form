
//import for library
import type { Control } from "react-hook-form";

//import for types
import type { DynamicSchemaType } from "@/types/form_data.type";

//import for Prisma types
import type { Question } from "@prisma/client";

//import for components
import TextInput from "@/components/dynamic_inputs/TextInput"
import CheckboxInput from "@/components/dynamic_inputs/CheckboxInput";
import DropdownInput from "@/components/dynamic_inputs/DropdownInput";
import MultipleChoiceInput from "@/components/dynamic_inputs/MultipleChoiceInput";
import DatePickerInput from "@/components/dynamic_inputs/DatePickerInput";
import ImageInput from "@/components/dynamic_inputs/ImageInput";
import TimeInput from "@/components/dynamic_inputs/TimeInput";
import LinearScaleInput from "@/components/dynamic_inputs/LinearScaleInput";


const renderDynamicInput = (
  question: Question,
  control: Control<DynamicSchemaType>,
) => {
  switch (question.type) {
    case "TEXT": {
      return <TextInput question={question} control={control} placeholder={"John"} />
    }
    case "PHONE_NUMBER": {
      return <TextInput question={question} control={control} placeholder={"88888888"} />
    }
    case "EMAIL": {
      return <TextInput question={question} control={control} placeholder={"example@gmail.com"} />
    }
    case "FILE_INPUT": {
      return <ImageInput question={question} control={control} />
    }
    case "CHECKBOX": {
      return <CheckboxInput question={question} control={control} />
    }
    case "DROPDOWN": {
      return <DropdownInput question={question} control={control} />
    }
    case "MULTIPLE_CHOICE": {
      return <MultipleChoiceInput question={question} control={control} />
    }
    case "DATE": {
      return <DatePickerInput question={question} control={control} />
    }
    case "TIME": {
      return <TimeInput question={question} control={control} />
    }
    case "LINEAR_SCALE": {
      return <LinearScaleInput question={question} control={control} />
    }

  }
};

export default renderDynamicInput;
