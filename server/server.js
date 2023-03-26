"use strict";

const needle = require("needle");
require("dotenv").config();
const fs = require("fs");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8100;
// app.set("view engine", "ejs");
const token = process.env.BEARER_TOKEN;
const id = "853861815465512961";
const firebase = require("firebase/app");
const {
  getFirestore,
  collection,
  addDoc,
  // getDocs,
} = require("firebase/firestore/lite");

//Firebase cionfiguration
const firebaseConfig = {
  apiKey: "AIzaSyBHm1cqeyKpZmYj5T74MOpChAqC8n8pSo8",
  authDomain: "ipwt-twitter.firebaseapp.com",
  projectId: "ipwt-twitter",
  storageBucket: "ipwt-twitter.appspot.com",
  messagingSenderId: "1056384516678",
  appId: "1:1056384516678:web:afef0e92b0280aae38c047",
  measurementId: "G-KWJC2WBV3E"
};
//forebase initilaisation
const fire_app = firebase.initializeApp(firebaseConfig);
const db = getFirestore(fire_app);
const tweets = collection(db, "tweets");

//this function returns the tweets
async function getRequest() {
  // These are the parameters for the API request
  // by default, only the Tweet ID and text are returned
  const params = {
    // "tweet.fields": "lang,author_id", // Edit optional query parameters here
    // "user.fields": "profile_image_url", // Edit optional query parameters here
    max_results: "10",
  };

  const endpointURL = `https://api.twitter.com/2/users/${id}/liked_tweets`;

  // this is the HTTP header that adds bearer token authentication
  const res = await needle("get", endpointURL, params, {
    headers: {
      "User-Agent": "v2LikedTweetsJS",
      authorization: `Bearer ${token}`,
    },
  });

  if (res.body) {
    return res.body;
  } else {
    throw new Error("Unsuccessful request");
  }
}

function saveData(response) {
  response.forEach(async tweet => {
    await addDoc(tweets, {
      id: tweet.id,
      content: tweet.text,
    });
  });
}

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.get("/", (req, res) => {
  let response;
  (async () => {
    try {
      // Make request
      response = await getRequest();
      res.json(response["data"]);
      saveData(response.data);

      //   data = JSON.stringify(response);
      // console.log(data);
      // fs.writeFileSync("test.json", data);
      // fs.writeFileSync("data.json", response.json);
      //   res.render("index", { response });

      // saveData(response);

      // response["data"].forEach(tweet => {
      //   db.collection("tweets")
      //     .add({
      //       tweet: tweet.text,
      //     })
      //     .then(docRef => {
      //       console.log("Document written with ID:", docRef.id);
      //     })
      //     .catch(error => {
      //       console.error("Error adding document:", error);
      //     });
      // });
    } catch (e) {
      console.log(e);
    }
  })();
});

app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});
