//import for library
import React from 'react';

//import for ui
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

//import for types
import { DynamicInputProps } from '@/types/form_data.type';
import type { ComponentProps } from "react"

const TimeInput: React.FC<DynamicInputProps> = ({ control, question, placeholder }) => (
    <FormField key={question.id} control={control} name={question.id}
        render={({ field }) => (
            <FormItem>
                <FormLabel>{question.text}</FormLabel>

                <FormControl>
                    <p> Time Input</p>
                </FormControl>
                <FormMessage />
            </FormItem>
        )
        }
    />
)

export default TimeInput;
