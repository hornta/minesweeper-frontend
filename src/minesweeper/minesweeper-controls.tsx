import { Board, BoardOptions } from "@hornta/minesweeper";
import { useEffect, useState } from "react";
import { Button } from "./button";
import { SubmitHandler, useForm } from "react-hook-form";
import "./minesweeper-controls.css";
import { Inputs, Preset, presetData, retrievePresetFromData } from "./presets";

export interface MinesweeperControlsProps {
  board: Board;
  onChange: (options: BoardOptions) => void;
}

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

  const [preset, setPreset] = useState(() => {
    return retrievePresetFromData({
      width: board.getWidth(),
      height: board.getHeight(),
      mines: board.getMines(),
    });
  });
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
      <div className="preset-selections">
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
            setPreset(Preset.Custom);
          }}
          aria-pressed={preset === Preset.Custom}
        >
          Custom
        </Button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>
            <div>Width:</div>
            <input
              type="number"
              min={3}
              max={400}
              readOnly={preset !== Preset.Custom}
              {...register("width", {
                valueAsNumber: true,
              })}
            />
          </label>
        </div>
        <div>
          <label>
            <div>Height:</div>
            <input
              type="number"
              readOnly={preset !== Preset.Custom}
              min={3}
              max={400}
              {...register("height", {
                valueAsNumber: true,
              })}
            />
          </label>{" "}
        </div>
        <div>
          <label>
            <div>Mines:</div>
            <input
              type="number"
              readOnly={preset !== Preset.Custom}
              min={1}
              {...register("mines", {
                min: 1,
                valueAsNumber: true,
              })}
            />
          </label>{" "}
        </div>
        <div style={{ alignSelf: "self-end" }}>
          <Button type="submit">New game</Button>
        </div>
      </form>
    </div>
  );
};
