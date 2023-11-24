import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';
import { Toast } from "./index"
import { Image } from "react-bootstrap";

const query = async (textData) => {
    try {
        const response = await fetch(
            "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
            {
                headers: { 
                    "Accept": "image/png",
                    "Authorization": "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM", 
                    "Content-Type": "application/json" 
                },
                method: "POST",
                body: JSON.stringify(textData),
            }
        );
        const result = await response.blob();
        return result;
    } catch (error) {
        console.log(error)
        return error;
    }
}

const GeneratedImage = ({ imgSrc }) => {
    return (
        <Container>
            <Image
                src={imgSrc}
                alt="Response Image"
                style={{ width: '100%', maxWidth: '500px', marginTop: '10px' }}
                rounded
            />
        </Container>
    );
}

const Loading = () => {
    return (
        <Grid xs display="flex" justifyContent="center" alignItems="center">
            <CircularProgress />
        </Grid>
    );
}

export default function FormDialog({ setImageList, enabled }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [textInput, setTextInput] = useState("");
    const [imageBlob, setImageBlob] = useState(null);
    
    const handleSubmit = async () => {
        setLoading(true)
        const response = await query({ "inputs": textInput })
        const url = URL.createObjectURL(response)
        setImageBlob(url)
        setLoading(false)
    } 

    const addPanel = () => {
        if (imageBlob != null) {
            setImageList(prevList => [...prevList, imageBlob])
        } else {
            
        }
        handleClose()
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setLoading(false)
        setImageBlob(null)
        setOpen(false);
    };

    return (
        <React.Fragment>
            {
                enabled ?
                    (
                        <Button variant="outlined" onClick={handleClickOpen}>
                            Add New Panel
                        </Button>
                    ) :
                    (
                        <React.Fragment>
                            <Button variant="outlined" disabled>
                                Add New Panel
                            </Button>
                            <Typography
                                variant="caption"
                                mt={1}
                                color="red"
                            >
                                10 Panels added!
                            </Typography>
                        </React.Fragment>
                    )
            }
            
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add New Image Panel</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter a text description that accurately describes the image panel, that you want to add. Note: The requests may take upto 10 minutes.
                    </DialogContentText>
                    
                    <TextField
                        autoFocus
                        margin="dense"
                        id="outlined-multiline-static"
                        label="Image Description"
                        multiline
                        rows={3}
                        fullWidth
                        variant="standard"
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value)}
                    />
                    <Button onClick={handleSubmit}>Generate Panel</Button>

                    {loading && <Loading/>}

                    {imageBlob && <GeneratedImage imgSrc={imageBlob} />}
                </DialogContent>
                
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={addPanel}>Add Panel</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}