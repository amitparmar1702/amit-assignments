const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routs/authRoutes'); 
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4545;

app.use(bodyparser.json());
app.use(cors());

app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Home page is running');
});


  app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
  });
