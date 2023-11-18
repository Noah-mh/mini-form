//import for library
import React from 'react';

//import for ui
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';

//import for types
import type { DynamicInputProps } from '@/types/form_data.type';

//import for components
import FileUpload from '@/components/FileUpload'

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
