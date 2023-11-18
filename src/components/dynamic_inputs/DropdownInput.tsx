//import for library
import React from 'react';

//import for ui
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


//import for types
import type { DynamicInputProps } from '@/types/form_data.type';
import type { ComponentProps } from "react"

const DropdownInput: React.FC<DynamicInputProps> = ({ control, question }) => (
    <FormField
        key={question.id}
        control={control}
        name={question.id}
        render={({ field }) => (
            <FormItem>
                <FormLabel>{question.text}</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value as unknown as ComponentProps<typeof Select>["value"]}>
                    <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        <SelectItem value="m@example.com">m@example.com</SelectItem>
                        <SelectItem value="m@google.com">m@google.com</SelectItem>
                        <SelectItem value="m@support.com">m@support.com</SelectItem>
                    </SelectContent>
                </Select>
                <FormMessage />
            </FormItem>
        )}
    />
)

export default DropdownInput;
