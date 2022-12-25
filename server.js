const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const logger = require("morgan");
const path = require("path");
const connectDB = require("./config/dbConnect");

//Logger
app.use(logger("dev"));

//BodyParser
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

//CORS
app.use(cors());

//.env
dotenv.config();

// app.use('/', express.static(path.join(__dirname, 'public')))
// app.use('/', require('./ROUTES/root'))

// app.get("/api", (req, res) => {
//   res.json({ msg: "api running..." });
// });


//Routes
app.use("/api/auth", require("./routes/authRoute")); //Auth Api
app.use("/api/user", require("./routes/userRoute")); //User Api
app.use("/api/card", require("./routes/cardRoute")); //Card Api
app.use("/api/order", require("./routes/orderRoutes")); //Order Api
app.use("/api/billing", require("./routes/billingRoute")); //Billing Api
app.use("/api/admin", require("./routes/adminRoute")); //Admin Api

//Connect to DB.
connectDB();

//static files
app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

//PORT
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server running at port:${port}`);
});
