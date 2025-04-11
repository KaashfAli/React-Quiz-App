import React from 'react'
import './Quiz.css'
import { useState, useRef } from 'react';
import { data } from '../../assets/data.js';

const Quiz = () => {
  // For Displaying question and options
  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(data[index]);

  // Ab sary options select na hoon 
  let [lock, setLock] = useState(false);

  // For Functionality of options
  const checkAns = (e, ans) => {
    if (lock == false) {
      if (question.ans == ans) {
        e.target.classList.add("correct");
        setLock(true);
        setScore(prev => prev + 1)
      }
      else {
        e.target.classList.add("wrong");
        setLock(true);
        option_array[question.ans - 1].current.classList.add("correct")
      }
    }
  }

  // Creating 4 refrence variables to show correct answer with wrong ones
  const Option1 = useRef(null)
  const Option2 = useRef(null)
  const Option3 = useRef(null)
  const Option4 = useRef(null)

  let option_array = [Option1, Option2, Option3, Option4];

  // For submit button functionality
  let [score, setScore] = useState(0);


  const next = () => {
    if (lock == true) {
      if (index == data.length - 1) {
        setResult(true);
        return 0;
      }
      setIndex(++index);
      setQuestion(data[index]);
      setLock(false);
      option_array.map((option) => {
        option.current.classList.remove("wrong");
        option.current.classList.remove("correct");
        return null;
      })
    }
  }

  // For displaying result
  let [result, setResult] = useState(false);

  // For Reset button
  const reset = ()=>{
    setIndex(0);
    setQuestion(data[0]);
    setScore(0);
    setLock(false);
    setResult(false);
  }


  return (
    <div className='container'>
      <h1>Quiz App</h1>
      <hr />
      {/* Ternary operator used to show result if its true */}
      {result ? <>
      {/* This section only for result */}
      <h2>You scored {score} out of {data.length}</h2>
      <button onClick={reset}>Reset</button>
      </> : <>
      {/* This section for questions to display */}
        <h2>{index + 1}.{question.question}</h2>
        <ul>
          <li ref={Option1} onClick={(e) => { checkAns(e, 1) }}>{question.option1}</li>
          <li ref={Option2} onClick={(e) => { checkAns(e, 2) }}>{question.option2}</li>
          <li ref={Option3} onClick={(e) => { checkAns(e, 3) }}>{question.option3}</li>
          <li ref={Option4} onClick={(e) => { checkAns(e, 4) }}>{question.option4}</li>
        </ul>
        <button onClick={next}>Next</button>
        <div className="index">{index + 1} of {data.length} questions</div>
        </>}
    </div>
  )
}

export default Quiz
