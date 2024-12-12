import React from "react";
import "../css/progressIndicator.css";

const ProgressIndicator = ({ count, activeIndex }) => {
  return (
    <div className="progress-indicator-container">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={`progress-dot ${index === activeIndex ? "active" : ""}`}
        />
      ))}
    </div>
  );
};

export default ProgressIndicator;
