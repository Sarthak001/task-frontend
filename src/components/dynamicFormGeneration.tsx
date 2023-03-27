import { TextareaAutosize, TextField } from "@mui/material";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import { BaseFormField } from "../schema";


export default function DynamicForms(props) {
    const { control, handleSubmit } = useForm({resolver: zodResolver(BaseFormField)});
    const onSubmit = data => console.log(data);


    return (<>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
                {
                    props["formData"]["fields"].map((data, index) => {
                        if(data.type === "TEXT"){
                            return <>
                            <Controller
                                key={index}
                                name={data.name}
                                control={control}
                                render={({ field }) => <TextField {...field} required={data.required} label={data.label}></TextField>}
                            />
                        </>
                        }
                        else if (data.type === "TEXT_AREA"){
                            return <>
                            <Controller
                                key={index}
                                name={data.name}
                                control={control}
                                render={({ field }) => <TextField multiline rows={4} {...field} required={data.required} label={data.label}></TextField>}
                            />
                        </>

                        }
                    })
                }
                <Button type="submit" variant="contained">Submit</Button>
            </Stack>
        </form>
    </>)
}