import React from "react";
import { useHistory } from "react-router";
import { getMessage } from "../messages";

function Result(count, titleIndex, settitleIndex) {
  const history = useHistory();

  const handleNextQuizClicked = () => {
    if (count.titleIndex < count.totalTopics - 1) {
      count.settitleIndex(count.titleIndex + 1);
      history.push("/");
    } else {
      count.settitleIndex(0);
      history.push("/");
    }
  };

  return (
    <div>
      <header>
        <div className="questionTitle">{count.title}</div>
      </header>
      <div className="mainBody">
        <h3>
          You got {count.count} of {count.questionsEle.length} question right.
        </h3>
        <h1>{getMessage()}</h1>
      </div>
      <button onClick={handleNextQuizClicked}>Next Quiz</button>
    </div>
  );
}

export default Result;
