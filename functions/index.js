// functions/index.js
const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const stripe = require("stripe")(process.env.STRIPE_KEY);

const app = express();

// Allow CORS from any origin
app.use(cors({ origin: true }));
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  return res.status(200).json({ message: "Hello from Firebase!" });
});

// Create Stripe PaymentIntent
app.post("/payment/create", async (req, res) => {
  const total = Number(req.body.total); // ✅ FIXED: use body

  if (!total || total <= 0) {
    return res.status(400).json({ message: "Invalid total amount" });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total, // already in cents from frontend
      currency: "usd",
    });

    logger.info("PaymentIntent created:", paymentIntent.id);

    res.status(201).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    logger.error("Stripe error:", error);
    res.status(500).json({ message: "Payment failed", error: error.message });
  }
});

// Export the app as a Firebase Function
exports.api = onRequest(app);
