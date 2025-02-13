const express = require("express");
const bodyParser = require("body-parser");
const sentimentRoutes = require("./src/routes/sentimentRoutes");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use("/api/sentiment", sentimentRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
