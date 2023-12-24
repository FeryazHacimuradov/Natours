/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alert';
let stripe;

function initStripe() {
  loadStripeJs(function () {
    stripe = Stripe(
      'pk_test_51NmAO0HDYTo3YXlYClQTeaLKfayjCFpHbowVNl31reO36slAzSDGHTTTum50LTObOCMpVqT83BX0WtVJWEsigEF900WbsNmtOr'
    );
  });
}

function loadStripeJs(callback) {
  var script = document.createElement('script');
  script.src = 'https://js.stripe.com/v3/';
  script.onload = callback;
  script.onerror = function () {
    console.error('Error loading Stripe.js');
  };
  document.head.appendChild(script);
}

// Call the initialization function
initStripe();

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    // console.log(session);

    // 2) Create checkout form + chanre credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
