const express = require('express')
const app = express()
const dotenv = require('dotenv')
const cors = require('cors')
const PORT = 25000;
const foodRoutes = require('../backend/routs/routs')


dotenv.config();

app.use(cors());
app.use(express.json());


app.use('/api/foods', foodRoutes);

app.listen(PORT,(req,res)=>{
    console.log('your server is running on 25000')
})