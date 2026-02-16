// import Stripe from 'stripe';

// To enable Stripe:
// 1. Install stripe: npm install stripe
// 2. Add STRIPE_SECRET_KEY to .env.local
// 3. Uncomment below

// export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: '2023-10-16',
// });

export const stripe = null;

/* Example Payment Intent:
   const paymentIntent = await stripe.paymentIntents.create({
     amount: 1000,
     currency: 'mxn',
   });
*/
