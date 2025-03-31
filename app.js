import express from "express";
import connectDB from "./src/db/database.js";
import dotenv from "dotenv";
import cors from "cors";
import customerRoute from "./src/routes/customerRoutes.js";
import prodAuth from "./src/routes/productRoutes.js";
import webhookRouter from "./src/routes/webhookRoutes.js";
dotenv.config({
  path: "./.env",
});
const app = express();


// const uploaddata = multer();

app.use(express.json()); // For JSON data
app.use(express.urlencoded({ extended: true })); // For x-www-form-urlencoded
// app.use(uploaddata.none()); 

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Shopify-Hmac-Sha256"],
    credentials: false,
  })
);


app.use('/api/create', customerRoute);
app.use('/api/get', customerRoute);
app.use('/api/update', customerRoute);
app.use('/api/delete', customerRoute);
app.use('/api/get', prodAuth);
app.use('/api/create', prodAuth);

// webhooks API
app.use('/api/webhook', webhookRouter)


const PORT = process.env.BACKEND_PORT || 8000;

connectDB().

then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)));