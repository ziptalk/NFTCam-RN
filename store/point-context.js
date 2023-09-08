import { createContext, useReducer, useState } from "react";

export const PointContext = createContext({
  point: 0,
  setPoint: () => {},
  addPoint: () => {},
  subPoint: () => {},
});

function pointReducer(state, action) {
  switch (action.type) {
    case "SET":
      return parseInt(action.payload);
    case "ADD":
      return state + parseInt(action.payload);
    case "SUB":
      return state - parseInt(action.payload);
    default:
      return state;
  }
}

function PointContextProvider({ children }) {
  const [pointState, dispatch] = useReducer(pointReducer);

  function setPoint(point) {
    dispatch({ type: "SET", payload: point });
  }

  function addPoint(point) {
    dispatch({ type: "ADD", payload: point });
  }

  function subPoint(point) {
    dispatch({ type: "SUB", payload: point });
  }

  const value = {
    point: pointState,
    setPoint: setPoint,
    addPoint: addPoint,
    subPoint: subPoint,
  };

  return (
    <PointContext.Provider value={value}>{children}</PointContext.Provider>
  );
}

export default PointContextProvider;
