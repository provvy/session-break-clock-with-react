import React from "react";

const Timer = (props) => {
  return (
    <div style={props.style} className="timer-div">
      <div id="timer-label">{props.label}</div>
      <div id="time-left">{props.minutes < 10 ? ("0" + props.minutes) : props.minutes}:{props.seconds < 10 ? ("0" + props.seconds) : props.seconds}</div>
    </div>
  )
}

export default Timer;
