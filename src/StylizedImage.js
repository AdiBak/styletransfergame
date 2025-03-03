import React from "react";
import "./StylizedImage.css";

function StylizedImage({ url }) {
  return (
    <div className="stylized-container">
      <img
        src={url}
        alt="Stylized"
        className={`stylized-image ${url ? "slide-in-left" : ""}`}
      />
    </div>
  );
}

export default StylizedImage;
