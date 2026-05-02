import React from "react";
function OptionCard({ option, letter, isWinner }) {
  return (
    <div className={`card option-card ${isWinner ? "winner" : ""}`}>
      {isWinner && <div className="winner-badge">🏆 Winner</div>}

      <div className="option-card-top">
        <div className={`option-letter-chip ${letter}`}>
          {letter.toUpperCase()}
        </div>
      </div>

      <div className="option-name">{option.name}</div>

      {/* Score */}
      <div className="score-row">
        <span className="score-label-text">AI Score</span>
        <span className="score-num">
          {option.score}<sub>/10</sub>
        </span>
      </div>
      <div className="score-track">
        <div
          className="score-fill"
          style={{ width: `${option.score * 10}%` }}
        />
      </div>

      {/* Pros */}
      <div className="pc-section">
        <div className="pc-heading pros">
          <span className="pc-dot" />
          Pros
        </div>
        <ul className="pc-list">
          {option.pros.map((pro, i) => (
            <li key={i} className="pc-item">
              <span className="pc-icon">✓</span>
              {pro}
            </li>
          ))}
        </ul>
      </div>

      {/* Cons */}
      <div className="pc-section">
        <div className="pc-heading cons">
          <span className="pc-dot" />
          Cons
        </div>
        <ul className="pc-list">
          {option.cons.map((con, i) => (
            <li key={i} className="pc-item">
              <span className="pc-icon">✕</span>
              {con}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default OptionCard;
