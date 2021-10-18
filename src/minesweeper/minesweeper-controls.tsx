import { Board, BoardOptions } from "@hornta/minesweeper";
import { useEffect, useState } from "react";
import { Button } from "./button";
import { SubmitHandler, useForm } from "react-hook-form";
import "./minesweeper-controls.css";

export interface MinesweeperControlsProps {
  board: Board;
  onChange: (options: BoardOptions) => void;
}

export enum Preset {
  Training,
  Easy,
  Moderate,
  Hard,
  Insane,
  Custom,
}

type Inputs = {
  width: number;
  height: number;
  mines: number;
};

const presetData: Record<Preset, Inputs> = {
  [Preset.Training]: {
    width: 9,
    height: 9,
    mines: 10,
  },
  [Preset.Easy]: {
    width: 16,
    height: 16,
    mines: 60,
  },
  [Preset.Moderate]: {
    width: 30,
    height: 16,
    mines: 99,
  },
  [Preset.Hard]: {
    width: 50,
    height: 50,
    mines: 500,
  },
  [Preset.Insane]: {
    width: 100,
    height: 100,
    mines: 2000,
  },
  [Preset.Custom]: {
    width: 30,
    height: 16,
    mines: 120,
  },
};

export const MinesweeperControls = ({
  board,
  onChange,
}: MinesweeperControlsProps) => {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "r") {
        board.reset();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const [preset, setPreset] = useState(Preset.Easy);
  const { register, handleSubmit, reset } = useForm<Inputs>({
    defaultValues: presetData[preset],
  });
  useEffect(() => {
    reset(presetData[preset]);
  }, [preset]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const boardOptions = {
      ...data,
      solvable: false,
    };
    onChange(boardOptions);
  };

  return (
    <div className="minesweeper-controls">
      <Button
        onClick={() => {
          setPreset(Preset.Training);
        }}
        aria-pressed={preset === Preset.Training}
      >
        Training
      </Button>
      <Button
        onClick={() => {
          setPreset(Preset.Easy);
        }}
        aria-pressed={preset === Preset.Easy}
      >
        Easy
      </Button>
      <Button
        onClick={() => {
          setPreset(Preset.Moderate);
        }}
        aria-pressed={preset === Preset.Moderate}
      >
        Moderate
      </Button>
      <Button
        onClick={() => {
          setPreset(Preset.Hard);
        }}
        aria-pressed={preset === Preset.Hard}
      >
        Hard
      </Button>
      <Button
        onClick={() => {
          setPreset(Preset.Insane);
        }}
        aria-pressed={preset === Preset.Insane}
      >
        Insane
      </Button>
      <Button
        onClick={() => {
          setPreset(Preset.Custom);
        }}
        aria-pressed={preset === Preset.Custom}
      >
        Custom
      </Button>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Width:
          <input
            type="number"
            readOnly={preset !== Preset.Custom}
            {...register("width", {
              min: 3,
              max: 400,
              valueAsNumber: true,
            })}
          />
        </label>
        <label>
          Height:
          <input
            type="number"
            readOnly={preset !== Preset.Custom}
            {...register("height", {
              min: 3,
              max: 400,
              valueAsNumber: true,
            })}
          />
        </label>
        <label>
          Mines:
          <input
            type="number"
            readOnly={preset !== Preset.Custom}
            {...register("mines", {
              min: 1,
              valueAsNumber: true,
            })}
          />
        </label>
        <Button type="submit">New game</Button>
      </form>
    </div>
  );
};
