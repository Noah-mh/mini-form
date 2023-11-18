//import for library
import React, { ComponentProps } from 'react';

//import for ui
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

//import for types
import { DynamicInputProps } from '@/types/form_data.type';


const LinearScaleInput: React.FC<DynamicInputProps> = ({ control, question }) => {

    return (
        <>
            <FormField
                key={question.id}
                control={control}
                name={question.id}
                render={({ field }) => (
                    <FormItem className="space-y-3">
                        <FormLabel>{question.text}</FormLabel>
                        <FormControl>
                            <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value as unknown as ComponentProps<typeof RadioGroup>["value"]}
                                className="flex"
                            >
                                <FormItem className="flex flex-col items-center">
                                    <FormLabel className="font-normal w-2">
                                        1
                                    </FormLabel>
                                    <FormControl>
                                        <RadioGroupItem value="1s" className="w-4 h-4" />
                                    </FormControl>

                                </FormItem>
                                <FormItem className="flex flex-col items-center">
                                    <FormLabel className="font-normal w-2">
                                        2
                                    </FormLabel>
                                    <FormControl>
                                        <RadioGroupItem value="2s" className="w-4 h-4" />
                                    </FormControl>

                                </FormItem>
                                <FormItem className="flex flex-col items-center">
                                    <FormLabel className="font-normal w-2">3</FormLabel>
                                    <FormControl>
                                        <RadioGroupItem value="3s" className="w-4 h-4" />
                                    </FormControl>
                                </FormItem>
                                <FormItem className="flex flex-col items-center">
                                    <FormLabel className="font-normal w-2">
                                        4
                                    </FormLabel>
                                    <FormControl>
                                        <RadioGroupItem value="4s" className="w-4 h-4" />
                                    </FormControl>
                                </FormItem>
                                <FormItem className="flex flex-col items-center">
                                    <FormLabel className="font-normal w-2">5</FormLabel>
                                    <FormControl>
                                        <RadioGroupItem value="5s" className="w-4 h-4" />
                                    </FormControl>
                                </FormItem>
                            </RadioGroup>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </>)
};

export default LinearScaleInput;
