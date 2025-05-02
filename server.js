const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");

dotenv.config();

const app = express();

// Middleware
// ... existing code ...
// ... existing code ...
app.use(cors({
  origin: ["https://may1f-q1d7.vercel.app", "https://may1f-q1d7-7cu15vpe3-chetan-chouhans-projects-82c4218d.vercel.app"],
  credentials: true
}));
// ... existing code ...
// ... existing code ...
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
// ... existing code ...
const PORT = process.env.PORT || 5000;
// ... existing code ...

// Connect DB and Start Server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("MongoDB connected");
  app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
})
.catch((err) => console.error("DB connection error:", err));
