import React, { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

//import for ui
import { Button } from "@/components/ui/button"
import {
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

//import for types
import { newFormSchema } from "@/validators/form_schema.type";
import { FormInfoInputType, DialogContextProps } from "@/types/form_data.type";

const DiaLogContentFC: React.FC<DialogContextProps> = ({ label, formInfo, setDialogOpen, setFormInfo, onSubmit }) => {

    useEffect(() => {
        console.log("formInfo", formInfo);
    }, [formInfo])


    let defaultFormInfo: { name: string; description: string | undefined } = {
        name: "",
        description: "" || undefined,
    };

    if (formInfo) {
        defaultFormInfo = {
            name: formInfo.name,
            description: formInfo.description || undefined,
        };
    }



    const form = useForm<FormInfoInputType>({
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
                    await onSubmit(values, formInfo?.id);
                    form.reset();
                    setDialogOpen(false);
                    setFormInfo(undefined);
                } else {
                    console.log("Form has errors", form.formState.errors);
                }
            } catch (error) {
                console.error("Error during form submission", error);
            }
        }
    );

    return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>{label}</DialogTitle>
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
                                    <Input placeholder={formInfo ? formInfo.name : "Please enter the name of the form"} {...field} />
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
                                    <Input placeholder={formInfo ? (formInfo.description !== null && formInfo.description !== "" ? formInfo.description : "Please enter the description of the form") : "Please enter the description of the form"} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}

                    />
                    <Button type="submit">Save</Button>
                </form>
            </Form>
        </DialogContent>
    )
}

export default DiaLogContentFC;