import { StageState } from "../../enum/stage.enum";

export const gcpStage = {
  value: StageState.CLOSED,
  label: StageState.CLOSED,
  Description: `4:${StageState.CLOSED}`,
};

export const ampClosedStage = {
  value: StageState.CLOSED,
  label: StageState.CLOSED,
  Description: StageState.CLOSED,
  Name: StageState.CLOSED,
};
export const ampLostStage = {
  value: StageState.LOST,
  label: StageState.LOST,
  Description: StageState.LOST,
  Name: StageState.LOST,
};
