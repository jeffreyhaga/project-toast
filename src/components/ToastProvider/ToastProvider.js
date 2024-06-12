import React from "react";
import OpenAI from "openai";

import useKeydown from "../../hooks/use-keydown";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);
  const [timerStatus, setTimerStatus] = React.useState(false);
  const [generateStatus, setGenerateStatus] = React.useState(false);

  //saving to local storage
  React.useEffect(() => {
    localStorage.setItem("toasts", JSON.stringify(toasts));
  }, [toasts]);

  //use escape key to destroy toast shelf
  const handleEscape = React.useCallback(() => {
    setToasts([]);
  });

  useKeydown("Escape", handleEscape);

  //creating toast
  function createToast(message, variant) {
    const nextToasts = [
      ...toasts,
      {
        id: crypto.randomUUID(),
        message,
        variant,
      },
    ];
    setToasts(nextToasts);
  }

  //dismissing toast by pressing it's "X"
  function dismissToast(id) {
    const nextToasts = toasts.filter((toast) => {
      return toast.id !== id;
    });

    setToasts(nextToasts);
  }

  //function to handle auto dismissal if ON
  function clearToastsOnInterval(interval = 3000) {
    const intervalId = window.setInterval(() => {
      setToasts([]);
    }, interval);

    return () => {
      window.clearInterval(intervalId);
    };
  }

  //if dismiss button is on, run this effect
  React.useEffect(() => {
    if (timerStatus) {
      const clearInterval = clearToastsOnInterval();
      return clearInterval;
    }
  }, [timerStatus]);

  return (
    <ToastContext.Provider
      value={{
        toasts,
        createToast,
        dismissToast,
        clearToastsOnInterval,
        timerStatus,
        setTimerStatus,
        generateStatus,
        setGenerateStatus,
        //fetchOpenAI,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
