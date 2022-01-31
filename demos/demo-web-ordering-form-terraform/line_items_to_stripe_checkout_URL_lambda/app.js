'use strict';

let stripeLib = require('pos').stripeLib

exports.handler = async (event, context, callback) => {
  console.log("Hello world")
  console.log(event)
  let session = await stripeLib.makeOrder({
    stripeKey: 'sk_test_hQLIUEVv5u9fDAgZeTmnIaZY', 
    lineItems: event.lineItems,
    successURL: event.successPage, 
    cancelURL: event.cancelPage 
  })
  return {checkoutURL: session.url, event: event}
};
