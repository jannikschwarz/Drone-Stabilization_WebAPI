
const {checkDeviceID,sendSessionData} = require('../lib/repository.js');
async function runSession(req, res){
    const session = {
        deviceId: req.body.deviceId,
        deviceName: req.body.deviceName, 
        sessionId: req.body.sessionId
    }

    const sessionData = {
        timestamp: req.body.timestamp,
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

    if(checkDeviceID(session)){
        try{
            await sendSessionData(sessionData, session.deviceId);
            res.status(200);
            res.send()
        }catch(error){
            res.status(400);
            res.send(error.message)
        }
    }else{
        res.status(401).send('Invalid DeviceID');
    }
}

module.exports = {
    runSession
}