//import for library
import React, { ComponentProps } from 'react';

//import for ui
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

//import for types
import { DynamicInputProps } from '@/types/form_data.type';


const MultipleChoiceInput: React.FC<DynamicInputProps> = ({ control, question }) => {

    return (
        <>
            <FormField
                control={control}
                name={question.id}
                render={({ field }) => (
                    <FormItem className="space-y-3">
                        <FormLabel>{question.text}</FormLabel>
                        <FormControl>
                            <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value as unknown as ComponentProps<typeof RadioGroup>["value"]}
                                className="flex flex-col space-y-1"
                            >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                        <RadioGroupItem value="all" />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                        All new messages
                                    </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                        <RadioGroupItem value="mentions" />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                        Direct messages and mentions
                                    </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                        <RadioGroupItem value="none" />
                                    </FormControl>
                                    <FormLabel className="font-normal">Nothing</FormLabel>
                                </FormItem>
                            </RadioGroup>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </>)
};

export default MultipleChoiceInput;
