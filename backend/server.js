import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";
import path from "path";

dotenv.config();

const app = express();

// to make PORT dynamic
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

// middleware is the func that runs before we send res back to client
// allows us to accept Json data in the req.body
app.use(express.json());

app.use("/api/products", productRoutes);

// Typically, the value of NODE_ENV is set to "production" when we deploy our app
if (process.env.NODE_ENV === "production") {
  // In production mode, this line tells the Express server to serve the React app's static files from the /frontend/dist directory.
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  // this setup allows the server to serve the static files of the React app in production and ensures that client-side routing works properly by always serving the index.html file.
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

// console.log(process.env.MONGO_URI);

app.listen(PORT, () => {
  connectDB(); // connecting DB to access schema
  console.log("Server started at http://localhost:" + PORT);
});
