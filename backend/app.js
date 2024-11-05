import express from "express";
import prodects from "./data/product.json" assert { type: "json" };
import core from "cors";
import dotenv from 'dotenv';
import Stripe from "stripe";

const app = express();
app.use(core());
app.use(express.json());
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Replace with your Stripe secret key

app.post('/create-checkout-session', async (req, res) => {
    const { items } = req.body; // Get items from the client

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: items.map(item => ({
                price_data: {
                    currency: 'usd', // Replace with your currency
                    product_data: {
                        name: item.productTitle,
                        images: [item.productImage],
                    },
                    unit_amount: item.productPrice * 100, // Convert to cents
                },
                quantity: item.productQuentity,
            })),
            mode: 'payment',
            success_url: 'http://localhost:3000/success', // Replace with your success URL
            cancel_url: 'http://localhost:3000/failure', // Replace with your cancel URL
        });

        res.json({ id: session.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.get("/api/v1/products", (req, res) => {
  return res.status(200).json({ success: true, data: prodects });
});


app.get("/api/v1/product/:id", (req, res) => {
  const { id } = req.params;
  const product = prodects.find((item) => item.id === id);
  if (product) {
    res.status(200).json({ success: true, data: product });
  } else {
    res.status(404).json({ success: false, message: "Product not found" });
  }
});



export default app;
