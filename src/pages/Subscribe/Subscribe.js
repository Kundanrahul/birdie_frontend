import React, { useState ,useEffect} from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import './Subscribe.css';
import Tweetbox from '../Feed/Tweetbox/Tweetbox';

const stripePromise = loadStripe('pk_test_51MwUmJSHmLjlSeIkJ5O22SWHhCi7bGaezSewMOfIfZ18NuLz3V2uizTUhMUJ5XME0TjaYhVcOMwqiyVENWVDKF5U00aOGii2jl');

const PaymentForm = ({ name, description, amount, currency, isSubscribed, setSubscriptionPlan, handlePaymentSuccess }) => {
  const [paymentError, setPaymentError] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [paymentProcessed, setPaymentProcessed] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const storedSubscriptionPlan = localStorage.getItem('subscriptionPlan');
    if (storedSubscriptionPlan) {
      setSubscriptionPlan(storedSubscriptionPlan);
    }
  }, [setSubscriptionPlan]);

  const handlePayment = async () => {
    
    try {
      const { paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
      });
  
      const response = await fetch('https://birdie-backend-ux74.onrender.com/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          payment_method: paymentMethod.id,
          amount,
          currency,
        }),
      });
  
      const { clientSecret } = await response.json();
  
      const confirmResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });
  
    if (confirmResult.paymentIntent.status === 'succeeded') {
        const selectedPlan = name.toLowerCase();
        setSubscriptionPlan(selectedPlan);
        localStorage.setItem('subscriptionPlan', selectedPlan);
        setPaymentStatus('succeeded');
        setPaymentProcessed(true); 
        handlePaymentSuccess();
      }
    } catch (error) {
      console.error(error.message);
      setPaymentError('Refresh and Please try again.');
      setPaymentStatus('failed');
      setPaymentProcessed(false);
    }
  };
  return (
    <div className="payment-form">
      {!isSubscribed ? (
        <div className={`premium-verification`}>
          <h2>{name}</h2>
          <ul>
            <li>{description}</li>
          </ul>
          {name !== 'free' && <CardElement />}
          {name !== 'free' && (
            <button
              onClick={handlePayment}
              className={`pay-now-button`}
              disabled={isSubscribed}
            >
              {`${currency} ${amount}`}
            </button>
          )}
          {paymentError && <p className="error-message">{paymentError}</p>}
          {paymentStatus === 'succeeded' && <p className="success-message">Payment succeeded!</p>}
        </div>
      ) : (
        <div className={`premium-verification subscribed`}>
          <h2>{name}</h2>
          <ul>
            <li>{description}</li>
          </ul>
          <button className={`pay-now-button subscribed`} disabled={true}>
            Subscribed
          </button>
          {paymentStatus === 'succeeded' && <p className="success-message">Payment succeeded!</p>}
        </div>
      )}
    </div>
    );
  };


const Subscribe = () => {
  const storedSubscriptionPlan = localStorage.getItem('subscriptionPlan') || 'free';
  const storedPaymentProcessed = localStorage.getItem('paymentProcessed') === 'true';
  
  const [subscriptionPlan, setSubscriptionPlan] = useState(storedSubscriptionPlan);
  const [paymentProcessed, setPaymentProcessed] = useState(storedPaymentProcessed);
  console.log('subscriptionPlan in subscribe:', subscriptionPlan);

  useEffect(() => {
    localStorage.setItem('subscriptionPlan', subscriptionPlan);
    localStorage.setItem('paymentProcessed', paymentProcessed);
  }, [subscriptionPlan, paymentProcessed]);

  return (
    <div className="subscribe-container">
      <Elements stripe={stripePromise}>
        <PaymentForm
          name="premium"
          description={
            <>
          •Exclusive badge <br />•Additional benefits <br />•Growth and insight Tips
          </>}
          amount={799}
          buttonText="₹"
          currency="inr"
          subscriptionPlan={subscriptionPlan}
          isSubscribed={subscriptionPlan === 'premium' && paymentProcessed}
          setSubscriptionPlan={setSubscriptionPlan}
          setPaymentProcessed={setPaymentProcessed} 
          handlePaymentSuccess={() => {
            setPaymentProcessed(true);
            localStorage.setItem('paymentProcessed', true);
          }} 
          />
      </Elements>

      <div className="row-container">
        <Elements stripe={stripePromise}>
          <PaymentForm
            name="free"
            description={
              <>
            •1 tweet per day 
            </>}
            amount={0}
            buttonText="₹"
            currency="inr"
            subscriptionPlan={subscriptionPlan}
            isSubscribed={subscriptionPlan === 'free' && !paymentProcessed}
            setSubscriptionPlan={setSubscriptionPlan}
            setPaymentProcessed={setPaymentProcessed} 
            handlePaymentSuccess={() => {
            setPaymentProcessed(true);
            localStorage.setItem('paymentProcessed', true);
            }}
          />
        </Elements>
        <Elements stripe={stripePromise}>
          <PaymentForm
            name="silver"
            description={
              <>
            •5 Tweets per day <br />•24/7 Customer Support  <br />•Growth and insight Tips
            </>}
            currency="inr"
            amount={100}
            buttonText="₹"
            subscriptionPlan={subscriptionPlan}
            isSubscribed={subscriptionPlan === 'silver' && paymentProcessed}
            setSubscriptionPlan={setSubscriptionPlan}
            setPaymentProcessed={setPaymentProcessed} 
            handlePaymentSuccess={() => {
              setPaymentProcessed(true);
              localStorage.setItem('paymentProcessed', true);
            }} 
          />
        </Elements>
        <Elements stripe={stripePromise}>
          <PaymentForm
            name="gold"
            description={
              <>
            •Unlimited tweets <br />•24/7 customer support<br/>•No ads and exclusive offs
            </>}
            amount={1000}
            buttonText="₹"
            currency="inr"
            subscriptionPlan={subscriptionPlan}
            isSubscribed={subscriptionPlan === 'gold' && paymentProcessed}
            setSubscriptionPlan={setSubscriptionPlan}
            setPaymentProcessed={setPaymentProcessed} 
            handlePaymentSuccess={() => {
              setPaymentProcessed(true);
              localStorage.setItem('paymentProcessed', true);
            }}
          />
        </Elements>
         {!paymentProcessed &&(
          <div class="card">
          <div class="success-message">
             you are on free plan,upgarde for benefits
           </div>
           </div>
         )}

        {paymentProcessed && (
         <div class="card">
         <div class="success-message">
           You are subscribed to {subscriptionPlan} plan!
         </div>
         <div class="green-tick">✔️</div>
       </div>
      )}
      </div>

    </div>
  );
};

export default Subscribe;

