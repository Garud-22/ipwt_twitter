import "./Tweet.css";
import WhiteBox from "./WhiteBox";

function Tweet(props) {
  let text = props.str;
  let senti = props.senti;
  return (
    <div className="tweet">
      <WhiteBox str={text} senti={senti} />
    </div>
  );
}

export default Tweet;
