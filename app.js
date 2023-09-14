const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const bookRoute = require("./routes/bookRoute");
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const walletRoute = require("./routes/walletRoute");
const databaseConnection = require("./config/database");

dotenv.config();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/book", bookRoute);
app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/wallet", walletRoute);

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).send({ message: "Invaild JSON Format" });
  }
});
app.use((req, res) => {
  return res.status(400).send({ message: "Bad Request" });
});
databaseConnection(() => {
  app.listen(8000, () => {
    console.log("Server is running on 8000 port");
  });
});
