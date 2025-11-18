// backend/index.js
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

// parse JSON bodies
app.use(express.json());

// simple request logger
app.use((req, res, next) => {
  console.log(new Date().toISOString(), req.method, req.url);
  next();
});

// GET endpoint
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from backend 🚀", timestamp: new Date().toISOString() });
});

// POST echo endpoint
app.post("/api/echo", (req, res) => {
  // echo back what the client sent
  res.json({
    youSent: req.body,
    receivedAt: new Date().toISOString()
  });
});

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
