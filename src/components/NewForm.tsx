//import for library
import { z } from "zod";
import React, { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

//import for ui
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Card,
    CardContent,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

//import for types
import { newFormSchema } from "@/validators/form_schema.type";
import { FormInputType } from "@/types/form_data.type";
import { NewFormProps } from "@/types/form_data.type";


export const NewForm: React.FC<NewFormProps> = ({ onSubmit }) => {
    const [isDialogOpen, setDialogOpen] = useState(false);

    const form = useForm<FormInputType>({
        resolver: zodResolver(newFormSchema),
        defaultValues: {
            name: "",
            description: "",
        },
    })

    const handleSubmit = form.handleSubmit(
        async (values) => {
            console.log("Form Submission Started", values);
            try {
                console.log("Form Submitted", values);
                if (Object.keys(form.formState.errors).length === 0) {
                    console.log("No errors, resetting form");
                    await onSubmit(values);
                    form.reset();
                    setDialogOpen(false);
                } else {
                    console.log("Form has errors", form.formState.errors);
                }
            } catch (error) {
                console.error("Error during form submission", error);
            }
        }
    );


    return (
        <div className="w-64 h-36">
            <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild className="w-64 h-36">
                    <Button variant="ghost" className="w-64 h-36">
                        <Card className="w-64 h-36">
                            <CardContent className="flex justify-center items-center h-full">
                                <p className="">+</p>
                            </CardContent>
                        </Card>
                    </Button>
                </DialogTrigger>


                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add New Form</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Please enter the name of the form"{...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}

                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Please enter the description of the form"{...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}

                            />
                            <Button type="submit">Save</Button>
                        </form>
                    </Form>
                </DialogContent>

            </Dialog>
        </div>
    )
}