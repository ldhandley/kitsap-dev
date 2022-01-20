'use strict';

let stripeLib = require('pos').stripeLib

exports.handler = async (event, context, callback) => {
  console.log("Hello world")
  let session = await stripeLib.makeOrder({
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
  return session.url
};
