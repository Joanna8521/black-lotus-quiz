// src/data/Quiz.js

import React, { useState } from "react";
import questions from "../data/questions";
import results from "../data/results";
import ResultCard from "./ResultCard";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [resultType, setResultType] = useState("");

  const handleAnswer = (type) => {
    const updatedAnswers = [...answers, type];
    setAnswers(updatedAnswers);

    if (currentQuestion + 1 === questions.length) {
      const finalType = calculateResult(updatedAnswers);
      setResultType(finalType);
      setShowResult(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const calculateResult = (typesArray) => {
    const score = {};

    // 初始化計分
    typesArray.forEach((t) => {
      score[t] = (score[t] || 0) + 1;
    });

    // 檢查是否為 S 型（黑化宗師條件：5 題以上都是 A–E）
    const blackTypes = ["A", "B", "C", "D", "E"];
    const blackCount = typesArray.filter((t) => blackTypes.includes(t)).length;
    const uniqueTypes = new Set(typesArray);

    if (blackCount >= 6 && uniqueTypes.size <= 2) {
      return "S";
    }

    // 判斷是否為 F 型（太平均 or 無黑化）
    const max = Math.max(...Object.values(score));
    const dominantTypes = Object.keys(score).filter((k) => score[k] === max);

    if (dominantTypes.length > 1 || !blackTypes.includes(dominantTypes[0])) {
      return "F";
    }

    return dominantTypes[0];
  };

  if (showResult) {
    return <ResultCard result={results[resultType]} />;
  }

  const q = questions[currentQuestion];

  return (
    <div className="quiz-container">
      <h2 className="question">{q.question}</h2>
      <div className="options">
        {q.options.map((option, idx) => (
          <button
            key={idx}
            className="option-button"
            onClick={() => handleAnswer(option.type)}
          >
            {option.text}
          </button>
        ))}
      </div>
      <p className="progress">
        {currentQuestion + 1} / {questions.length}
      </p>
    </div>
  );
};

export default Quiz;
