import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import useSound from "use-sound";
import play from "../sounds/play.mp3";
import correct from "../sounds/correct.mp3";
import wrong from "../sounds/wrong.mp3";
import wait from "../sounds/wait.mp3";








 const Question= ({data,questionNumber,setQuestionNumber,setTimeOut})=>{
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [className, setClassName] = useState("answer");
    const [letsPlay] = useSound(play);
  const [correctAnswer] = useSound(correct);
  const [wrongAnswer] = useSound(wrong);
  const [waitSound] = useSound(wait);
   

    useEffect(() => {
    letsPlay();

  }, [letsPlay]);

 // reset quand on change de question (Option A)
  useEffect(() => {
    setClassName("answer");
    setSelectedAnswer(null);
  }, [questionNumber]);





    const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  };
  const handleClick= async(a)=> {
    setSelectedAnswer(a);
    setClassName("answer active")
     delay(3000, () => {
      setClassName(a.correct ? "answer correct" : "answer wrong");
    });

     delay(5000, () => {
      if (a.correct) {
        
          correctAnswer();
        delay(1000, () => {
          setQuestionNumber((prev) => prev + 1);
          setSelectedAnswer(null);

        });
 
      } else {
        //wrongAnswer();
         wrongAnswer();
        delay(1000, () => {
        
         
            setTimeOut(true);

        });
        
      } });

     

    
      
    
  // setQuestionNumber(questionNumber+1)
       
  
  }




    const question=data[questionNumber-1]

  return (
     <div className="Quest">
      <div className="question">{question.question}</div>
      <div className="answers">
        {question?.answers.map((a) => (
          <div
            className={selectedAnswer === a ? className : "answer"}
            onClick={() => !selectedAnswer && handleClick(a)}
          >
            {a.text}
          </div>
        ))}
      </div>
    </div>
  

 
 
 
  
 










  )
}

export default Question
