import React from "react";

import "./ResponseItem.css";
function ResponseItem(props) {
  return (
    <div className="repItem">
      <h3>Question</h3>
      <p>{props.question}</p>

      <h3>Answer</h3>
      <p>{props.answer}</p>

      <div class="bottom">
        <div class="left">
          <h3>Model</h3>
          <p>{props.model}</p>
        </div>
        <div class="right">
          <h3>Temperature</h3>
          <p>{props.temp}</p>
        </div>
      </div>
    </div>
  );
}

export default ResponseItem;
