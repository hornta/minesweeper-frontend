import { Board, SquareType, MinesweeperEvents } from "@hornta/minesweeper";
import {
  useRef,
  KeyboardEventHandler,
  useCallback,
  useEffect,
  RefCallback,
} from "react";

const square2Class: Record<SquareType, string> = {
  [SquareType.Zero]: "minesweeper-square-0",
  [SquareType.One]: "minesweeper-square-1",
  [SquareType.Two]: "minesweeper-square-2",
  [SquareType.Three]: "minesweeper-square-3",
  [SquareType.Four]: "minesweeper-square-4",
  [SquareType.Five]: "minesweeper-square-5",
  [SquareType.Six]: "minesweeper-square-6",
  [SquareType.Seven]: "minesweeper-square-7",
  [SquareType.Eight]: "minesweeper-square-8",
  [SquareType.Flagged]: "minesweeper-square-flag",
  [SquareType.IncorrectlyFlagged]: "minesweeper-incorrectly-marked",
  [SquareType.PlayerRevealedMine]: "minesweeper-square-player-revealed",
  [SquareType.RevealedMine]: "minesweeper-square-mine",
  [SquareType.Unopened]: "minesweeper-square-unknown",
};

export const useMinesweeperBoard = (board: Board) => {
  const squareRefs = useRef<HTMLButtonElement[]>([]);

  const handleKeydown: KeyboardEventHandler<HTMLElement> = useCallback(
    (e) => {
      const currentIndex = squareRefs.current.indexOf(
        document.activeElement as HTMLButtonElement
      );
      const x = currentIndex % board.getWidth();
      const y = Math.floor(currentIndex / board.getWidth());
      let newIndex: number | undefined = undefined;

      if (e.key === "ArrowLeft") {
        if (x > 0) {
          newIndex = currentIndex - 1;
        }
      } else if (e.key === "ArrowRight") {
        if (x < board.getWidth() - 1) {
          newIndex = currentIndex + 1;
        }
      } else if (e.key === "ArrowUp") {
        if (y > 0) {
          newIndex = currentIndex - board.getWidth();
        }
      } else if (e.key === "ArrowDown") {
        if (y < board.getHeight() - 1) {
          newIndex = currentIndex + board.getWidth();
        }
      } else if (e.key === "z") {
        board.open(x, y);
      } else if (e.key === "x") {
        board.flag(x, y);
      }

      if (newIndex !== undefined) {
        e.preventDefault();
        squareRefs.current[currentIndex].tabIndex = -1;
        squareRefs.current[newIndex].tabIndex = 0;
        squareRefs.current[newIndex].focus();
      }
    },
    [board]
  );

  useEffect(() => {
    const onReset: MinesweeperEvents["reset"] = () => {
      let first = true;
      for (const button of squareRefs.current) {
        if (first) {
          button.tabIndex = 0;
          first = false;
        } else {
          button.tabIndex = -1;
        }
        button.className = "minesweeper-square";
      }
    };

    const onUpdate: MinesweeperEvents["update"] = (updates) => {
      for (const update of updates) {
        squareRefs.current[update.index].className =
          "minesweeper-square " + square2Class[update.value as SquareType];

        let label: string;
        switch (update.value) {
          case SquareType.Unopened:
            label = "Unknown";
            break;
          case SquareType.Flagged:
            label = "Flagged";
            break;
          case SquareType.IncorrectlyFlagged:
            label = "Incorrectly flagged";
            break;
          case SquareType.PlayerRevealedMine:
            label = "Mine revealed by the player";
            break;
          case SquareType.RevealedMine:
            label = "Mine revealed";
            break;
          default:
            label = String(update.value);
        }
        squareRefs.current[update.index].ariaLabel = label;
      }
    };

    board.addListener("update", onUpdate);
    board.addListener("reset", onReset);

    squareRefs.current = squareRefs.current.slice(0, board.getSquares().length);

    for (const square of squareRefs.current) {
      square.className =
        "minesweeper-square " + square2Class[SquareType.Unopened];
    }

    return () => {
      board.removeListener("update", onUpdate);
      board.removeListener("reset", onReset);
    };
  }, [board]);

  const addSquareRef: RefCallback<HTMLButtonElement> = useCallback((node) => {
    if (node) {
      squareRefs.current.push(node);
    }
  }, []);

  return {
    squareKeyDownHandler: handleKeydown,
    addSquareRef,
  };
};
