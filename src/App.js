// src/App.js

import React, { useState } from "react";
import questions from "./data/questions";
import results from "./data/results";

const App = () => {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [resultType, setResultType] = useState("");

  const handleOptionClick = (type) => {
    setAnswers([...answers, type]);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult([...answers, type]);
      setIsQuizFinished(true);
    }
  };

  const calculateResult = (finalAnswers) => {
    const count = {};
    finalAnswers.forEach((type) => {
      count[type] = (count[type] || 0) + 1;
    });

    let max = 0;
    let finalType = "";
    for (let type in count) {
      if (count[type] > max) {
        max = count[type];
        finalType = type;
      }
    }

    // 特殊判斷條件
    if (Object.keys(count).length === 1 && count[finalType] === 7 && finalType === "A") {
      finalType = "S"; // 黑蓮花宗師型（全 A）
    } else if (Object.keys(count).length === 1 && count[finalType] === 7 && finalType === "F") {
      finalType = "F"; // 小白花（全 F）
    }

    setResultType(finalType);
  };

  const handleRestart = () => {
    setStarted(false);
    setCurrentQuestion(0);
    setAnswers([]);
    setIsQuizFinished(false);
    setResultType("");
  };

  return (
    <div className="app-container" style={{ textAlign: "center", padding: "2rem" }}>
      {!started ? (
        <div>
          <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
            你是哪一種黑蓮花？
          </h1>
          <p style={{ fontSize: "1.2rem", marginBottom: "2rem" }}>
            測出你的語氣殺傷力，看看你屬於哪一型蓮花。<br />
            說不定……你就是隱士高人黑蓮花宗師呢！
          </p>
          <button
            onClick={() => setStarted(true)}
            style={{
              padding: "1rem 2rem",
              fontSize: "1.2rem",
              backgroundColor: "#000",
              color: "#FFF176",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer"
            }}
          >
            開始測驗
          </button>
        </div>
      ) : !isQuizFinished ? (
        <div>
          <h2 style={{ marginBottom: "1.5rem" }}>
            第 {currentQuestion + 1} 題
          </h2>
          <p style={{ fontSize: "1.25rem", marginBottom: "2rem" }}>
            {questions[currentQuestion].question}
          </p>
          <div style={{ maxWidth: "600px", margin: "0 auto" }}>
            {questions[currentQuestion].options.map((option, index) => (
              <div
                key={index}
                onClick={() => handleOptionClick(option.type)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100px",
                  backgroundColor: "#fff",
                  border: "1px solid #ccc",
                  borderRadius: "12px",
                  marginBottom: "20px",
                  padding: "0 24px",
                  fontSize: "18px",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "0.2s ease",
                }}
              >
                {option.text}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
            {results[resultType].type}
          </h2>
          <div style={{ maxWidth: "600px", margin: "0 auto", fontSize: "1.25rem" }}>
            {results[resultType].description.map((line, index) => (
              <p key={index} style={{ marginBottom: "1rem" }}>{line}</p>
            ))}
            <p style={{ fontWeight: "bold", marginTop: "2rem", fontSize: "1.5rem" }}>
              「{results[resultType].punchline}」
            </p>
          </div>
          <button
            onClick={handleRestart}
            style={{
              marginTop: "3rem",
              backgroundColor: "#000",
              color: "#fff",
              padding: "12px 24px",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            🔁 再測一次
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
