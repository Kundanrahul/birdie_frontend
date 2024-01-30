// CardPage.js
import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51MwUmJSHmLjlSeIkJ5O22SWHhCi7bGaezSewMOfIfZ18NuLz3V2uizTUhMUJ5XME0TjaYhVcOMwqiyVENWVDKF5U00aOGii2jl');

const CardPage = ({ onStripeLoad }) => {
  return (
    <Elements stripe={stripePromise}>
      <div>
        <CardElement onReady={onStripeLoad} />
      </div>
    </Elements>
  );
};

export default CardPage;
