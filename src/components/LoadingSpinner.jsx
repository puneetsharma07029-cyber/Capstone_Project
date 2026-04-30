import React from "react";
function LoadingSpinner() {
  return (
    <div className="loading-wrap">
      <div className="spinner-track" />
      <div className="loading-label">AI compare kar raha hai</div>
      <div className="loading-steps">
        <div className="step-dot" />
        <div className="step-dot" />
        <div className="step-dot" />
      </div>
    </div>
  );
}

export default LoadingSpinner;
