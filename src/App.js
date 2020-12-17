import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import "./styles.css";

const StyledInput = styled.input`
  width: 50px;
  outline: none;
  margin: 10px;
  border: none;
  padding: 10px 20px;
  font-size: 30px;
`;
const H1 = styled.h1`
  color: white;
`;
const Span = styled.span`
  color: white;
  font-size: 25px;
`;
const StyledButton = styled.button`
  padding: 10px 20px;
  outline: none;
  border: none;
  border-radius: 20px;
  margin: 10px;
  background-color: tomato;
  color: white;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.5s ease-in-out;
  &:hover {
    background-color: #b52f24;
  }
`;
export default function App() {
  const ref = useRef(null);
  const [days, setDays] = useState(30);
  const [hours, setHours] = useState(24);
  const [minutes, setMinutes] = useState(59);
  const [time, setTime] = useState(59);

  useEffect(() => {
    if (days === 0 && hours === 0 && minutes === 0 && time === 0) {
      handlePause();
    }
  }, [time, hours, minutes, days]);
  const handleStart = () => {
    ref.current = setInterval(() => {
      setTime((time) => time - 1);
    }, 1000);
  };

  if (time < 0) {
    setTime(59);
    setMinutes((minutes) => minutes - 1);
  } else if (minutes < 0) {
    setTime(59);
    setMinutes(59);
    setHours((hours) => hours - 1);
  } else if (hours < 0) {
    setTime(59);
    setMinutes(59);
    setHours(24);
    setDays((days) => days - 1);
  }
  const handleResume = () => {
    ref.current = setInterval(() => {
      setTime((time) => time - 1);
    }, 1000);
  };
  const handlePause = () => {
    clearInterval(ref.current);
  };
  const handleReset = () => {
    setTime(59);
    setHours(24);
    setMinutes(59);
    setDays(30);
    handlePause();
  };

  return (
    <div className="App">
      <H1 style={{ fontSize: 50, marginTop: 150 }}>Countdown Clock</H1>
      <form>
        <StyledInput
          type="number"
          value={days}
          max="30"
          maxlength="2"
          onChange={(e) => setDays(e.target.value)}
        />
        <Span>Days</Span>
        <StyledInput
          type="number"
          value={hours}
          max="24"
          maxlength="2"
          onChange={(e) => setHours(e.target.value)}
        />
        <Span>Hours</Span>
        <StyledInput
          type="number"
          value={minutes}
          max="59"
          maxlength="2"
          onChange={(e) => setMinutes(e.target.value)}
        />
        <Span>Minutes</Span>
        <StyledInput
          type="number"
          value={time}
          max="59"
          maxlength="2"
          onChange={(e) => setTime(e.target.value)}
        />
        <Span>Seconds</Span>
      </form>
      <div style={{ marginTop: 40 }}>
        <StyledButton onClick={handleStart}>Start</StyledButton>
        <StyledButton onClick={handlePause}>Pause</StyledButton>
        <StyledButton onClick={handleResume}>Resume</StyledButton>
        <StyledButton onClick={handleReset}>Reset</StyledButton>
      </div>
    </div>
  );
}
