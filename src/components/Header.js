import React from 'react'
import { Button, Typography, Chip } from '@mui/material'

const Header = ({loginName}) => {
  return (
    <div>
      <div id="websiteName">
        <Typography variant="h6">
          SERI &nbsp;&nbsp; US BEETS
        </Typography>
        <img src="https://i.ibb.co/HX5Xj5w/seriousbeet.png" alt="" id="logo"></img>
      </div>

      {/* <Button
        variant='text'
        sx={{ color: 'grey', backgroundColor: 'white'}}
        id="loginBtn"
      >
        Login
      </Button> */}
      <Chip label={
        <Typography variant="body2" style={{ fontWeight: "bold" }}>
          {loginName}
        </Typography>
        }
       id="loginChip" size="medium"/>
    </div>
  )
}

export default Header