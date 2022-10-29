const bodyParser = require('body-parser')
const morgan = require('morgan')
const express = require('express')
const cors = require('cors')
const {runSession} = require('./routes/run.js')

async function initialize(){
    const projectId = '';
}

const app = express();
const PORT = process.env.PORT || 8080;

//Middleware to pass json body types in request 
const jsonParser = bodyParser.json();
app.use(jsonParser);

//Morgan token for use and custom tokens, used a logging 
morgan.token('deviceId', (req) => req.body.deviceId);
morgan.token('deviceName', (req) => req.body.deviceName);
morgan.token('sessionId', (req) => req.body.sessionId);
morgan.token('temperature', (req) => req.body.temperature);
app.use(morgan('Status: status \n ResponseTime: :response-time ms \n DeviceID: :deviceId \n SessionID: :sessionId \n DeviceName: :deviceName'));
app.use(cors());

//Route 
//Run route 
app.post('/run', runSession)

//Instantiate 
initialize().then(() => {
    // Listen
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });