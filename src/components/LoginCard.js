import React, { useState } from 'react'
import { Button, Typography, InputAdornment, TextField } from '@mui/material'
import {createTheme, ThemeProvider} from '@mui/material'
import "./LoginCard.css"
import { grey } from '@mui/material/colors'

const theme = createTheme({
  palette: {
    primary: {
      main: '#ededed',
      contrastText: '#000000',
    },
  },
});

const LoginCard = ({handleLoginChange}) => {
  const[loginField, setLoginField] = new useState(null)

  function handleLoginFieldChange(event) {
    setLoginField(event.target.value)
  }

  function handleEnter(event) {
    if(event.keyCode == 13){
      console.log("hi")
      handleLoginChange(loginField)
    }
    else if(event.type != "keydown"){
      handleLoginChange(loginField)
    }
  }

  return (
    <div id="loginCardContainer">
      <div id="loginCardLogo">
        <img src="https://i.ibb.co/fXYhqcX/seriousbeet-transformed.png" alt="seriousbeet-transformed" border="0" id="loginCardLogoImg"/>
        <div id="loginCardLogoLine"></div>
      </div>
      <div id="loginCardText">
        <Typography variant="h6">
            SERIOUS BEETS
        </Typography>
      </div>
      <div id="loginInput" className='TextField-without-border-radius'>
        <TextField
          variant="outlined"
          id="loginInputTextfield"
          onKeyDown={handleEnter}
          onChange={handleLoginFieldChange}
          placeholder="Login"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <ThemeProvider theme={theme}>
                  <Button
                    onClick={handleEnter}
                    variant="contained"
                    color="primary"
                    style={{
                      borderRadius: 0,
                      "&:hover": {
                        backgroundColor: "inherit",
                      },
                      "&:active": {
                        boxShadow: "none",
                      },
                    }}
                  >
                    <Typography variant="body2" style={{ fontWeight: "bold",}}>LOGIN</Typography>
                  </Button>
                </ThemeProvider>
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root.Mui-focused": {
              color: "black",
              "& > fieldset": {
                borderWidth: "1px",
                borderColor: "black"
              }
            },
            "& .MuiOutlinedInput-root": {
              color: "black",
              "& > fieldset": { borderColor: "grey" },
            },
          }}
          inputProps={{
            style: {
              height: "15px",
            },
          }}
        />
      </div>
    </div>
  )
}

export default LoginCard