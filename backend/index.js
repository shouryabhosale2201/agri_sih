const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const connectDB = require('./db');
const rootRouter = require('./Routes/index');

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

connectDB();

app.use("/api", rootRouter);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
