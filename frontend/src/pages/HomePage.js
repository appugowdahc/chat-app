import React from "react";
import { useState } from "react";
import { Container, Box, Typography, Tabs, Tab } from "@mui/material";
import Login from '../components/Login';
import SignUp from '../components/SignUp'




const HomePage = () => {

    const [value, setValue] = useState(0)

    const handleChange = () => {
            setValue(1-value)
    }
    return (
        <React.Fragment>
  {/* Header Container */}
  <Container
    maxWidth="sm"
    sx={{
      bgcolor: "white",
      height: "10vh",
      display: "flex",
      boxShadow: 3,
      borderRadius: 2,
      mb: 2, // Add margin-bottom for spacing
    }}
  >
    <Box
      sx={{
        textAlign: 'center',
        width: '100%',
        margin: "auto 0",
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
          fontFamily: 'Work Sans, sans-serif',
          textAlign: 'center',
        }}
        variant="h6"
        component="h1"
      >
        Talk-A-Tive
      </Typography>
    </Box>
  </Container>

  {/* Tabs Container */}
  <Container
    maxWidth="sm"
    sx={{
      bgcolor: "white",
      minHeight: "10vh",
      display: "flex",
      borderRadius: 2,
      padding: '15px',

    }}
  >
    <Box
      sx={{
        textAlign: 'center',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-evenly',
      }}
    >
      <Tabs value={value} onChange={handleChange}>
        <Tab
          sx={{
            marginRight: 8,
            bgcolor:"rgba(240, 234, 234, 0.7)",
            borderRadius: 5,
            minWidth: '160px',
          }}
          label="Login"
        />
        <Tab
          sx={{
            marginRight: 0,
            bgcolor: "rgba(240, 234, 234, 0.7)",
            borderRadius: 5,
            minWidth: '160px',
          }}
          label="Sign up"
        />
      </Tabs>
    </Box>
  </Container>

  {/* Login/SignUp Container */}
  <Container
    maxWidth="sm"
    sx={{
      bgcolor: "white",
      height: "auto",
      display: "flex",
      flexDirection: "column",
      borderRadius: 2,
      padding: '15px',
    }}
  >
    {value === 0 && (
      <Box>
        <Login />
      </Box>
    )}
    {value === 1 && (
      <Box>
        <SignUp />
      </Box>
    )}
  </Container>
</React.Fragment>
    )
}
export default HomePage