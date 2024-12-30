import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { Container, Box, Button, Snackbar,Alert } from "@mui/material";
import { IconButton, Typography, InputLabel } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';


export default function SignUp() {

    const [showPassword, setShowPassword] = React.useState(true);
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [validationError, setValidationError] = useState('')
    const [email, setEmail] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [picture, setPicture] = useState('')
    const [error, setError] = useState('')
    const [open, setOpen] = useState(false)
    const [state,setState] = useState('')
    const navigate = useNavigate()
    const [message,setMessage] = useState('')




    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    const clearErrorMessages = () => {
        setTimeout(() => setValidationError(''), 3000);
    };

    const validateForm = () => {
        if (!username || !email || !password || !confirmPassword) {
            return "Please fill out all the fields";
        }
        if (password !== confirmPassword) {
            return "Password and confirm password are not matching";
        }
        if (password.length < 8) {
            return "Password minimum length is 8 characters";
        }
        return null; // No errors
    };

    const handleSubmit = async () => {
        const error = validateForm(); // Perform all validation checks
        if (error) {
            setValidationError(error); // Set the validation error
            clearErrorMessages(); // Clear it after a delay
            return;
        }

        // Create a FormData object to hold the form fields
        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('picture', picture); // Ensure 'picture' is a File object

        try {
            const response = await fetch('http://127.0.0.1:5000/app/user/signup', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('userInfo',data)
                setOpen(true);
                setState("success")
                setMessage("User created successfully.")
                // Handle successful response
            } else {
                const errorData = await response
                console.log(errorData,"===========")
                setOpen(true);
                setState("erro")
                setMessage(errorData.message)
               
            }
        } catch (error) {
            setOpen(true);
                setState("error")
                setMessage(error.message)
        }
    };

    const handleUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setPicture(file); // Set the File object directly
        }
    };

    const handleClose = () => {
        setOpen(false)
    }
    return (
        <Container
            maxWidth='sm'
            sx={{
                margin: "0px",
                zIndex: 1,
                background: 'white',
                height: 'auto',
                width: "100%",
                display: 'flex',
                flexDirection: 'column'

            }}>
            <Box
                sx={{
                    mt: 0,
                    display: 'flex',
                    alignItems: 'center',
                    bgcolor: 'white',
                    width: '100%',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    gap: 2,
                    padding: 1,


                }}
            >
                <TextField
                    fullWidth
                    type='text'
                    label='username'
                    placeholder="enter username or email"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                ></TextField>
                <TextField
                    fullWidth
                    type='text'
                    label='email'
                    placeholder="enter the email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                ></TextField>
                <TextField
                    fullWidth
                    label="Password"
                    placeholder="***********"
                    type={showPassword ? "password" : "text"}
                    onChange={(e) => { setPassword(e.target.value) }}
                    required
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    onMouseUp={handleMouseUpPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    fullWidth
                    label="Confirm Password"
                    placeholder="***********"
                    type={showPassword ? "password" : "text"}
                    onChange={(e) => { setConfirmPassword(e.target.value) }}
                    required
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    onMouseUp={handleMouseUpPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <Box
                    maxWidth='sm'
                    sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
                >
                    <InputLabel htmlFor="my-picture">Select profile picture</InputLabel>
                    <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="label"
                    >
                        <input
                            hidden
                            accept="image/*"
                            type="file"
                            onChange={handleUpload}
                        />
                        <PhotoCamera />
                    </IconButton>
                </Box>
                {validationError && <Typography variant='body2' color="red">{validationError}</Typography>}
                <Button
                    fullWidth
                    variant="contained"
                    onClick={handleSubmit}
                >SignUp </Button>
                <Typography variant='body1' color="res">{error}</Typography>
                <Snackbar
                    anchorOrigin={{ 'vertical': 'top', 'horizontal': 'center' }}
                    open={open}
                    onClose={handleClose}
                    autoHideDuration={6000}
                    message="login successful"
                    key={{ 'vertical': 'top', 'horizontal': 'center' }}
                >
                    <Alert
                        onClose={handleClose}
                        severity={state}
                        variant="filled"
                        sx={{ width: '100%' }}
                    >
                        {message}
                    </Alert>
                </Snackbar>
            </Box>


        </Container>
    );
}