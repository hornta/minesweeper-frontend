import { forwardRef } from "react";
import "./square.css";

export interface SquareProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  x: number;
  y: number;
  onFlag: (x: number, y: number) => void;
  onOpen: (x: number, y: number) => void;
}

export const Square = forwardRef<HTMLButtonElement, SquareProps>(
  ({ x, y, onFlag, onOpen, ...props }, ref) => {
    return (
      <button
        {...props}
        ref={ref}
        className="minesweeper-square"
        onContextMenu={(e) => {
          e.preventDefault();
          onFlag(x, y);
        }}
        onClick={(event) => {
          if (event.ctrlKey) {
            onFlag(x, y);
          } else {
            onOpen(x, y);
          }
        }}
      ></button>
    );
  }
);
