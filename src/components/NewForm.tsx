//import for library
import { z } from "zod";
import React, { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

//import for ui
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Card,
    CardContent,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

//import for types
import { newFormSchema } from "@/validators/form_schema.type";
import { FormInfoInputType } from "@/types/form_data.type";
import { NewFormProps } from "@/types/form_data.type";
import { DiaLogContentFC } from "./DialogContentFC";
import { Form } from "@prisma/client";


export const NewForm: React.FC<NewFormProps> = ({ onSubmit }) => {
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [formInfo, setFormInfo] = useState<Form | undefined>(undefined);

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


                <DiaLogContentFC label="Add New Form" onSubmit={onSubmit} setDialogOpen={setDialogOpen} setFormInfo={setFormInfo} />
            </Dialog>
        </div>
    )
}