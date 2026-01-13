const express = require("express");

const app = express();
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.get("/", (req, res) => {
  res.send("backend is running!");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
