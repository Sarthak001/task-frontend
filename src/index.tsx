import { SetStateAction, useEffect, useState } from 'react'
import AddFormDialog from './components/addFormDialog'
import Navbar from './components/navbar'
import './index.css'
import Stack from '@mui/material/Stack';
import { getForms } from './apis';
import FormCard from './components/formCard';
import SideBar from './components/sidebar';


export default function App() {
    const [state, setState] = useState("view")
    const[formId,setFormId] = useState("")
    const [addFormDialogState, setAddFormDialogState] = useState(false);
    const [forms, setForms] = useState([]);

    const stateHandler = (id: SetStateAction<string>)=>{
        setState("edit")
        setFormId(id)
    }


    const openHandler = () => {
        setAddFormDialogState(addFormDialogState => !addFormDialogState)
        fetchForms()
    }
    const fetchForms = async () => {
        const response = await getForms();
        setForms(response)
    }

    useEffect(() => {
        if (state === "view") {
            fetchForms()
        }
    }, [])

    const allforms = (
        <>
            {
                forms.map(data => {
                    return <FormCard key={data._id} data={data} stateHandler={stateHandler}></FormCard>
                })
            }
        </>
    )
    const editform = (
        <>
            hello ji
        </>
    )


    return (<>
        <Navbar openHandler={openHandler}></Navbar>
        <Stack direction="row" spacing={2} m={2}>
            {
                state === "view" ? allforms : <SideBar formId={formId}></SideBar>
            }
        </Stack>


        <AddFormDialog addFormDialogState={addFormDialogState} openHandler={openHandler} ></AddFormDialog>
    </>)



}