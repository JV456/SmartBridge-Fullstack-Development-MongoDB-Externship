const express = require("express");
const mongoose = require('mongoose');
const userRouter = require("./routes/userRouter");
const categoryRouter = require("./routes/categoryRouter");
const errorHandler = require("./middlewares/errorHandlerMiddleware");
const transactionRouter = require("./routes/transactionRouter");
const cors = require("cors");
const app = express();

//!Connect to mongodb
mongoose
    .connect("mongodb+srv://:hNbi4pn7xZ0eN8dT@mern-expenses-cluster.dczyx8c.mongodb.net/mern-expenses?retryWrites=true&w=majority&appName=mern-expenses-cluster")
    .then(() => console.log('DB Connected'))
    .catch((e) => console.log(e));

//! Cors config
const corsOptions = {
  origin: ["http://localhost:5173"],
};
app.use(cors(corsOptions));

    //!Middlewares
    app.use(express.json()); // pass incoming json data

//!Routes
app.use("/", userRouter);
app.use("/", categoryRouter);
app.use("/", transactionRouter);

//! Error
app.use(errorHandler);


//! Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
  console.log(`Server is running on this port... ${PORT} `)
);
