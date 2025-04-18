// src/components/ResultCard.js

import React from "react";

const themeStyles = {
  "black-yellow": {
    backgroundColor: "#000000",
    color: "#FFF176",
  },
  "black-pink": {
    backgroundColor: "#000000",
    color: "#F48FB1",
  },
  "white-black": {
    backgroundColor: "#FFFFFF",
    color: "#000000",
  },
};

const ResultCard = ({ result }) => {
  const style = themeStyles[result.theme] || themeStyles["black-yellow"];

  return (
    <div className="result-card" style={{ ...style, minHeight: "100vh", padding: "2rem" }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{result.type}</h1>
      <ul style={{ fontSize: "1.2rem", lineHeight: "2" }}>
        {result.description.map((line, idx) => (
          <li key={idx}>• {line}</li>
        ))}
      </ul>
      <h2 style={{ marginTop: "2rem", fontSize: "1.5rem", fontWeight: "bold" }}>{result.punchline}</h2>
    </div>
  );
};

export default ResultCard;
