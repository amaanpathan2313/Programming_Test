
const express = require('express');
const connectDataBase = require('./configs/db.config');
require('dotenv').config() 

const app = express();

app.use(express.json());

connectDataBase();   // Data base connection function


// ---- Routes  -------

app.get('/test', (req, res) => {
    res.status(200).json({msg : "I am Test Route"})
});





app.use((req, res) => {
    res.status(404).json({msg : "Page Not Found ! "})
})

// ---- Routes  -------


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server Start on PORT ${PORT}`);
})