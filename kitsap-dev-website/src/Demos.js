import * as React from 'react';
import { styled } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import {OrderForm} from "./demos/demo-web-ordering-form" 
import {Page} from "./Components/Page"
import {Link} from "react-router-dom"
import Alert from '@mui/material/Alert';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

export function WebOrderingFormDemo(){
  return(
      <Page title="Point of Sale Demo">
        <h2>Stephano's Pizzeria</h2>
        <OrderForm/>
      </Page>
  
  )
}

export function WebOrderingFormCancelPageDemo(){

  return(
    <Page title="Point of Sale Demo">
      <h2>Stephano's Pizzeria</h2>
      <Alert severity="error">Your order was not processed.</Alert>
      <div style={{padding: 10}}/>
      <OrderForm/>
    </Page>
  )
}

export function WebOrderingFormSuccessPageDemo(){

  return(
    <Page title="Point of Sale Demo">
      <h2>Stephano's Pizzeria</h2>
      <Alert severity="success">We've received your order! We'll call you if there are any issues.</Alert>
      <div style={{padding: 10}}/>
      <OrderForm/>
    </Page>
  )
}

function LinkCard(props){
  const [elevation,setElevation] = useState(1);

  function onMouseEnter(){
    setElevation(4)
  }
  
  function onMouseLeave(){
    setElevation(1)
  }

  return(
    <Link to="/demos/web-ordering-form" style={{textDecoration: "none"}}>
      <Card sx={{ maxWidth: 345, marginTop: 3 }} elevation={elevation} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <CardMedia
          component="img"
          height="194"
          image="/demo-images/pepperoni-pizza.jpeg"
          alt="Pepperoni Pizza"
        />
        <CardContent>
          <Typography variant="h5">
            Pizzeria Point of Sale
          </Typography>
        </CardContent>
      </Card>
    </Link>
  )
}

export function Demos(){


  return(
    <>
      <Page title="Demos">
        <LinkCard/>
      </Page>
    </>
  )
}

