import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

function QuestionModal({ questionsEle, count, setCount }) {
  const [options, setOptions] = useState();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const history = useHistory();

  const [selected, setSelected] = useState();
  const [correctAnswer, setCorrectAnswer] = useState();

  const randomOptions = (options) => {
    return options.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    setOptions(
      questionsEle &&
        randomOptions([
          questionsEle[currentQuestionIndex].correctAnswer,
          ...questionsEle[currentQuestionIndex].incorrectAnswers,
        ])
    );
    setCorrectAnswer(
      questionsEle && questionsEle[currentQuestionIndex].correctAnswer
    );
  }, [currentQuestionIndex, questionsEle]);

  const handleSelection = (option) => {
    if (selected === option && selected === correctAnswer) return "correct";
    else if (selected === option && selected !== correctAnswer)
      return "incorrect";
    else if (option === correctAnswer) return "correct";
  };

  const handleClickCheck = (option) => {
    setSelected(option);
    if (option === correctAnswer) setCount(count + 1);
  };

  const handleNextClicked = () => {
    if (questionsEle && currentQuestionIndex == questionsEle.length - 1) {
      history.push("/result");
    } else if (selected) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelected();
    }
  };

  return (
    <div className="mainBody">
      <div className="questionElement">
        <span>{questionsEle && questionsEle[currentQuestionIndex].text}</span>
      </div>
      <div className="questionOptions">
        {options &&
          options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleClickCheck(option)}
              className={`answerOption ${selected && handleSelection(option)}`}
              style={selected && { pointerEvents: "none" }}
            >
              <span>{String.fromCharCode(65 + index)}.</span>
              <button disabled={selected}>{option}</button>
            </div>
          ))}
      </div>

      {selected ? (
        <p>{selected == correctAnswer ? "correcct" : "incorrect"}</p>
      ) : (
        ""
      )}
      {selected ? (
        <div>
          <button onClick={handleNextClicked}>
            {questionsEle && currentQuestionIndex < questionsEle.length - 1
              ? "Next"
              : "Result"}
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default QuestionModal;
