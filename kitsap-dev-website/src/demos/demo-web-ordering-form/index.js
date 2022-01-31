import * as React from 'react';
import { styled } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';

/*  TODO:
  * When you add to order, some kind of Toast that alerts you that you can checkout below
  * Show price in the line items
  * Sort line items by price 
  * Show total price
  * Add new products to test Stripe acct
  * Comments section before order button
  * Personal details section (deliver/takeout, address, phone, email, name)
  * Order now button that takes you to Stripe
  * When customer returns from Stripe, a success page
  *  */

//TODO: Should we look this up via an API gateway call? Or should we have this in some JSON file?
function lookupStripePriceByName(n){
  switch (n) {
    case "Pepperoni Pizza - 10 inches":
      return 'price_0KMh6T7hDggklt0HSHAXx4An';
    case "Pepperoni Pizza - 14 inches":
      return 'price_0KMgyf7hDggklt0HcdYom3RF';
    case "Pepperoni Pizza - 18 inches":
      return 'price_0KMh7M7hDggklt0HmC25Dx6T';
  }
}

function stripify(items){
  return items.map(i=>{
    return { price: lookupStripePriceByName(i.name),
      quantity: i.quantity }})
}

//Count # of items with same name
//[{Name: ..., Price: ...}] => [{Name: ..., Quantity: ..., Price: ...}]
function coalesce(items){
  let counts = {}; //{"Pepperoni Pizza - 10 inches": {quantity: 2, price: 9.99, name: "Pepperoni Pizza - 10 inches"}, ...}
  for(let i of items){
    if(counts[i.name]){
      counts[i.name].quantity++
    } else{
      counts[i.name] = {name:i.name, price:i.price, quantity:1}
    }
  }

  return Object.values(counts)
}

function QuantitySelector(props) {

  return (
    <ButtonGroup size="small" aria-label="small outlined button group">
      <Button onClick={props.onMinusClicked}>-</Button>
      <Button style={{color: "black", borderColor: "black"}} disabled>{props.quantity}</Button>
      <Button onClick={props.onPlusClicked}>+</Button>
    </ButtonGroup>
  );
}
  
