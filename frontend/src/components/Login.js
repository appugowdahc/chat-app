import React, { useState } from "react";

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { Container, Box, IconButton, Button, Typography } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


export default function Login() {
    const [showPassword, setShowPassword] = React.useState(true);
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [validationError, setValidationError] = useState('')

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };
    const clearErrorMessages = ()=>{setTimeout(()=>setValidationError(''),3000)}

    const handleSubmit = async() => {
        console.log(username, password, "000000000000000")
        // e.preventDefault()
        if (username.length < 1) {
            setValidationError("Please provide the username")
            clearErrorMessages()
            return
        } if (!password) {
            setValidationError("Please provide the password")
            clearErrorMessages()
            return
        }
        if(password.length <8){
            setValidationError("Password minimum length is 8 character")
            clearErrorMessages()
            return
        }
        try {
            const response = await fetch('http://127.0.0.1:5000/app/user/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                username: username,
                password: password,
              }),
            });
          
            if (!response.ok) {
              // Handle HTTP errors
              const errorData = await response.json();
              console.error('Error:', errorData);
            } else {
              const data = await response.json();
              console.log(data)
              localStorage.setItem('userInfo',data)
              // Process the response data
            }
          } catch (error) {
            // Handle network errors
            console.error('Network Error:', error);
          }
          

    }

    return (
        <Container
            maxWidth='sm'
            sx={{
                margin: '0px',
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

                {validationError && <Typography variant='body2' color="red">{validationError}</Typography>}
                <Button
                    fullWidth
                    variant="contained"
                    onClick={handleSubmit}
                >Login</Button>

            </Box>

        </Container>
    );
}