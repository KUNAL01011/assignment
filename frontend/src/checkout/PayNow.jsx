import { loadStripe } from "@stripe/stripe-js";
import { useOrderContext } from "../context/orderContext"; // Import your context
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

const PayNow = () => {
  const navigate = useNavigate();
  const { order } = useOrderContext(); // Access the order from context
  console.log(STRIPE_PUBLISHABLE_KEY);
  const handleCheckout = async () => {
    const stripe = await stripePromise;

    const response = await fetch(
      "http://localhost:8000/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: [order] }), // Use order from context
      }
    );

    const session = await response.json();
    if (session.error) {
      console.error(session.error);
      return;
    }

    // Redirect to Stripe Checkout
    const result = await stripe.redirectToCheckout({ sessionId: session.id });
    if (result.error) {
      console.error(result.error.message);
    }
  };
  return (
    <div className="container mx-auto p-5">
      <h1 className="text-2xl font-bold mb-4">Checkout Page</h1>
      <div className="bg-white shadow-md rounded-md p-4 mb-6">
        <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
        <div className="flex items-center mb-4">
          <img
            src={order.productImage}
            alt={order.productTitle}
            className="w-24 h-24 object-cover rounded-md"
          />
          <div className="ml-4">
            <p className="text-lg font-semibold">{order.productTitle}</p>
            <p className="text-gray-600">Size: {order.productSize}</p>
            <p className="text-gray-600">Price: ${order.productPrice}</p>
            <p className="text-gray-400 line-through">
              ${order.productDisPrice}
            </p>
            <p className="text-green-600 font-semibold">
              {order.productDisc}% off
            </p>
          </div>
        </div>
      </div>
      <button
        onClick={handleCheckout}
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
      >
        Pay Now
      </button>
    </div>
  );
};

export default PayNow;
