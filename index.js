const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./files/routes");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

const MONGO_URL = process.env.MONGO_URL || "mongodb+srv://ari:nmmt@nmmt.urolb.mongodb.net/?retryWrites=true&w=majority&appName=nmmt";
mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use(bodyParser.json());
const corsOpts = {
  origin: "*",

  methods: ["GET", "POST"],

  allowedHeaders: ["Content-Type"],
};
const port = process.env.PORT || 3000;
app.use(cors(corsOpts));
app.use("/", routes);

app.listen(port, () => {
  console.log("Server started on port 3000" + port);
});
