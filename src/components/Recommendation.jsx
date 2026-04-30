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
          <div className="rec-label">AI Ki Final Salah</div>
          <div className="rec-winner-name">{winnerName} better hai</div>
          <p className="rec-reason">{recommendation.reason}</p>
        </div>
      </div>
    </div>
  );
}

export default Recommendation;
