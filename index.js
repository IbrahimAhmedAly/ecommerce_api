const express = require("express");
const app = express();

const port = process.env.PORT || 8000;

const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Routes
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Db Connection Successful!!"))
  .catch((err) => console.log(err));

app.get("/api/test", () => {
  console.log("testing successful");
});

app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);

app.listen(port, () => {
  console.log("servier is running on port", port);
});
