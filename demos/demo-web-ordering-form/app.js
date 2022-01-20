'use strict';

let stripeLib = require('pos').stripeLib

exports.handler = (event, context, callback) => {
  console.log("Hello world")
  let sessionPromise = makeOrder({
    stripeKey: 'sk_test_hQLIUEVv5u9fDAgZeTmnIaZY', 
    lineItems:[
      {
        price: 'price_0KK7zr7hDggklt0HELzc4Wq1',
        quantity: 1,
      }
    ],
    successURL: 'https://kitsapdev.com/success', 
    cancelURL: 'https://kitsapdev.com/cancel'
  })
  sessionPromise.then((s)=>{
    console.log(s.url)
  })
};
