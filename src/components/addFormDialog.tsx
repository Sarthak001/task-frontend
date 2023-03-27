import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { createForm } from '../apis';

export default function AddFormDialog(props) {
    const [formName,setFormName] = useState({
        title:"",
        feilds:""
    });

    const handleSubmit = async() => {
        event.preventDefault();
        await createForm(formName) 
        props.openHandler()
    }
    const handleInput = (e) => {
        setFormName({...formName,title:e.target.value})
    }
    return (
        <div>
            <Dialog open={props.addFormDialogState} onClose={props.openHandler} fullWidth>
                <DialogTitle>ADD FORM</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="formName"
                            label="Form Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleInput}
                            value={formName.title}
                            required
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={props.openHandler}>CANCEL</Button>
                        <Button type='submit'>ADD FORM</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}