import React from "react";

const Control = (props) => {
  return (
    <div className="labels-div">
      <div className="label" id={`${props.id}-label`}>{props.label}</div>
      <div className="buttons-div">
        <button disabled={props.disabled} onClick={props.decrease} id={`${props.id}-decrement`}><i className="fas fa-arrow-down fa-2x"></i></button>
        <span id={`${props.id}-length`}>{props.value}</span>
        <button disabled={props.disabled} onClick={props.increase} id={`${props.id}-increment`}><i className="fas fa-arrow-up fa-2x"></i></button>
      </div>
    </div>
  );
}

export default Control;
