const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log("➡️ GLOBAL LOGGER:", req.method, req.originalUrl);
  next();
});

app.get("/", (req, res) => {
  console.log("🏠 Root route hit");
  res.send("MyIdolo API is live");
});



app.use("/api/items", require("./routes/itemRoutes"));

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
