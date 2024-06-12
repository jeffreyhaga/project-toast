import React from "react";
import Button from "../Button";
import { ToastContext } from "../ToastProvider/ToastProvider";

function TimerButton() {
  const { timerStatus, setTimerStatus } = React.useContext(ToastContext);

  const toggleTimerStatus = () => {
    setTimerStatus((prevStatus) => !prevStatus);
  };

  return (
    <Button onClick={toggleTimerStatus}>
      {timerStatus ? "Auto Dismiss: ON" : "Auto Dismiss: OFF"}
    </Button>
  );
}

export default TimerButton;
