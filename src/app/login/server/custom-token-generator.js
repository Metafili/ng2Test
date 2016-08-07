var firebase = require("firebase");

firebase.initializeApp({
    serviceAccount: "./ngfire2test-service-account.json",
    databaseURL: "https://vivid-torch-3052.firebaseio.com"
});

var uid = "hslee.edicon@gmail.com";
var customToken = firebase.auth().createCustomToken(uid);

console.log("Token: " + customToken );
