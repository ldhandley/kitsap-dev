import * as React from 'react';
import { styled } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import {OrderForm} from "./demos/demo-web-ordering-form" 
import {Page,LinkCard} from "../Components/Page"
import Alert from '@mui/material/Alert';
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


export function Demos(){


  return(
      <Page title="Demos">
        <LinkCard link="/demos/web-ordering-form">
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
        </LinkCard>
      </Page>
  )
}

