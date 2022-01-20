let makeOrder = require('../lib/stripe-lib.js').makeOrder

test('make order returns a valid session', async () => {
  let session = await makeOrder({
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
  expect(session.url).toContain('https://checkout.stripe.com');
});
