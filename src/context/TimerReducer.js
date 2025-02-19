export default function TimerReducer(state, action) {
  switch (action.type) {
    case 'ADD_TIMER': {
      const { category, timer } = action.payload;
      return {
        ...state,
        timers: {
          ...state.timers,
          [category]: [...(state.timers[category] || []), { ...timer, remainingTime: timer.duration }],
        },
      };
    }

    case 'START_TIMER': {
      const { id } = action.payload;
      return {
        ...state,
        timers: Object.keys(state.timers).reduce((acc, category) => {
          acc[category] = state.timers[category].map(timer =>
            timer.id === id ? { ...timer, status: 'Running' } : timer
          );
          return acc;
        }, {}),
      };
    }

    case 'PAUSE_TIMER': {
      const { id } = action.payload;
      return {
        ...state,
        timers: Object.keys(state.timers).reduce((acc, category) => {
          acc[category] = state.timers[category].map(timer =>
            timer.id === id ? { ...timer, status: 'Paused' } : timer
          );
          return acc;
        }, {}),
      };
    }

    case 'RESET_TIMER': {
      const { id } = action.payload;
      return {
        ...state,
        timers: Object.keys(state.timers).reduce((acc, category) => {
          acc[category] = state.timers[category].map(timer =>
            timer.id === id ? { ...timer, remainingTime: timer.duration, status: 'Paused' } : timer
          );
          return acc;
        }, {}),
      };
    }

    case 'MARK_COMPLETED': {
      const { id } = action.payload;
      return {
        ...state,
        timers: Object.keys(state.timers).reduce((acc, category) => {
          acc[category] = state.timers[category].map(timer =>
            timer.id === id ? { ...timer, status: 'Completed' } : timer
          );
          return acc;
        }, {}),
      };
    }

    case 'START_ALL_TIMERS': {
      const category = action.payload;
      if (!state.timers[category]) return state; // Ensure category exists

      return {
        ...state,
        timers: {
          ...state.timers,
          [category]: state.timers[category].map(timer => ({
            ...timer,
            status: 'Running',
          })),
        },
      };
    }

    case 'PAUSE_ALL_TIMERS': {
      const category = action.payload;
      if (!state.timers[category]) return state; // Ensure category exists

      return {
        ...state,
        timers: {
          ...state.timers,
          [category]: state.timers[category].map(timer => ({
            ...timer,
            status: 'Paused',
          })),
        },
      };
    }

    case 'RESET_ALL_TIMERS': {
      const category = action.payload;
      if (!state.timers[category]) return state; // Ensure category exists

      return {
        ...state,
        timers: {
          ...state.timers,
          [category]: state.timers[category].map(timer => ({
            ...timer,
            status: 'Paused',
            remainingTime: timer.duration,
          })),
        },
      };
    }

    default:
      return state;
  }
}

