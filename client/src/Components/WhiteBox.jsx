import "./WhiteBox.css";

function WhiteBox(props) {
  let text = props.str;
  let senti = props.senti;

  let sentimentClass = "";
  if (senti !== "NA") {
    if (senti === "Very Negative") {
      sentimentClass = "very-negative";
    } else if (senti === "Negative") {
      sentimentClass = "negative";
    } else if (senti === "Somewhat Negative") {
      sentimentClass = "somewhat-negative";
    } else if (senti === "Slightly Negative") {
      sentimentClass = "slightly-negative";
    } else if (senti === "Neutral") {
      sentimentClass = "neutral";
    } else if (senti === "Slightly Positive") {
      sentimentClass = "slightly-positive";
    } else if (senti === "Somewhat Positive") {
      sentimentClass = "somewhat-positive";
    } else if (senti === "Positive") {
      sentimentClass = "positive";
    } else if (senti === "Very Positive") {
      sentimentClass = "very-positive";
    }
  }

  return (
    <div className="whitebox">
      {text}
      <div className={`${sentimentClass} se`}>
        {senti !== "NA" ? `${senti}` : ""}
      </div>
    </div>
  );
}

export default WhiteBox;
