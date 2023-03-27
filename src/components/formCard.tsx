import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export default function FormCard(props) {
    const setState = ()=>{
        props.stateHandler(props.data._id)
    }
    return (
        <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">
                <CardContent>
                    <Typography sx={{ fontSize: 28 }} color="text.primary" gutterBottom>
                        {props.data.title}
                    </Typography>
                    <Typography variant="body2">
                        Created On: {new Date(props.data.createdAt).toDateString()}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={setState}>EDIT FORM</Button>
                </CardActions>
            </Card>
        </Box>
    );
}