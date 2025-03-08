const express = require("express");
const { default: mongoose } = require("mongoose");
const Contact = require("./route/contact");

let app = express();

let port = 8000;

app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/ContactBook", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Could not connect to MongoDB...", err));

app.use("/api/contactRoutes", Contact);

app.listen(port, () => {
  console.log(`Application listening on port ${port}`);
});
