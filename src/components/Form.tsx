// import for library
import React, { useEffect, useState } from "react"
import { useSession } from "next-auth/react";
import Link from "next/link";
import { type Form, QuestionType } from "@prisma/client";
import { api } from "@/utils/api";

// import for ui
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "./ui/button";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"
import {
    Dialog,
    DialogTrigger,
} from "@/components/ui/dialog"


// import for components
import NewForm from "@/components/NewForm";
import DiaLogContentFC from "@/components/DialogContentFC";

// import for types
import type { FormInfoInputType } from "@/types/form_data.type";



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

const Forms = () => {
    const { data: sessionData } = useSession();
    const { toast } = useToast()

    const [isDialogOpen, setDialogOpen] = useState(false);
    const [formInfo, setFormInfo] = useState<Form | undefined>(undefined);

    useEffect(() => {
        if (formInfo !== undefined) {
            setDialogOpen(true);
        }
    }, [formInfo]);

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

    const updateForm = api.form.update.useMutation({
        onSuccess: () => {
            void refetchForms();
            toast({
                title: "Successfully updated form",
            })
        }
    });

    const deleteForm = api.form.delete.useMutation({
        onSuccess: () => {
            void refetchForms();
        }
    });

    const initializeForm = api.form.bulkCreateQuestion.useMutation({
        onSuccess: () => {
            toast({
                title: "Successfully created form",
            })
        }
    });




    const onSubmit = async (values: FormInfoInputType) => {
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

        } catch (error) {
            toast({
                title: "Error creating form",
            })
        }
    }

    const onEditSubmit = async (values: FormInfoInputType, formId?: string,) => {
        console.log("creating form")
        try {
            await updateForm.mutateAsync({
                id: formId!,
                name: values.name,
                description: values.description,
            });

        } catch (error) {
            toast({
                title: "Error updating form",
            })
        }
    }

    const handleDelete = async (id: string, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        console.log("deleting form")
        try {
            await deleteForm.mutateAsync({ id });
            toast({
                title: "Form Deleted",
            })
        } catch (error) {
            console.log(error)
            toast({
                title: "Error deleting form",
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
            {forms?.length === 0 ? (
                <NewForm onSubmit={onSubmit} />
            ) : (
                <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
                    {forms?.map((form) => (
                        <ContextMenu key={form.id}>

                            <ContextMenuTrigger asChild>
                                <Link href={{
                                    pathname: `/formdetails/[formId]`,
                                    query: { formId: form.id },
                                }} key={form.id}>
                                    <Card className="w-64 h-36 mb-4 mx-4">
                                        <CardHeader>
                                            <CardTitle>{form.name}</CardTitle>
                                            <CardDescription>{form.description}</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm">Last Updated : <br />{form.updatedAt.toLocaleString()}</p>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </ContextMenuTrigger>

                            <ContextMenuContent>
                                <ContextMenuItem>
                                    <DialogTrigger asChild >
                                        <Button variant="ghost" onClick={() => setFormInfo(form)}>
                                            Edit Form Info
                                        </Button>
                                    </DialogTrigger>
                                </ContextMenuItem>
                                <ContextMenuItem>
                                    <Button variant="ghost" onClick={async (event) => { await handleDelete(form.id, event) }}>
                                        Delete
                                    </Button>
                                </ContextMenuItem>
                            </ContextMenuContent>

                        </ContextMenu>
                    ))}
                    <NewForm onSubmit={onSubmit} />
                    <DiaLogContentFC label="Edit Form Info" formInfo={formInfo} onSubmit={onEditSubmit} setDialogOpen={setDialogOpen} setFormInfo={setFormInfo} />
                </Dialog >
            )
            }

        </div >
    )
}
export default Forms;