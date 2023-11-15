import { z } from "zod";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
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
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import { newFormSchema } from "@/validators/newform";
import React, { useState } from "react"

type Input = z.infer<typeof newFormSchema>;


type NewFormProps = {
    onSubmit: (values: Input) => void | Promise<void>;
}



export const Forms = () => {
    const { data: sessionData } = useSession();
    const { toast } = useToast()



    const { data: forms, refetch: refetchForms } = api.form.getAll.useQuery(
        undefined,
        {
            enabled: !!sessionData?.user,
        }
    );

    const createForm = api.form.create.useMutation({
        onSuccess: () => {
            void refetchForms();
        }
    });
    const onSubmit = async (values: Input) => {
        console.log("creating form")
        createForm.mutate({
            name: values.name,
            description: values.description,
        });
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(values, null, 2)}</code>
                </pre>
            ),
        })
    }

    if (!sessionData?.user) return (
        <div>
            Please sign in to view your forms
        </div>
    )


    if (!forms) return (
        <div>
            Loading...
        </div>
    )

    return (
        <div className="mx-4 flex flex-wrap p-4">
            {forms?.length == 0 ? (
                <NewForm onSubmit={onSubmit} />
            ) : (<>{
                forms?.map((form) => (
                    <Card key={form.id} className="w-64 h-96 mb-4 mx-4">
                        <CardHeader>
                            <CardTitle>{form.name}</CardTitle>
                            <CardDescription>Card Description</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Card Content</p>
                        </CardContent>
                        <CardFooter>
                            <p>Card Footer</p>
                        </CardFooter>
                    </Card>
                ))}

                <NewForm onSubmit={onSubmit} />
            </>
            )
            }

        </div >
    )
}

const NewForm: React.FC<NewFormProps> = ({ onSubmit }) => {
    const [isDialogOpen, setDialogOpen] = useState(false);



    const form = useForm<Input>({
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
        <div className="mb-4 mx-4">
            <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild className="w-64 h-96">
                    <Button variant="ghost">
                        <Card className="w-64 h-96">
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