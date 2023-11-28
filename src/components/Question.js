import { cleanup } from "@testing-library/react";
import React, { useEffect, useState } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);


  // Deliverables
  // When the Question component renders, create a side effect using useEffect
  useEffect(() => {
    // and use setTimeout to run a callback function after 1 second
    const countDown = setTimeout(() => {
      // Inside the callback function for setTimeout, use the setTimeRemaining function to decrease the amount of time remaining by 1 every 1 second.
      setTimeRemaining(timeRemaining => timeRemaining - 1)
      // When timeRemaining hits 0, do the following:
      // reset timeRemaining back to 10 seconds, so our next question will have a fresh timer; and
      // call the onAnswered callback prop with a value of false (onAnswered(false)), to trigger some behavior in the App component.
      if (timeRemaining <= 0) {
        setTimeRemaining(10);
        onAnswered(false);
      }
    }, 1000)
    // You should also use the cleanup function for useEffect to clean up after the timeout function.
    return function cleanup() {
      clearTimeout(countDown)
    }
  },
    // Make sure to pay attention to any warning/error messages in the console as a result of using useEffect, and clean them up by providing any necessary dependencies in the second argument of useEffect
    [timeRemaining]
  )









  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
