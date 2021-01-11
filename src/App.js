import './App.css';
import React, {useState, useEffect, useRef} from "react";
import Control from "./components/Control.js";
import Timer from "./components/Timer.js";

function App() {
  const [controls, setControls] = useState([
    {label: "Break Length",
     id: "break",
     value: 5},
    {label: "Session Length",
     id: "session",
     value: 25}
  ])
  const [minutes, setMinutes] = useState([5, 25]);
  const [seconds, setSeconds] = useState(0);
  const [active, setActive] = useState(true);
  const [running, setRunning] = useState(false);
  const audio = useRef(null);

  useEffect(() => {
    if (running) {
      const interval = setInterval(() => {
        switch(seconds) {
          case 0:
            if (minutes[1] < 1) {
              audio.current.play();
              setActive(active => !active);
              minutes[1] = controls[1].value;
              let newArr = [...minutes];
              setMinutes(newArr);
              break;
            } else if (minutes[0] < 1) {
              audio.current.play();
              setActive(active => !active);
              minutes[0] = controls[0].value;
              let newArr = [...minutes];
              setMinutes(newArr);
              break;
            }
            setSeconds(59);
            active ? minutes[1]-- : minutes[0]--;
            let newArr = [...minutes];
            setMinutes(newArr);
            break;
          default:
            setSeconds(seconds => seconds - 1);
            break;
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [running, seconds, active]);

  const playPause = () => {
    setRunning(!running);
  }

  const increase = (index) => {
    controls[index].value++;
    if (controls[index].value >= 60) {
      controls[index].value = 60;
    }
    minutes[index] = controls[index].value;
    let newArr1 = [...minutes];
    let newArr2 = [...controls];
    setControls(newArr2);
    setMinutes(newArr1);
    setSeconds(0);
  }

  const decrease = (index) => {
    controls[index].value--;
    if (controls[index].value <= 1) {
      controls[index].value = 1;
    }
    minutes[index] = controls[index].value;
    let newArr1 = [...minutes];
    let newArr2 = [...controls];
    setControls(newArr2);
    setMinutes(newArr1);
    setSeconds(0);
  }

  const reset = () => {
    setRunning(false);
    setSeconds(0);
    setActive(true);
    controls[0].value = 5;
    controls[1].value = 25;
    minutes[0] = controls[0].value;
    minutes[1] = controls[1].value;
    let newArr1 = [...controls];
    let newArr2 = [...minutes];
    setControls(newArr1);
    setMinutes(newArr2);
    audio.current.pause();
    audio.current.currentTime = 0;
  }

  return (
    <div className="App">
      <div className="header">25 + 5 Clock</div>
      <div className="controls-div">
        {
          controls.map((el, idx) => (
            <Control disabled={running} decrease={() => decrease(idx)} increase={() => increase(idx)} id={controls[idx].id} label={controls[idx].label} value={controls[idx].value} key={idx} />
          ))
        }
      </div>
      <Timer style={minutes[0] === 0 ? {color: "red"} : {color: "white"}} minutes={active ? minutes[1] : minutes[0]} seconds={seconds} label={active ? "Session" : "Break"} />
      <div className="buttons">
        <button onClick={playPause} id="start_stop"><i className="fas fa-play"></i><i className="fas fa-pause"></i></button>
        <button onClick={reset} id="reset"><i className="fas fa-sync-alt"></i></button>
      </div>
      <audio ref={audio} id="beep" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
      <footer>coded by Paolo Provveduto</footer>
    </div>
  );
}

export default App;
