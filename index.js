const express1 = require('express');
const router1 = require('./routes/router.js').router;
const bodyParser = require("body-parser")
const app = express1();
const PORT = 5700;
app.use(bodyParser());
//app.use(express.json())// instead of body parser
app.use("/user", router1)
app.listen(PORT, (req, res) => {
    console.log(`the server running on ${PORT}`)
});