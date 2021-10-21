export enum Preset {
  Easy,
  Moderate,
  Hard,
  Custom,
}

export type Inputs = {
  width: number;
  height: number;
  mines: number;
};

export const presetData: Record<Preset, Inputs> = {
  [Preset.Easy]: {
    width: 8,
    height: 8,
    mines: 10,
  },
  [Preset.Moderate]: {
    width: 16,
    height: 16,
    mines: 40,
  },
  [Preset.Hard]: {
    width: 24,
    height: 24,
    mines: 99,
  },
  [Preset.Custom]: {
    width: 30,
    height: 16,
    mines: 120,
  },
};

export const retrievePresetFromData = ({
  width,
  height,
  mines,
}: {
  width: number;
  height: number;
  mines: number;
}) => {
  for (const [preset, data] of Object.entries(presetData)) {
    if (
      width === data.width &&
      height === data.height &&
      mines === data.mines
    ) {
      return Number(preset) as Preset;
    }
  }

  return Preset.Custom;
};
