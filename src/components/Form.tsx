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
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import React, { use, useState } from "react"

const FormSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required"
    }),
    description: z.string().optional(),
});

type NewFormProps = {
    onSubmit: (values: z.infer<typeof FormSchema>) => void | Promise<void>;
}

export const Forms = () => {
    const { data: sessionData } = useSession();
    const { toast } = useToast()

    const { data: forms, refetch: refetchForms } = api.form.getAll.useQuery(
        undefined,
        {
            enabled: !!sessionData?.user,
        }
    )
    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
        // await api.form.create.mutation(values);
        console.log("creating form")
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(values, null, 2)}</code>
                </pre>
            ),
        })
        refetchForms();
    }



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
                    <Card className="w-64 h-96 mb-4 mx-4">
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

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            description: "",
        },
    })

    const handleSubmit = form.handleSubmit(
        async (values) => {
            await onSubmit(values);
            // Close the dialog if there are no errors
            if (Object.keys(form.formState.errors).length === 0) {
                form.reset();
                setDialogOpen(false);
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