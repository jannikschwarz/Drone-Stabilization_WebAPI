const { getFirestore, doc, getDoc, collection, addDoc } = require("firebase/firestore")
let db; 

function initializeDB(app){
    db = getFirestore(app);
}

async function checkDeviceID(drone){
    const deviceRef = doc(db,'Drones', drone.deviceID);
    const userDoc = await getDoc(deviceRef);
    return !userDoc;
}

async function sendSessionData(sessionData, deviceId, sessionId){
    addDoc(collection(db,`Runs/${deviceId}/${sessionId}`),sessionData).then(collectionRef => {console.log("Document has been added successfully")})
}

module.exports = {
    checkDeviceID,
    sendSessionData,
    initializeDB
}