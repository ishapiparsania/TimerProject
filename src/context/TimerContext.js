import React, { createContext, useReducer } from 'react';
import TimerReducer from './TimerReducer';

const initialState = {
  timers: {}, // Ensure it's an object with category keys
};

const TimerContext = createContext(initialState);

export const TimerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(timerReducer, initialState);

  return <TimerContext.Provider value={{ state, dispatch }}>{children}</TimerContext.Provider>;
};

export default TimerContext;
