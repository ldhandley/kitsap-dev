import { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Chip from '@mui/material/Chip';
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
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { format, add } from 'date-fns'

export function SimpleComponent(){
  const [text, setText] = useState("Goodbye...")

  function handleClick(e){
    setText("Hello")    
  }
  return(<p onClick={handleClick}>{text}</p>)
}

function userInputLooksLikeName(n){
  if(!n) 
    return {valid: false, errors: ["Name must be provided."]}
  if(n.length == 0)
    return {valid: false, errors: ["Name must be provided."]}
 
  return {valid: true, errors: []}
}

function userInputLooksLikePhone(p){
  if(!p) 
    return {valid: false, errors: ["Phone must be provided."]}
  if(p.replace(/\D/g,"").length < 10) 
    return {valid: false, errors: ["Phone number must be at least 10 digits long."]}
  if(p.replace(/[\d\-() ]/g,"").length > 0) 
    return {valid: false, errors: ["Phone number should only contain digits."]}
  return {valid: true, errors: []}
}

function userInputLooksLikeAddress(a){
  if(!a) 
    return {valid: false, errors: ["Address must be provided."]}
  if(a.length == 0)
    return {valid: false, errors: ["Address must be provided."]}
 
  return {valid: true, errors: []}
}

function stripify(items, prices){
  return items.map(i=>{
    return { price: prices[i.name],
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
      counts[i.name] = {...i, quantity:1}
    }
  }

  return Object.values(counts)
}

function QuantitySelector(props) {

  return (
    <ButtonGroup size="small">
      <Button onClick={props.onMinusClicked}>-</Button>
      <Button style={{color: "black", borderColor: "black"}} disabled>{props.quantity}</Button>
      <Button onClick={props.onPlusClicked}>+</Button>
    </ButtonGroup>
  );
}
 
export function MenuItemCard(props){
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  
  const handleClose = (event) => {
    setSnackbarOpen(false);
  };

  return(
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="194"
        image={props.image}
        alt={props.name}
      />
      <CardContent>
        <Typography variant="h6">{props.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          {props.description} 
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Grid container spacing={2}>
          <Grid item xs={6}>
          </Grid>
          <Grid item xs={6}>
            <Button variant="text" onClick={()=>{
              props.addToCart({name: props.name, price: props.price, image: props.image})
              setSnackbarOpen(true) 
            }}><ShoppingCartIcon/> Add 2 Order</Button>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                You've ordered an item! Scroll down when ready.
              </Alert>
            </Snackbar>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  )
}


export function MultiVariantMenuItemCard(props){
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(props.variants[0][0]);
  
  const handleChange = (event) => {
    setSelectedVariant(event.target.value);
  };

  const handleClose = (event) => {

    setSnackbarOpen(false);
  };

  return(
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="194"
        image={props.image}
        alt={props.name}
      />
      <CardContent>
        <Typography variant="h6">{props.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          {props.description} 
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedVariant}
              label={props.variationName}
              onChange={handleChange}
              style={{height: 35}}
            >
              {props.variants.map(e=>{
                return <MenuItem key={e[0]} value={e[0]}>{e[0]}</MenuItem>
              })}
            </Select>
          </Grid>
          <Grid item xs={6}>
            <Button variant="text" onClick={()=>{
              props.addToCart({name: props.name + " - " + selectedVariant, price: props.variants.find((e)=>e[0]==selectedVariant)[1], image: props.image})
              setSnackbarOpen(true) 
            }}><ShoppingCartIcon/> Add to Order</Button>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                You've ordered an item! Scroll down when ready.
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
      <div>
        <Grid container spacing={2} alignItems="center" justifyItems="center" className="cart-line-item">
          <Box sx={{ display: { xs: 'none', sm: 'block' }}}>
            <Grid item sm={2} >
              <img src={props.image} width="100%"/>
            </Grid>
          </Box>
          <Grid item xs={4} sm={4}>
            {props.name}
          </Grid>
          <Grid item xs={4} sm={4}>
            <QuantitySelector quantity={props.quantity} 
              onPlusClicked={()=>props.addByName(props.name)}
              onMinusClicked={()=>props.removeByName(props.name)}
            />
          </Grid>
          <Grid item xs={1} sm={2}>
           {"$" + props.price * props.quantity} 
          </Grid>
          <Grid item xs={1} sm={2}>
            <IconButton color="primary" aria-label="remove line item from cart" component="span"
              onClick={()=>props.removeByName(props.name, {all: true})}>
              <DeleteIcon /> 
            </IconButton>
          </Grid>
        </Grid>
      </div>
    </>
  )
}

export function Cart(props){
  

  return(
    <>
      {props.lineItems.length !== 0 ? 
        <>
          <h2>Order <Chip label={"Total: $" + props.lineItems.reduce((acc,current)=>{
        console.log(current)
        return current.price + acc
      }, 0).toFixed(2)} color="success" />
          </h2>
          <div>
          {coalesce(props.lineItems).map((e:any)=>{
            return <CartLineItem {...e} 
                key={e.name} 
                addByName={props.addByName} 
                removeByName={props.removeByName}/>
          })}
          </div>
      </>
        :""}
    </>
  )
}

export function CheckoutButton(props){
  const [response, setResponse] = useState({errorMessage:null, checkoutURL:null});
  const [waiting, setWaiting] = useState(false);

  useEffect(()=>{
    if(response.checkoutURL) window.location = response.checkoutURL 
  },[response.checkoutURL])

  return(
        waiting? <CircularProgress/>
        : <>
          {response.errorMessage? <Alert severity="error" style={{marginBottom: 10}}>{response.errorMessage}</Alert>:""}
          <Button variant="contained" disabled={props.disabled || props.lineItems.length === 0} onClick={()=>{ 
          setWaiting(true);
          fetch(props.serverlessCheckoutUrl,
            { method:"POST", 
              body:JSON.stringify({ 
                lineItems: stripify(coalesce(props.lineItems), props.prices),
                successPage: props.successPageUrl,
                cancelPage: props.cancelPageUrl,
                metadata: props.metadata || {}
              })
            })
            .then((res) => res.json())
            .then((json) => {
              setResponse(json);
              setWaiting(false);
            })
        }}>
          Checkout</Button>
          </>
  )
}

export function DeliveryPickupCustomerInformation(props){
  const [delivery, setDelivery] = useState(false);

  const isMetadataComplete = (metadata, delivery) => {
    if(delivery){
      if(userInputLooksLikeName(metadata.customerName).valid && 
        userInputLooksLikePhone(metadata.phone).valid && 
        userInputLooksLikeAddress(metadata.addressLine1).valid){
        props.setMetadataComplete(true);
      }
      else {
        props.setMetadataComplete(false);
      }
    }
    else{
      if(userInputLooksLikeName(metadata.customerName).valid && 
        userInputLooksLikePhone(metadata.phone).valid){
        props.setMetadataComplete(true);
      }
      else {
        props.setMetadataComplete(false);
      }
    }
  }

  const handleDeliveryChange = (event) => {
    if(event.target.value == "Delivery"){
      setDelivery(true);
      isMetadataComplete(props.metadata, true)
    }  
    if(event.target.value == "Pickup"){
      setDelivery(false);
      isMetadataComplete(props.metadata, false)
    }  
  };

  const fieldChanged = (field) => {
    return (e)=>{ 
      let metadata = {...props.metadata, [field]: e.target.value} 
      props.setMetadata(metadata)
      isMetadataComplete(metadata, delivery)
    }
  }

  const handleTimePicker = (value) => {
      let metadata = {...props.metadata, pickupTime: value} 
      props.setMetadata(metadata)
      isMetadataComplete(metadata, delivery)
  }

  const calculatePickupTime = (minutesTillPickup) => {
    return format(add(new Date(), {minutes: minutesTillPickup}), "h:mmaaa")
  }

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
            <div style={{padding: 10}}/>
          </FormControl>
      <div>
        {!delivery? 
          <>  
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <FormControl variant="standard" sx={{ width:"100%" }}>
                  <InputLabel>How Long Until Pickup?</InputLabel>
                  <Select
                    value={props.metadata.minutesTillPickup || 30}
                    label="Pickup in X Minutes"
                    onChange={fieldChanged("minutesTillPickup")}
                  >
                    <MenuItem value={30}>30 minutes</MenuItem>
                    <MenuItem value={45}>45 minutes</MenuItem>
                    <MenuItem value={60}>1 hour</MenuItem>
                    <MenuItem value={75}>1 hour 15 minutes</MenuItem>
                    <MenuItem value={90}>1 hour 30 minutes</MenuItem>
                    <MenuItem value={105}>1 hour 45 minutes</MenuItem>
                    <MenuItem value={120}>2 hours</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <p>Pickup at: <b>{calculatePickupTime(props.metadata.minutesTillPickup)}</b></p>
              </Grid>
              <Grid item xs={6}>
              </Grid>
            </Grid>
            <div style={{padding: 10}}/>
          </>
            : ""}
        <FormControl style={{width:"100%"}}>
            <TextField
              id="customer-name-field"
              label="Your Name"
              autoComplete="name"
              variant="standard"
              required
              onChange={fieldChanged("customerName")}
              helperText={props.metadata.customerName !== undefined && userInputLooksLikeName(props.metadata.customerName).errors[0]}
              error={props.metadata.customerName !== undefined && !userInputLooksLikeName(props.metadata.customerName).valid} 
            />
          <div style={{padding: 10}}/>
            <TextField
              id="customer-phone-field"
              label="Your Phone #"
              autoComplete="mobile"
              required
              variant="standard"
              onChange={fieldChanged("phone")}
              helperText={props.metadata.phone !== undefined && userInputLooksLikePhone(props.metadata.phone).errors[0]}
              error={props.metadata.phone !== undefined && !userInputLooksLikePhone(props.metadata.phone).valid} 
            />
          <div style={{padding: 10}}/>
          {delivery? <><TextField
            id="customer-address-line-1-field"
            label="Delivery Address Line 1"
            autoComplete="address-line1"
            required
            variant="standard"
              onChange={fieldChanged("addressLine1")}
              helperText={props.metadata.addressLine1 !== undefined && userInputLooksLikeAddress(props.metadata.addressLine1).errors[0]}
              error={props.metadata.addressLine1 !== undefined && !userInputLooksLikeAddress(props.metadata.addressLine1).valid} 
          />
          <div style={{padding: 10}}/>
            <TextField
              id="customer-address-line-2-field"
              label="Delivery Address Line 2"
              autoComplete="address-line2"
              variant="standard"
              onChange={fieldChanged("addressLine2")}
            /></>:""}
          <div style={{padding: 10}}/>
            <TextField
              style={{marginTop:15}}
              id=""
              label="Special Instructions"
              multiline
              rows={3}
              onChange={fieldChanged("specialInstructions")}
            />
        </FormControl>
        </div>
      </>
  )
}
