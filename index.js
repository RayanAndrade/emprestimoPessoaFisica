const express = require('express');
const app = express();
require("dotenv").config();

app.use(express.json());

const router = require('./src/routes')
router(app);

// require('./src/jobs/log')
const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
    console.log(`API teste técnico letalk iniciada na porta ${PORT}!`)
})