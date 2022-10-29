async function checkDeviceID(session){
    if(session.deviceId == "1234") return true;
    else return false;
}

async function sendSessionData(sessionData, deviceId){
}

module.exports = {
    checkDeviceID,
    sendSessionData
}