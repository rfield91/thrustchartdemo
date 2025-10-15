import { CalculatedPoint } from "../../../../../_common/types";
import { getEngineDataPoints } from "../../../../../utilities/get-engine-data-points";
import {
  NOAH_MSM_4TH,
  NOAH_MSM_5TH,
} from "../../../../engines/mazda/miata/nanb/noah-msm";
import { MIATA_6_SPEED } from "../../../../transmissions/mazda/miata/nanb/miata-6-speed";

export const NOAH_4TH = {
  name: "Noah 4th",
  transmission: {
    gears: MIATA_6_SPEED,
    finalDrive: 4.1,
    secondaryGearReduction: 1,
  },
  engine: {
    dataPoints: getEngineDataPoints(NOAH_MSM_4TH),
  },
  tireDiameter: 22.7,
  weight: 2645,
  thrustData: new Map<number, Map<number, CalculatedPoint>>(),
};

export const NOAH_5TH = {
  name: "Noah 5th",
  transmission: {
    gears: MIATA_6_SPEED,
    finalDrive: 4.1,
    secondaryGearReduction: 1,
  },
  engine: {
    dataPoints: getEngineDataPoints(NOAH_MSM_5TH),
  },
  tireDiameter: 22.7,
  weight: 2645,
  thrustData: new Map<number, Map<number, CalculatedPoint>>(),
};