function MenuItemCard(props){
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const name = "Pepperoni Pizza"
  const price = (pizzaSize) => {
    switch (pizzaSize) {
      case 10:
        return 9.99;
      case 14:
        return 12.99;
      case 18:
        return 15.99;
    }
  }
  const [pizzaSize, setPizzaSize] = useState(10);

  const handleChange = (event) => {
    setPizzaSize(event.target.value);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

  return(
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="194"
        image="/demo-images/pepperoni-pizza.jpeg"
        alt="Pepperoni Pizza"
      />
      <CardContent>
        <Typography variant="h6">{name}</Typography>
        <Typography variant="body2" color="text.secondary">
          This pepperoni pizza is perfecto!
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={pizzaSize}
              label="Size of Pizza"
              onChange={handleChange}
              style={{height: 35}}
            >
              <MenuItem value={10}>10 inch</MenuItem>
              <MenuItem value={14}>14 inch</MenuItem>
              <MenuItem value={18}>18 inch</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={6}>
            <Button variant="text" onClick={()=>{
              props.addToCart({name: name + " - " + pizzaSize + " inches", price: price(pizzaSize)})
              setSnackbarOpen(true) 
            }}><ShoppingCartIcon/> Add to Order</Button>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                This is a success message!
              </Alert>
            </Snackbar>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  )
}

function CartLineItem(props){


  return(
    <>
      <li>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={5}>
            {props.name}
          </Grid>
          <Grid item xs={3}>
            <QuantitySelector quantity={props.quantity} 
              onPlusClicked={()=>props.addByName(props.name)}
              onMinusClicked={()=>props.removeByName(props.name)}
            />
          </Grid>
          <Grid item xs={3}>
            <IconButton color="primary" aria-label="remove line item from cart" component="span"
              onClick={()=>props.removeByName(props.name, {all: true})}>
              <DeleteIcon /> 
            </IconButton>
          </Grid>
        </Grid>
      </li>
    </>
  )
}

function Cart(props){

  return(
    <>
      {props.lineItems.length !== 0 ? 
        <>
          <h2>Cart</h2>
          <ul>
            {coalesce(props.lineItems).map(e=>{
              return <CartLineItem {...e} 
                key={e.name} 
                addByName={props.addByName} 
                removeByName={props.removeByName}/>
            })}
          </ul>
        </>
        :""}
    </>
  )
}

function CheckoutButton(props){
  const [response, setResponse] = useState("");
  const [waiting, setWaiting] = useState(false);

  useEffect(()=>{
    if(response.checkoutURL) window.location = response.checkoutURL 
  },[response.checkoutURL])

  return(
    props.lineItems.length != 0?
      <>
        {waiting? <CircularProgress/>
        : <>
          {response.errorMessage? <Alert severity="error" style={{marginBottom: 10}}>{response.errorMessage}</Alert>:""}
            <Button variant="contained" onClick={()=>{ 
          setWaiting(true);
          fetch("https://xn7ikhkbbg.execute-api.us-west-1.amazonaws.com/prod/checkouts",
            { method:"POST", 
              body:JSON.stringify({ 
                lineItems: stripify(coalesce(props.lineItems)),
                successPage: "http://localhost:3000/demos/web-ordering-form/success",
                cancelPage: "http://localhost:3000/demos/web-ordering-form/cancel"
              })
            })
            .then((res) => res.json())
            .then((json) => {
              setResponse(json);
              setWaiting(false);
            })
        }}>
          Checkout</Button>
          </>}
      </>
    :""
  )
}

function CustomerInformation(){
  const [delivery, setDelivery] = useState(false);
 
 const handleDeliveryChange = (event) => {
    if(event.target.value == "Delivery"){
      setDelivery(true);
    }  
    if(event.target.value == "Pickup"){
      setDelivery(false);
    }  
  };

  return(
    <>
      <div style={{padding:10}}/>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Delivery or Pickup?</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="Pickup"
              name="radio-buttons-group"
              onChange={handleDeliveryChange}
            >
              <FormControlLabel value="Delivery" control={<Radio />} label="Delivery" />
              <FormControlLabel value="Pickup" control={<Radio />} label="Pickup" />
            </RadioGroup>
          </FormControl>
      <div>
        <FormControl style={{width:"100%"}}>
            <TextField
              id="customer-name-field"
              label="Your Name"
              autoComplete="name"
              variant="standard"
            />
            <TextField
              id="customer-phone-field"
              label="Your Phone #"
              autoComplete="mobile"
              variant="standard"
            />
          {delivery? <><TextField
            id="customer-address-line-1-field"
            label="Delivery Address Line 1"
            autoComplete="address-line1"
            variant="standard"
          />
            <TextField
              id="customer-address-line-2-field"
              label="Delivery Address Line 2"
              autoComplete="address-line2"
              variant="standard"
            /></>:""}
            <TextField
              style={{marginTop:15}}
              id=""
              label="Special Instructions"
              multiline
              rows={3}
            />
        </FormControl>
        </div>
      </>
  )
}

export function OrderForm(){
  const [cart,setCart] = useState([]);
  
  function addToCart(item){
    setCart((cart)=>cart.concat(item))
  }

  function addByName(n){
    setCart((cart)=>{
      let itemToDup = cart.find((item)=>item.name == n)
      return cart.concat(itemToDup)
    })
  }
  
  function removeByName(n, options){
    options = options || {all: false}
    if(options.all){
      setCart((cart)=>{
        let newCart = cart.filter((item)=>{
          return item.name !== n
        })
        return newCart
      })
    } 
    else{
      setCart((cart)=>{
        let indexToRemove = cart.findIndex((item)=>item.name == n)
        cart.splice(indexToRemove, 1)
        return [...cart]
      })
    }
  }

  return(
    <>
      <MenuItemCard addToCart={addToCart}/> 
      <Cart lineItems={cart} addByName={addByName} removeByName={removeByName}/>
      <CustomerInformation/>
      <CheckoutButton lineItems={cart}/>
    </>)
}
