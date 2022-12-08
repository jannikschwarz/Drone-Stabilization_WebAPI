
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
    let sessionId;
    let deviceID;
    let sessionData;
    try {
        sessionId = req.body.sessionId;
        deviceID = req.body.deviceId;

        sessionData = {
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
    } catch (error) {
        res.status(400).send('Invalid data');
        return;
    }

    
    try{
        sessionData.timestamp = Date.now();
        await sendSessionData(sessionData, deviceID, sessionId);
        res.status(200);
        res.send();
    } catch(error){
        res.status(500);
        res.send(error.message);
        
    }
}

module.exports = {
    runSession,
    startSession,
    initializeRun
}
