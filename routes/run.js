
const {checkDeviceID,sendSessionData,initializeDB} = require('../lib/repository.js');

async function initializeRun(app){
    initializeDB(app);
}

async function startSession(req, res){
    const drone = {
        deviceID: req.body.deviceId,
        deviceName: req.body.deviceName
    }

    if(checkDeviceID(drone)){
        res.status(200);
        res.send();
    }else{
        res.status(401).send('Invalid DeviceID');
    }
}

async function runSession(req, res){
    const sessionId = req.body.sessionId;
    const deviceID = req.body.deviceId;

    const sessionData = {
        timestamp: '',
        temperature: req.body.temperature,
        location: {
            long: req.body.location.long,
            lat: req.body.location.lat
        },
        rotation: {
            x: req.body.rotation.x,
            y: req.body.rotation.y,
            z: req.body.rotation.z
        }
    }

    try{
        await sendSessionData(sessionData, deviceID, sessionId);
        res.status(200);
        res.send()
    }catch(error){
        res.status(400);
        res.send(error.message)
    }
}

module.exports = {
    runSession,
    startSession,
    initializeRun
}