import React, { useReducer } from 'react';
import TimerContext from './TimerContext';
import TimerReducer from './TimerReducer';

export default function TimerProvider({ children }) {
  const [state, dispatch] = useReducer(TimerReducer, { timers: [] });

  return (
    <TimerContext.Provider value={{ state, dispatch }}>
      {children}
    </TimerContext.Provider>
  );
}
