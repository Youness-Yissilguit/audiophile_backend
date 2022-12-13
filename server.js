require('dotenv').config();//.env configuration file
const express = require('express');
const bodyParaer = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const DB_URL = '';


//routes
const productRouter = require('./routes/productsRouter');
const registerRouter = require('./routes/regiserRouter');
const usersRouter = require('./routes/UsersRouter');

//start the Express app
const app = express();



// get data to calculate
let calculatedDAta = {};

// starting the server
app.listen(process.env.PORT || 3000, () => {
  console.log('listening on port 3000...');
});

//static folder for produxt images
app.use('/assets', express.static('./assets'));

//parse URL-encoded (sent by HTML forms)
app.use(express.urlencoded({extended: false}))
app.use(express.json())

// adding Helmet to enhance your Rest API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParaer.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

//call routers
app.use('/products', productRouter);
app.use('/authentification',registerRouter);
app.use('/profil', usersRouter);


//error 404 
app.use((request, res)=>{
  res.status(404).send({
    message: 'Not found !'
 });
})