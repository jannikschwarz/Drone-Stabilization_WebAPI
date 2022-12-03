const { getFirestore, doc, getDoc, collection, setDoc } = require("firebase/firestore");
const { getAuth, signInWithEmailAndPassword } = require("firebase/auth");

let db; 
let auth;
let timeStamp;
let currentTimeStamp;

function initializeDB(app){
    db = getFirestore(app);
    auth = getAuth(app);
    if(timeStamp === undefined) login();
}

async function checkDeviceID(drone){
    if(checkTimeStamp) login();
    const deviceRef = doc(db,'Drones', drone.deviceID);
    const userDoc = await getDoc(deviceRef);
    return !userDoc;
}

async function sendSessionData(sessionData, deviceId, sessionId){
    if(checkTimeStamp) login();
    const salt = Math.random();
    sessionId.timestamp
    await setDoc(doc(db,`Runs/${deviceId}/${sessionId}`, `${sessionData.timestamp}${salt}`), sessionData);

}

async function login(){
    try{
        const firebaseRep = await signInWithEmailAndPassword(auth, process.env.EMAIL, process.env.PASSWORD);
        timeStamp = firebaseRep.user.stsTokenManager.expirationTime;
        currentTimeStamp = Date.now();
    }catch (error){
        timeStamp = undefined;
    }
}

async function checkTimeStamp(){
    if(currentTimeStamp + 1800000 > timeStamp){
        return true;
    }
    return false;
}

module.exports = {
    checkDeviceID,
    sendSessionData,
    initializeDB
}
