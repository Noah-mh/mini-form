//import for library
import type { z } from "zod";
import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

//import for ui
import { Button } from "@/components/ui/button"
import {
    Form,
} from "@/components/ui/form"
import { useToast } from "@/components/ui/use-toast";

//import for types
import type { DynamicFormProps } from "@/types/form_data.type";
import type { Response } from "@prisma/client";

//import for utils
import { api } from "@/utils/api";
import createDynamicSchema from "@/utils/createDynamicSchema";
import renderDynamicInput from "@/utils/renderDynamicInput";

const DynamicForm: React.FC<DynamicFormProps> = ({ questionsData, responsesData }) => {
    const { toast } = useToast();
    const dynamicSchema = createDynamicSchema(questionsData);


    function isJsonParsable(string: string) {
        try {
            JSON.parse(string);
        } catch (e) {
            return false;
        }
        return true;
    }

    const parsedResponsesData = responsesData ? responsesData.map((response: Response) => ({
        ...response,
        value: response.value !== null && isJsonParsable(response.value) ?
            JSON.parse(response.value) : response.value,
    })) : [];

    const defaultValues = parsedResponsesData.reduce((acc: Record<string, string | number | string[] | undefined>, response: Response) => {
        if (response.value !== null) {
            acc[response.questionId] = response.value;
        }
        return acc;
    }, {});

    console.log("defaultValues", defaultValues);

    const form = useForm<z.infer<typeof dynamicSchema>>({
        resolver: zodResolver(dynamicSchema),
        defaultValues: defaultValues,
    })

    const createResponse = api.response.createResponse.useMutation({
        onSuccess: () => {

            toast({
                title: "Successfully Submitted",
            })
        },
        onError: (error) => {
            toast({
                title: "Error",
                description: error.message,
            })
        }
    });

    const updateResponse = api.response.updateResponses.useMutation({
        onSuccess: () => {

            toast({
                title: "Successfully Updated",
            })
        },
        onError: (error) => {
            toast({
                title: "Error",
                description: error.message,
            })
        }
    });

    const onSubmit = async (values: z.infer<typeof dynamicSchema>) => {
        console.log("saving response");
        const arrayOfResponse = Object.entries(values).map(([questionId, value]) => (
            {
                questionId,
                value: value === undefined ? null : (typeof value === "string" ? value : JSON.stringify(value)),
            }));

        const arrayOfResponseWithFormId = arrayOfResponse.map((response) => ({
            ...response,
            formId: questionsData[0]!.formId,
        }));

        console.log(arrayOfResponseWithFormId);
        try {
            if (Object.keys(defaultValues).length === 0) {
                await createResponse.mutateAsync({
                    responses: arrayOfResponseWithFormId,
                });
            } else {
                await updateResponse.mutateAsync({
                    responses: arrayOfResponse,
                });
            }
        } catch (error) {
            toast({
                title: "Error",
            })
        }
    }

    const onTrigger = async (values: z.infer<typeof dynamicSchema>) => {
        await form.trigger();
        console.log("triggered")
        console.log(values);
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(values, null, 2)}</code>
                </pre>
            ),
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} >

                {questionsData.map((question) => renderDynamicInput(question, form.control))}
                <div className="flex justify-between my-10" >
                    <Button type="submit">Submit</Button>
                    <Button type="button" onClick={() => onTrigger(form.getValues())}>Test Submit</Button></div>
            </form>
        </Form>
    )
}

export default DynamicForm;
