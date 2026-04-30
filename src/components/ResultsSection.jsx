import React from "react";
import OptionCard from "./OptionCard";
import Recommendation from "./Recommendation";

function ResultsSection({ results, onReset }) {
  const winner = results.recommendation.winner;

  return (
    <div>
      <div className="results-header">
        <h2>Analysis Ready ✨</h2>
        <p>Yeh raha AI ka detailed comparison</p>
      </div>

      {/* Side by side cards */}
      <div className="results-grid">
        <OptionCard
          option={results.option1}
          letter="a"
          isWinner={winner === "option1"}
        />
        <OptionCard
          option={results.option2}
          letter="b"
          isWinner={winner === "option2"}
        />
      </div>

      {/* Recommendation */}
      <Recommendation recommendation={results.recommendation} results={results} />

      {/* Try again */}
      <button className="btn-reset" onClick={onReset}>
        ← Dobara Try Karein
      </button>
    </div>
  );
}

export default ResultsSection;
