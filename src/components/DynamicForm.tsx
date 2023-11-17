//import for library
import { z } from "zod";
import React, { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Control, useForm } from "react-hook-form"

//import for ui
import { Button } from "@/components/ui/button"
import {
    Form,
} from "@/components/ui/form"
import { useToast } from "@/components/ui/use-toast";

//import for components
import TextInput from "./dynamic_inputs/TextInput";
import CheckboxInput from "./dynamic_inputs/CheckboxInput";
import MultipleChoiceInput from "./dynamic_inputs/MultipleChoiceInput";
import DropdownInput from "./dynamic_inputs/DropdownInput";

//import for types
import { FormQuestionType, DynamicFormProps } from "@/types/form_data.type";


//import for utils
import { api } from "@/utils/api";
import createDynamicSchema from "@/utils/createDynamicSchema";
import renderDynamicInput from "@/utils/renderDynamicInput";

const DynamicForm: React.FC<DynamicFormProps> = ({ formData: QuestionDataInForm }) => {
    const { toast } = useToast();
    const dynamicSchema = createDynamicSchema(QuestionDataInForm);
    const form = useForm<z.infer<typeof dynamicSchema>>({
        resolver: zodResolver(dynamicSchema),
    })

    const onSubmit = async (values: z.infer<typeof dynamicSchema>) => {
        console.log("saving response");
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(values, null, 2)}</code>
                </pre>
            ),
        })
    }

    const onTrigger = (values: z.infer<typeof dynamicSchema>) => {
        form.trigger();
        console.log("triggered")
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(values, null, 2)}</code>
                </pre>
            ),
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} >
                {QuestionDataInForm.map((question) => renderDynamicInput(question, form.control))}
                <div className="flex justify-between">
                    <Button type="submit">Submit</Button>
                    <Button type="button" onClick={() => onTrigger(form.getValues())}>Trigger</Button></div>
            </form>
        </Form>
    )
}

export default DynamicForm;





// const renderInputComponent = (type: QuestionType, field: ControllerRenderProps<FormValues, string>) => {
//     const { value, ...restField } = field;
//     const stringValue = typeof value === 'boolean' ? String(value) : value;

//     switch (type) {
//         case "TEXT":
//         case "PHONE_NUMBER":
//         case "EMAIL":
//             return <Input value={stringValue} {...restField} />
//         case "FILE_INPUT": return (
//             <div>
//                 <p>File Input</p>
//             </div>
//         )
//         case "CHECKBOX":
//             return (
//                 <div>
//                     {items.map((item) => (
//                         <div key={item.id} className="flex flex-row items-center space-x-3">
//                             <Checkbox
//                                 checked={Array.isArray(field.value) && field.value.includes(item.id)}
//                                 onCheckedChange={(checked) => {
//                                     return checked
//                                         ? field.onChange([...(Array.isArray(field.value) ? field.value : []), item.id])
//                                         : field.onChange(
//                                             Array.isArray(field.value) ? field.value.filter(
//                                                 (value) => value !== item.id
//                                             ) : []
//                                         )
//                                 }}
//                             />
//                             <FormLabel htmlFor={item.id}>{item.label}</FormLabel>
//                         </div>
//                     ))}
//                 </div>
//             )
//         case "DATE_TIME": return (
//             <div>
//                 <p>Testing</p>
//             </div>
//         )
//         case "DROPDOWN": return (
//             <div>
//                 <p>Testing</p>
//             </div>
//         )

//         case "MULTIPLE_CHOICE": return (
//             <div>
//                 <p>Testing</p>
//             </div>
//         )
//         case "LINEAR_SCALE": return (
//             <div>
//                 <p>Testing</p>
//             </div>
//         )
//     }
// }