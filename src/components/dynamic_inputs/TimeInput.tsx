// import for library
import React from 'react';
import type { ComponentProps } from "react"
// import for ui
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

// import for types
import type { DynamicInputProps } from '@/types/form_data.type';


const TimeInput: React.FC<DynamicInputProps> = ({ control, question }) => (
    <FormField key={question.id} control={control} name={question.id}
        render={({ field }) => (
            <FormItem>
                <FormLabel>{question.text}</FormLabel>

                <FormControl>
                    <Input type="time"
                        {...field}
                        value={field.value as unknown as ComponentProps<typeof Input>["value"]}
                    />
                </FormControl>
                <FormMessage />
            </FormItem>
        )
        }
    />
)

export default TimeInput;
