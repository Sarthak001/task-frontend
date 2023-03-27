import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useEffect, useState } from 'react';
import { getFormById } from '../apis';
import AddFieldDialog from './addFieldDialog';
import DynamicForms from './dynamicFormGeneration';

const drawerWidth = 280;

export default function SideBar(props) {
    const [addFieldDialogState, setAddFieldDialogState] = useState(false);
    const [formData, setFormData] = useState({
        _id: "",
        title: "",
        fields: [],
        createdAt: "",
        updatedAt: "",
        __v: 0
      })
    const openHandler = () => {
        setAddFieldDialogState(addFieldDialogState => !addFieldDialogState)
    }

    const fetchData = async (id) => {
        const response = await getFormById(id)
        setFormData(response)
    }

    useEffect(() => {
        fetchData(props.formId)
    }, [addFieldDialogState])
    return (
        <>
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Toolbar>FORM ID : {props.formId}</Toolbar>
                <Divider />
                <List>
                    {
                    formData["fields"].map((data, index) => (
                        <ListItem key={index} disablePadding>
                            <ListItemButton>
                                <ListItemText primary={data.name} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {['ADD FORM FIELD'].map((text, index) => (
                        <ListItem key={index} disablePadding>
                            <ListItemButton onClick={openHandler}>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
            >
                <Typography>Dynamic Form Generation</Typography>
                <DynamicForms formData={formData}></DynamicForms>
            </Box>
        </Box>
        <AddFieldDialog addFieldDialogState={addFieldDialogState} openHandler={openHandler} formData={formData} ></AddFieldDialog>
        </>
    );
}