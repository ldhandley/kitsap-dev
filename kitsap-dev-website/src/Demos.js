import {OrderForm} from "./demos/demo-web-ordering-form" 
import {Page} from "./Components/Page"
import {Link} from "react-router-dom"
import Alert from '@mui/material/Alert';

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

export function Demos(){


  return(
    <>
      <Page title="Demos">
        <h2>Point of Sale Demo</h2>
        <Link to="/demos/web-ordering-form">
          Web Ordering Form Demo
        </Link>
      </Page>
    </>
  )
}

