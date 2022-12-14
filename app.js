const bodyParser = require('body-parser')
const morgan = require('morgan')
const express = require('express')
const cors = require('cors')
const fs = require('fs');
const {runSession, startSession, addDroneCall, initializeRun} = require('./routes/run.js')
const { initializeApp } = require('firebase/app')
require('dotenv').config()

async function initialize(){
    const projectId = 'drone-stabilization';
    const firebaseConfig = {
      apiKey: process.env.API_KEY,
      authDomain: `${projectId}.firebaseapp.com`,
      projectId: projectId,
      storageBucket: `${projectId}.appspot.com`,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
      measurementId: process.env.MEASUREMENT_ID,
      databaseURL: `https://${projectId}.eur3.firebasedatabase.app`,
  };
  const firebaseApp = initializeApp(firebaseConfig);
  await initializeRun(firebaseApp);
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
app.post('/run', runSession);

app.post('/run/start', startSession);

app.get('/docs', (req, res) => {
  console.log('alright')
  try {
    const data = fs.readFileSync('./openapi.yaml', 'utf8');
    console.log('good')
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send("Unable to get docs");
  }
});

//Instantiate 
initialize().then(() => {
    // Listen
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });
