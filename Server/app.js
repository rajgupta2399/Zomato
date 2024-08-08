require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(cors());

// Checkout API
app.post("/api/create-checkout-session", async (req, res) => {
  const { products } = req.body;

  try {
    const lineItems = products.map((product) => {
      const price = product.defaultPrice || product.price;

      const priceInPaise = parseInt(price, 10);

      if (isNaN(priceInPaise) || priceInPaise <= 0) {
        throw new Error(
          `Invalid price value for product ${product.name}: ${price}`
        );
      }

      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: product.name,
            images: [product.imageId],
          },
          unit_amount: priceInPaise,
        },
        quantity: 1, // Add a quantity field
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "https://swiggybyrk.netlify.app/orders",
      cancel_url: "https://swiggybyrk.netlify.app/orders",
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(7000, () => {
  console.log("Server started on port 7000");
});
