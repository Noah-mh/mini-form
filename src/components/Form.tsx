//import for library
import React from "react"
import { useSession } from "next-auth/react";
import { api } from "@/utils/api";
import Link from "next/link";

//import for ui
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "./ui/button";

//import for components
import { NewForm } from "./NewForm";

//import for types
import { QuestionType } from "@prisma/client";
import { FormInputType } from "@/types/form_data.type";


export const questions = [
    { text: "Name", type: QuestionType.TEXT },
    { text: "Email Address", type: QuestionType.EMAIL },
    { text: "Phone Number", type: QuestionType.PHONE_NUMBER },
    { text: "Upload your CV", type: QuestionType.FILE_INPUT },
    {
        text: "Select One of the options below",
        type: QuestionType.MULTIPLE_CHOICE,
    },
    { text: "What do you prefer to be contact?", type: QuestionType.CHECKBOX },
    { text: "Select one", type: QuestionType.DROPDOWN },
    {
        text: "What is your preferred time to be contacted?",
        type: QuestionType.TIME,
    },
    {
        text: "What is your preferred day to be contacted?",
        type: QuestionType.DATE,
    },
    {
        text: "Rate the experience you had with us",
        type: QuestionType.LINEAR_SCALE,
    },
];

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

    const deleteForm = api.form.delete.useMutation({
        onSuccess: () => {
            void refetchForms();
        }
    });

    const initializeForm = api.form.bulkCreateQuestion.useMutation({});




    const onSubmit = async (values: FormInputType) => {
        console.log("creating form")
        try {
            const result = await createForm.mutateAsync({
                name: values.name,
                description: values.description,
            });
            if (result) {
                const questionWithFormId = questions.map((question) => ({
                    ...question,
                    formId: result.id,
                }));
                await initializeForm.mutateAsync({ questions: questionWithFormId });
            }
            toast({
                title: "You submitted the following values:",
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                        <code className="text-white">{JSON.stringify(values, null, 2)}</code>
                    </pre>
                ),
            })
        } catch (error) {
            toast({
                title: "Error",
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                        <code className="text-white">{JSON.stringify(error, null, 2)}</code>
                    </pre>
                ),
            })
        }
    }

    const handleDelete = async (id: string, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        console.log("deleting form")
        try {
            await deleteForm.mutateAsync({ id: id });
            toast({
                title: "Form Deleted",
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                        <code className="text-white">{JSON.stringify(id, null, 2)}</code>
                    </pre>
                ),
            })
        } catch (error: any) {
            console.log(error)
            toast({
                title: "Error",
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                        <code className="text-white">{JSON.stringify(error, null, 2)}</code>
                    </pre>
                ),
            })
        }
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
            ) : (
                <>
                    {forms?.map((form, index) => (
                        <Link href={{
                            pathname: `/formdetails/[formId]`,
                            query: { formId: form.id },
                        }} key={form.id}>
                            <Card key={index} className="w-64 h-36 mb-4 mx-4">
                                <CardHeader>
                                    <CardTitle>{form.name}</CardTitle>
                                    <CardDescription>{form.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm">Last Updated : <br></br>{form.updatedAt.toLocaleString()}</p>
                                </CardContent>
                                <CardFooter>
                                    <Button onClick={(event) => { handleDelete(form.id, event) }}>Delete</Button>
                                </CardFooter>
                            </Card>
                        </Link>
                    ))}

                    <NewForm onSubmit={onSubmit} />
                </>
            )
            }

        </div >
    )
}