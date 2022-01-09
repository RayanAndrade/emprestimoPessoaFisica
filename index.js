const express = require('express');
const app = express();
app.use(function (req, res, next) {
    // Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType, Content-Type, Accept, Authorization, tokenacesso, tokenEmail");
    next();
});

require("dotenv").config();
app.use(express.json());

const router = require('./src/routes')
router(app);

// require('./src/jobs/log')
const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
    console.log(`API teste técnico letalk iniciada na porta ${PORT}!`)
})