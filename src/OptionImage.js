import React, { useState } from "react";
import "./OptionImage.css";

function OptionImage({ url, onClick, disabled }) {
  const [isHovered, setHovered] = useState(false);

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);

  return (
    <img
      src={url}
      alt="Option"
      className={`option-image ${isHovered ? "hovered" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      disabled={disabled}
    />
  );
}

export default OptionImage;
