import * as React from 'react';
import { styled } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import {MultiVariantMenuItemCard, MenuItemCard, Cart, DeliveryPickupCustomerInformation, CheckoutButton} from 'pos-react'

let prices = 
  {
    "Pepperoni Pizza - 10 inches": 'price_0KMh6T7hDggklt0HSHAXx4An',
    "Pepperoni Pizza - 14 inches": 'price_0KMgyf7hDggklt0HcdYom3RF',
    "Pepperoni Pizza - 18 inches": 'price_0KMh7M7hDggklt0HmC25Dx6T',
    "Garlic Breadsticks": 'price_0KR2dU7hDggklt0HnGrAmCgW'
  }

export function OrderForm(){
  const [cart, setCart] = useState([]);
  const [metadata, setMetadata] = useState({minutesTillPickup:30});
  const [metadataComplete, setMetadataComplete] = useState(false);

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
      <Stack spacing={2} direction="row">
        <MultiVariantMenuItemCard 
          name={"Pepperoni Pizza"} 
          variationName={"Size of Pizza"} 
          variants={[["10 inches", 9.99], 
            ["14 inches", 12.99], 
            ["18 inches", 15.99]]} 
          image={"/demo-images/pepperoni-pizza.jpeg"} 
          description={"This pepperoni pizza is perfecto!"} 
          addToCart={addToCart}/> 
        <MenuItemCard 
          name={"Garlic Breadsticks"}
          image={"/demo-images/breadsticks.jpg"}
          description={"These garlic breadsticks hit the spot!"}
          price={8.99}
          addToCart={addToCart}/> 
      </Stack>
      <Cart 
        lineItems={cart} 
        addByName={addByName} 
        removeByName={removeByName}/>
      {cart.length === 0? "" : 
        <>
          <DeliveryPickupCustomerInformation 
            metadata={metadata} 
            setMetadata={setMetadata} 
            metadataComplete={metadataComplete} 
            setMetadataComplete={setMetadataComplete}/>
          <div style={{padding: 10}}/>
          <CheckoutButton 
            serverlessCheckoutUrl={"https://xn7ikhkbbg.execute-api.us-west-1.amazonaws.com/prod/checkouts"} 
            successPageUrl={"http://localhost:3000/demos/web-ordering-form/success"} 
            cancelPageUrl={"http://localhost:3000/demos/web-ordering-form/cancel"}
            lineItems={cart} 
            metadata={metadata} 
            prices={prices} 
            disabled={!metadataComplete}/>
        </>}
    </>)
}
