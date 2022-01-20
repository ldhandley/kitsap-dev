async function makeOrder({lineItems, stripeKey, successURL, cancelURL}){
  const stripe = require('stripe')(stripeKey);
  
  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: 'payment',
    success_url: successURL,
    cancel_url: cancelURL,
  });
  return session;
}

module.exports = { makeOrder }
