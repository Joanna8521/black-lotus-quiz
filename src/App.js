// src/App.js

import React, { useState } from "react";
import Quiz from "./components/Quiz";

const App = () => {
  const [started, setStarted] = useState(false);

  return (
    <div className="app-container" style={{ textAlign: "center", padding: "2rem" }}>
      {!started ? (
        <div>
          <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
            你是哪一種黑蓮花？
          </h1>
          <p style={{ fontSize: "1.2rem", marginBottom: "2rem" }}>
            測出你的語氣殺傷力，看看你屬於哪一型蓮花。<br />
            或者……你其實是無辜的小白花？
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
      ) : (
        <Quiz />
      )}
    </div>
  );
};

export default App;
