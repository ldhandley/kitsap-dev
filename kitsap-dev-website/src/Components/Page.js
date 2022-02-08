import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {bannerBackgroundColor, h2TagColor, jumbotronContrastingColor} from "../theme"
import {  useNavigate } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import Card from '@mui/material/Card';
import { useState, useEffect } from 'react';
import {Link} from "react-router-dom"

export function LinkCard(props){
  const [elevation,setElevation] = useState(1);

  function onMouseEnter(){
    setElevation(4)
  }
  
  function onMouseLeave(){
    setElevation(1)
  }

  return(
    <Link to={props.link} style={{textDecoration: "none"}}>
      <Card sx={{ maxWidth: 345, marginTop: 3 }} elevation={elevation} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        {props.children}
      </Card>
    </Link>
  )
}

export function HamburgerMenu(props) {
  let navigate = useNavigate();

  return(
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <IconButton variant="contained" {...bindTrigger(popupState)} style={{position:"fixed", top:10, left: 10, zIndex: 2, color: "white", backgroundColor: "#402fbc"}}>
            <MenuIcon />
          </IconButton>
          <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={()=>navigate('/')}>Home</MenuItem>
            <MenuItem onClick={()=>navigate('/demos')}>Demos</MenuItem>
            <MenuItem onClick={()=>navigate('/blog')}>Blog</MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
    
    
  )
}

export function Page(props){

  return(
    <div className="">
      <HamburgerMenu/>
      <Container style={{ width: "100%", maxWidth: "100%", position: "relative" }}>
        <Box sx={{ backgroundColor:bannerBackgroundColor, backgroundPosition: "center", backgroundSize: "cover" }}>
          <h1 style={{color: jumbotronContrastingColor, margin: 0, marginLeft: 60, padding: 10 }}>{props.title}</h1>
        </Box>
      </Container>
      <Container maxWidth="md">
        <div style={{padding: 20}}/>
        {props.children}
        <div style={{padding:100}}/>
      </Container>
    </div>
  )
}
