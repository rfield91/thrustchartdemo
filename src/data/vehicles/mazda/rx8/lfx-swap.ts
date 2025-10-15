import { CalculatedPoint } from "../../../../_common/types";
import { getEngineDataPoints } from "../../../../utilities/get-engine-data-points";
import { DAN_TUNED } from "../../../engines/gm/lfx/dan-tuned";
import { MV5 } from "../../../transmissions/gm/mv5";
import { MV7 } from "../../../transmissions/gm/mv7";
import { TR3160 } from "../../../transmissions/gm/tr3160";

export const LFX_MV5_373 = {
  name: "LFX MV5",
  transmission: {
    gears: MV5,
    finalDrive: 3.73,
    secondaryGearReduction: 1,
  },
  engine: {
    dataPoints: getEngineDataPoints(DAN_TUNED),
  },
  tireDiameter: 25.6,
  weight: 3150,
  thrustData: new Map<number, Map<number, CalculatedPoint>>(),
};

export const RX8_LFX_RYAN = {
  name: "LFX MV5",
  transmission: {
    gears: MV5,
    finalDrive: 4.56,
    secondaryGearReduction: 1,
  },
  engine: {
    dataPoints: getEngineDataPoints(DAN_TUNED),
  },
  tireDiameter: 24.8,
  weight: 3150,
  thrustData: new Map<number, Map<number, CalculatedPoint>>(),
};

export const LFX_MV5_353 = {
  name: "LFX MV5",
  transmission: {
    gears: MV5,
    finalDrive: 3.53,
    secondaryGearReduction: 1,
  },
  engine: {
    dataPoints: getEngineDataPoints(DAN_TUNED),
  },
  tireDiameter: 24.8,
  weight: 3150,
  thrustData: new Map<number, Map<number, CalculatedPoint>>(),
};

export const LFX_MV7_43 = {
  name: "LFX MV7",
  transmission: {
    gears: MV7,
    finalDrive: 4.3,
    secondaryGearReduction: 1,
  },
  engine: {
    dataPoints: getEngineDataPoints(DAN_TUNED),
  },
  tireDiameter: 24.8,
  weight: 3150,
  thrustData: new Map<number, Map<number, CalculatedPoint>>(),
};

export const LFX_3160_LONGER = {
  name: "LFX TR3160 Longer",
  transmission: {
    gears: TR3160,
    finalDrive: 3.27,
    secondaryGearReduction: 1,
  },
  engine: {
    dataPoints: getEngineDataPoints(DAN_TUNED),
  },
  tireDiameter: 24.8,
  weight: 3150,
  thrustData: new Map<number, Map<number, CalculatedPoint>>(),
};

export const LFX_3160_SHORTER = {
  name: "LFX TR3160 Shorter",
  transmission: {
    gears: TR3160,
    finalDrive: 4.3,
    secondaryGearReduction: 1,
  },
  engine: {
    dataPoints: getEngineDataPoints(DAN_TUNED),
  },
  tireDiameter: 24.8,
  weight: 3150,
  thrustData: new Map<number, Map<number, CalculatedPoint>>(),
};

export const LFX_3160_DAN = {
  name: "LFX TR3160 Dan",
  transmission: {
    gears: TR3160,
    finalDrive: 3.73,
    secondaryGearReduction: 1,
  },
  engine: {
    dataPoints: getEngineDataPoints(DAN_TUNED),
  },
  tireDiameter: 24.8,
  weight: 3150,
  thrustData: new Map<number, Map<number, CalculatedPoint>>(),
};

export const LFX_3160_BRANDON = {
  name: "LFX TR3160 Brandon",
  transmission: {
    gears: TR3160,
    finalDrive: 4.1,
    secondaryGearReduction: 1,
  },
  engine: {
    dataPoints: getEngineDataPoints(DAN_TUNED),
  },
  tireDiameter: 24.8,
  weight: 3150,
  thrustData: new Map<number, Map<number, CalculatedPoint>>(),
};
