require("dotenv").config();
const express = require('express')
const cors = require("cors");

const app = express()

const morgan = require('morgan')
const path = require('path')

// const list = [];

const PORT = process.env.PORT ?? 3000;

app.use(morgan('dev'))

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/api", (req, res) => {
 res.json();
});




app.listen(PORT, () => {
 console.log(`server started  ${PORT} Порту`)
})
