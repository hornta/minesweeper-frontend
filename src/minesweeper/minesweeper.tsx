import { useReducer } from "react";
import { Board } from "@hornta/minesweeper";
import { MinesweeperBoard } from "./minesweeper-board";
import { MinesweeperControls } from "./minesweeper-controls";
import "./minesweeper.css";

const defaultOptions = {
  width: 16,
  height: 16,
  mines: 60,
  seed: Math.random(),
};

interface MinesweeperState {
  error?: Error;
  board: Board;
}

const initialState = {
  board: new Board(defaultOptions),
};

type Actions =
  | {
      type: "newBoard";
      payload: Board;
    }
  | { type: "error"; payload: Error };

const reducer = (
  state: MinesweeperState,
  action: Actions
): MinesweeperState => {
  switch (action.type) {
    case "error":
      return {
        ...state,
        error: action.payload,
      };
    case "newBoard":
      return {
        board: action.payload,
      };
    default:
      return state;
  }
};

export const Minesweeper = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <MinesweeperControls
        board={state.board}
        onChange={(options) => {
          try {
            dispatch({ type: "newBoard", payload: new Board(options) });
          } catch (err) {
            dispatch({ type: "error", payload: err as Error });
          }
        }}
      />

      {state.error ? state.error.message : null}

      <MinesweeperBoard board={state.board} />

      <div style={{ textAlign: "center" }}>
        <div>
          Mouse controls: Left click for opening and right click for flagging.
        </div>
        <div>Keyboard controls: Z/Space for opening and X for flagging.</div>
      </div>
    </>
  );
};
