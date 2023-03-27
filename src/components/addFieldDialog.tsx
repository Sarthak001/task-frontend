import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import { BaseFormField } from '../schema';
import { v4 as uuidv4 } from 'uuid';
import { updateFormById } from '../apis';
export default function AddFieldDialog(props) {
    const [field, setfield] = useState({
        id: "",
        name: "",
        label: "",
        required: false,
        type: "",
        config: {}
    });
    useEffect(()=>{
        setfield({...field,id:uuidv4()})
    },[])

    const saveData = async(id: string,data: { id?: string; name?: string; label?: string; required?: boolean; type?: "TEXT" | "TEXT_AREA" | "SELECT"; })=>{
        const temp = {
            title:props.formData.title,
            fields:[...props.formData.fields]
        }
        temp["fields"].push(data)
        await updateFormById(id,temp)
        props.openHandler()
    }

    const handleSubmit = async () => {
        event.preventDefault();
        const result = BaseFormField.safeParse(field)
        if (result.success) {
            saveData(props.formData._id,result.data)
        }

    }

    const textHandleInput = (e: { target: { id: string; value: string; }; }) => {
        if (e.target.id === "name") {
            setfield({ ...field, name: e.target.value })
            return
        }
        setfield({ ...field, label: e.target.value })
    }
    
    const handleInput = (e: { target: { value: string; }; }) => {
        setfield({ ...field, type: e.target.value })
    }

    const radiohandleInput = (e: { target: { value: string; }; }) => {
        if (e.target.value === "true") {
            setfield({ ...field, required: true })
            return
        }
        setfield({ ...field, required: false })


    }
    return (
        <div>
            <Dialog open={props.addFieldDialogState} onClose={props.openHandler} fullWidth>
                <DialogTitle>Add Field</DialogTitle>
                <Stack spacing={4} m={2}>
                    <form onSubmit={handleSubmit}>
                        <DialogContent>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="fieldName"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={textHandleInput}
                                value={field.name}
                                required
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="label"
                                label="labelName"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={textHandleInput}
                                value={field.label}
                                required
                            />
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={field.type}
                                    label="Age"
                                    onChange={handleInput}
                                >
                                    <MenuItem value={"TEXT"}>TEXT</MenuItem>
                                    <MenuItem value={"TEXT_AREA"}>TEXT AREA</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl>
                                <FormLabel id="demo-row-radio-buttons-group-label">Required</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    onChange={radiohandleInput}
                                >
                                    <FormControlLabel value="true" control={<Radio />} label="YES" />
                                    <FormControlLabel value="false" control={<Radio />} label="NO" />
                                </RadioGroup>
                            </FormControl>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={props.openHandler}>CANCEL</Button>
                            <Button type='submit'>ADD Field</Button>
                        </DialogActions>
                    </form>
                </Stack>

            </Dialog>
        </div>
    );
}