import { MouseEventHandler, useEffect, useRef } from "react";
import { Board } from "@hornta/minesweeper";
import { Square } from "./square";
import { useMinesweeperBoard } from "./use-minesweeper";
import "./minesweeper-board.css";

export interface MinesweeperBoard {
  board: Board;
}

export const MinesweeperBoard = ({ board }: MinesweeperBoard) => {
  const boardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMouseUp = () => {
      const activeSquare = boardRef.current?.querySelector(".mouse-down");
      activeSquare?.classList.remove("mouse-down");
    };

    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  const handleMouseDown: MouseEventHandler<HTMLElement> = (e) => {
    if (e.button === 0) {
      e.currentTarget.classList.add("mouse-down");
    }
  };

  const { squareKeyDownHandler, addSquareRef } = useMinesweeperBoard(board);

  return (
    <div
      className="minesweeper-board inset-area"
      ref={boardRef}
      style={{
        width: 32 * board.getWidth(),
        height: 32 * board.getHeight(),
      }}
      onKeyDown={squareKeyDownHandler}
    >
      {board.getSquares().map((_, index) => {
        const y = Math.floor(index / board.getWidth());
        const x = index % board.getWidth();

        return (
          <Square
            key={index}
            x={x}
            y={y}
            tabIndex={index === 0 ? 0 : -1}
            ref={addSquareRef}
            onFlag={(x, y) => {
              board.flag(x, y);
            }}
            onOpen={(x, y) => {
              board.open(x, y);
            }}
            aria-label="Unknown"
            onMouseDown={handleMouseDown}
          />
        );
      })}
    </div>
  );
};
