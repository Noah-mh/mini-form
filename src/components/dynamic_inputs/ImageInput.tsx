//import for library
import React from 'react';

//import for ui
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

//import for types
import { DynamicInputProps } from '@/types/form_data.type';
import type { ComponentProps } from "react"
import { FileUpload } from '../FileUpload';

const ImageInput: React.FC<DynamicInputProps> = ({ control, question }) => (
    <FormField key={question.id} control={control} name={question.id}
        render={({ field }) => (
            <FormItem>
                <FormLabel>{question.text}</FormLabel>
                <FormControl>
                    <FileUpload endpoint="imageUpload" value={field.value as unknown as string} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
            </FormItem>
        )
        }
    />
)

export default ImageInput;
