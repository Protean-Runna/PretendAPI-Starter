const admin = require("firebase-admin");
require("dotenv").config();

// Admin configuration
// Just put all the important ids and keys in your .env
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKeyId: process.env.FIREBASE_PRIVATE_KEY_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"), // fix line breaks
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    clientId: process.env.FIREBASE_CLIENT_ID,
  }),
});
// Initialize Firestore DB here;
const db = admin.firestore();

// Collections will go here;
const Mockers = db.collection("mockProduct");


module.exports = {admin, db, Mockers};