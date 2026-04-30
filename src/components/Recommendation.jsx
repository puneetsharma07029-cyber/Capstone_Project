import React from "react";
function Recommendation({ recommendation, results }) {
  const winnerName =
    recommendation.winner === "option1"
      ? results.option1.name
      : results.option2.name;

  return (
    <div className="card rec-card">
      <div className="rec-inner">
        <div className="rec-trophy">🏆</div>
        <div>
          <div className="rec-label">Final Decision</div>
          <div className="rec-winner-name">{winnerName} Better</div>
          <p className="rec-reason">{recommendation.reason}</p>
        </div>
      </div>
    </div>
  );
}

export default Recommendation;
