//import for library
import React from 'react';

//import for ui
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';

//import for types
import { DynamicInputProps } from '@/types/form_data.type';



const items = [
    {
        id: "email",
        label: "Email"
    },
    {
        id: "phone",
        label: "Phone"
    },
    {
        id: "instagram",
        label: "Instagram"
    },
    {
        id: "facebook",
        label: "Facebook"
    },
    {
        id: "linkedin",
        label: "Linkedin"
    },
    {
        id: "twitter",
        label: "Twitter"
    }
]


const CheckboxInput: React.FC<DynamicInputProps> = ({ control, question }) => {

    return (
        <>
            <FormLabel>{question.text}</FormLabel>
            {items.map((item) => (
                <FormField
                    key={item.id}
                    control={control}
                    name={question.id}
                    render={({ field }) => {
                        return (
                            <FormItem
                                key={item.id}
                                className="flex flex-row items-start space-x-3 space-y-0"
                            >
                                <Checkbox
                                    checked={Array.isArray(field.value) && field.value.includes(item.id)}
                                    onCheckedChange={(checked) => {
                                        return checked
                                            ? field.onChange([...(Array.isArray(field.value) ? field.value : []), item.id])
                                            : field.onChange(
                                                Array.isArray(field.value) ? field.value.filter(
                                                    (value) => value !== item.id
                                                ) : []
                                            )
                                    }}
                                />
                                <FormLabel className="text-sm font-normal">
                                    {item.label}
                                </FormLabel>
                            </FormItem >
                        )
                    }}
                />
            ))}

        </>)
};

export default CheckboxInput;
