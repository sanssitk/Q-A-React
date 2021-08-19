import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useEffect, useState } from "react";
import { quizzes } from "./quizzes";
import QuestionModal from "./components/QuestionModal";
import Result from "./components/Result";

function App() {
  const [totalTopics, setTotalTopics] = useState(quizzes.length);
  const [titleIndex, settitleIndex] = useState(0);
  const [title, setTitle] = useState();
  const [questionsEle, setquestionsEle] = useState();
  const [count, setCount] = useState(0);

  useEffect(() => {
    setTitle(quizzes[titleIndex].title);
    setquestionsEle(quizzes[titleIndex].questions);
  }, [titleIndex]);

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/" exact>
            <header>
              <div className="questionTitle">{title}</div>
            </header>
            <QuestionModal
              questionsEle={questionsEle}
              titleIndex={titleIndex}
              settitleIndex={settitleIndex}
              count={count}
              setCount={setCount}
            />
          </Route>
          <Route path="/result">
            <Result
              count={count}
              title={title}
              questionsEle={questionsEle}
              settitleIndex={settitleIndex}
              titleIndex={titleIndex}
              totalTopics={totalTopics}
              setTotalTopics={setTotalTopics}
            />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
