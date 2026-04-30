import { useState } from "react";

function DecisionForm({ onAnalyze, loading }) {
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [context, setContext] = useState("");

  // Button click pe ripple effect
  const handleClick = (e) => {
    if (!option1.trim() || !option2.trim() || loading) return;

    const btn = e.currentTarget;
    const ripple = document.createElement("span");
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;

    ripple.className = "ripple";
    ripple.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${e.clientX - rect.left - size / 2}px;
      top: ${e.clientY - rect.top - size / 2}px;
    `;
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);

    onAnalyze(option1.trim(), option2.trim(), context.trim());
  };

  const isReady = option1.trim() && option2.trim() && !loading;

  return (
    <div className="card form-card">
      {/* Card header */}
      <div className="form-intro">
        <div className="form-intro-icon">⚖️</div>
        <div>
          <h2>Kya compare karna hai?</h2>
          <p>Dono options daalein aur AI baaki kaam karega</p>
        </div>
      </div>

      {/* Two options */}
      <div className="options-row">
        <div className="option-group a">
          <label>Option A</label>
          <input
            className="input-field"
            type="text"
            placeholder="Jaise: iPhone 15"
            value={option1}
            onChange={(e) => setOption1(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && isReady && handleClick(e)}
          />
        </div>

        <div className="vs-badge">VS</div>

        <div className="option-group b">
          <label>Option B</label>
          <input
            className="input-field"
            type="text"
            placeholder="Jaise: Samsung S24"
            value={option2}
            onChange={(e) => setOption2(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && isReady && handleClick(e)}
          />
        </div>
      </div>

      {/* Optional context */}
      <div className="context-group">
        <label>
          Extra Context
          <span className="optional-tag">optional</span>
        </label>
        <textarea
          className="input-field"
          placeholder="Koi khaas condition? Jaise: budget tight hai, gaming ke liye chahiye, gift dena hai..."
          value={context}
          onChange={(e) => setContext(e.target.value)}
        />
      </div>

      {/* Analyze button with ripple */}
      <button
        className="btn-analyze"
        onClick={handleClick}
        disabled={!isReady}
      >
        <span className="btn-icon">
          {loading ? "⟳" : "✦"}
        </span>
        {loading ? "AI analyze kar raha hai..." : "Compare Karwao"}
      </button>
    </div>
  );
}

export default DecisionForm;
