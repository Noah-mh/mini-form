//import for library
import { z } from "zod";
import React, { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useSession } from "next-auth/react";
//import for ui
import { useToast } from "@/components/ui/use-toast";

//import for types
import { type GetServerSidePropsContext } from "next/types";
import { api } from "@/utils/api";

import { FormDetailsProps } from "@/types/form_data.type";
import DynamicForm from "@/components/DynamicForm";


const FormDetails: React.FC<FormDetailsProps> = ({ formId }) => {
    const { data: sessionData } = useSession();

    const { data: formInfo, isLoading } = api.form.getOne.useQuery({ id: formId })

    const { data: questionsData } = api.formDetails.getOne.useQuery(
        { id: formId }
    );

    const { data: responsesData, refetch: refetchFormResponses, isLoading: isLoadingFormResponses } = api.response.getOne.useQuery(
        { id: formId }
    );

    console.log("refetchFormResponses", typeof refetchFormResponses);

    if (isLoading || isLoadingFormResponses) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        )
    }

    if (!formInfo) {
        return (
            <div>
                <p>Form not found</p>
            </div>
        )
    }



    return (
        <div className="px-40 py-10">
            <div className="flex justify-center items-center">
                <h1 className="text-4xl font-bold">{formInfo?.name}</h1>
            </div>
            <DynamicForm questionsData={questionsData!} responsesData={responsesData!} />
        </div >
    )

}

export default FormDetails;


export function getServerSideProps(context: GetServerSidePropsContext) {
    return {
        props: {
            formId: context.query.formId,
        },
    };
}