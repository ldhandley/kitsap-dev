'use strict';

let stripeLib = require('pos').stripeLib

exports.handler = async (event, context, callback) => {
  console.log("Hello world")
  console.log(event)
  let session = await stripeLib.makeOrder({
    stripeKey: 'sk_test_hQLIUEVv5u9fDAgZeTmnIaZY', 
    lineItems: event.lineItems,
    successURL: 'https://kitsapdev.com/success', 
    cancelURL: 'https://kitsapdev.com/cancel'
  })
  return {checkoutURL: session.url, event: event}
};
