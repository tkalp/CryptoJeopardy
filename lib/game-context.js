import { createContext, useReducer } from "react";

export const GameContext = createContext();
export const ACTION_TYPES = {
  SET_SCORE: "SET_SCORE",
  SET_QUESTION_COUNT: "SET_QUESTION_COUNT",
  SUBTRACT_QUESTION_COUNT: "SUBTRACT_QUESTION_COUNT",
  SET_MERKLE_TREE: "SET_MERKLE_TREE",
};

const gameReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_SCORE: {
      return { ...state, score: state.score + action.payload.addedScore };
    }
    case ACTION_TYPES.SET_QUESTION_COUNT: {
      return {
        ...state,
        totalQuestions: action.payload.totalQuestions,
      };
    }
    case ACTION_TYPES.SUBTRACT_QUESTION_COUNT: {
      return {
        ...state,
        totalQuestions: state.totalQuestions - 1,
      };
    }
    case ACTION_TYPES.SET_MERKLE_TREE: {
      return {
        ...state,
        merkleTree: action.payload.merkleTree,
      };
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const GameProvider = ({ children }) => {
  const initialState = {
    score: 0,
    totalQuestions: 0,
    gameOver: false,
    merkleTree: null,
  };

  const [state, dispatch] = useReducer(gameReducer, initialState);
  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
