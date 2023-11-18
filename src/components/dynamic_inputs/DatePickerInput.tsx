//import for icon
import { CalendarIcon } from "@radix-ui/react-icons"

//import for library
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { DynamicInputProps } from "@/types/form_data.type"


const DatePickerInput: React.FC<DynamicInputProps> = ({ control, question }) => {
    return (

        <FormField
            key={question.id}
            control={control}
            name={question.id}
            render={({ field }) => (
                <FormItem className="flex flex-col">
                    <FormLabel>{question.text}</FormLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-[240px] pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                    )}
                                >
                                    {field.value ? (
                                        format(new Date(field.value as unknown as number | Date), "PPP")
                                    ) : (
                                        <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={field.value as unknown as Date}
                                onSelect={(date) => {
                                    if (date) {
                                        field.onChange(date.toISOString());
                                    }
                                }}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                    <FormMessage />
                </FormItem>
            )}
        />


    )
}

export default DatePickerInput;
