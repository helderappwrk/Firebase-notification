const express = require("express");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");

const app = express();
var cors = require('cors')

app.use(cors())
const serviceAccount = require("./firebase-adminsdk.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://notifications.firebaseio.com",
});

app.use(bodyParser.json());


const db = admin.firestore()

app.post("/push-notification", async (req, res) => {
    const {title, desc, token} = req.body;
    const message = {
        notification: {
          title: title, // Customize the title
          body: desc, // Customize the body
        },
        token: token // The device token
      };
  try {
    const response = await admin.messaging().send(message);
    res.status(200).send({
        data: response,
        message: "notification sent successfully"
    })
  } catch (error) {
    res.status(500).send({
        data: response,
        message: "Something went wrong"
    })
  }
});

app.listen(3003, () => {
  console.log("listening on port 3000");
});
