const bodyParser = require('body-parser')
const morgan = require('morgan')
const express = require('express')

async function initialize(){
    const projectId = '';
}

const app = express();
const PORT = process.env.PORT || 8080;

//Middleware to pass json body types in request 
const jsonParser = bodyParser.json();

//Morgan token for use and custom tokens, used a logging 


//Route 
//Run route 

//Instantiate 
initialize().then(() => {
    // Listen
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });