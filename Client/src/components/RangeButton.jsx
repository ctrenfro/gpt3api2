import React from "react";

import "./RangeButton.css";

function RangeButton(props) {
  return (
    <div className="slider-parent">
      <input
        type={props.type}
        min={props.min}
        max={props.max}
        step={props.step}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
}

export default RangeButton;
