import React, { useEffect, useState } from "react";
import "./App.css";
import Tweet from "./Components/Tweet";
// import twitterLogo from "./twitter.svg
import twitterLogo from "./icons8-twitter.svg";
// import sentiment from "sentiment";
import Sentiment from "sentiment";

function App() {
  const [bdata, setBData] = useState([]);
  const [senti, setSenti] = useState([]);

  useEffect(() => {
    const tweets = document.querySelectorAll(".tweet");
    const button = document.querySelector("button");
    tweets.forEach((tweet, index) => {
      setTimeout(() => {
        tweet.classList.add("show");
      }, 100 * index);

      button.classList.remove("hidden");
    });
  }, [bdata]);

  useEffect(() => {
    fetch("http://localhost:8080/")
      .then(response => response.json())
      .then(data => setBData(data));
  }, []);

  const performSentimentAnalysis = event => {
    const sentimentToEmotionMap = new Map([
      [-5, "Very Negative"],
      [-4, "Negative"],
      [-3, "Somewhat Negative"],
      [-2, "Slightly Negative"],
      [-1, "Slightly Negative"],
      [0, "Neutral"],
      [1, "Slightly Positive"],
      [2, "Slightly Positive"],
      [3, "Somewhat Positive"],
      [4, "Positive"],
      [5, "Very Positive"],
    ]);
    const sentiment = new Sentiment();
    const sentiments = bdata
      .map(tweet => sentiment.analyze(tweet.text).score)
      .map(sc => {
        if (sc > 5) {
          return 5;
        } else if (sc < -5) {
          return -5;
        } else {
          return sc;
        }
      })
      .map(sc => sentimentToEmotionMap.get(sc));
    // .map(sc => sentimentToEmotionMap.get(sc));
    setSenti(sentiments);
  };

  return (
    <div>
      <h1>
        Hey Rohil! Would you like to see a collection of your favorite tweets
        <img src={twitterLogo} alt="" className="twitter-logo" />?
      </h1>
      <div className="container">
        {bdata.map((tweet, idx) => (
          <Tweet str={tweet.text} senti={senti[idx] ?? "NA"} />
        ))}
      </div>
      <button className="hidden" onClick={performSentimentAnalysis}>
        Analyse
      </button>
    </div>
  );
}

export default App;
