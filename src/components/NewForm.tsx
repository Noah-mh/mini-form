// import for library
import React, { useState } from "react"

// import from Prisma
import type { Form } from "@prisma/client";

// import for ui
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Card,
    CardContent,
} from "@/components/ui/card"

// import for components
import DiaLogContentFC from "@/components/DialogContentFC";

// import for types
import type { NewFormProps } from "@/types/form_data.type";



const NewForm: React.FC<NewFormProps> = ({ onSubmit }) => {
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


                <DiaLogContentFC label="Add New Form" onSubmit={onSubmit} setDialogOpen={setDialogOpen} formInfo={formInfo} setFormInfo={setFormInfo} />
            </Dialog>
        </div>
    )
}
export default NewForm;