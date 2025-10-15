import { CalculatedPoint } from "../../../../../_common/types";
import { getEngineDataPoints } from "../../../../../utilities/get-engine-data-points";
import { MATT_NC_25 } from "../../../../engines/mazda/miata/nc/matt-nc-25";
import { NC_6_SPEED } from "../../../../transmissions/mazda/miata/nc/nc-6-speed";

export const MATT_NC_CURRENT = {
  name: "Matt NC Current",
  transmission: {
    gears: NC_6_SPEED,
    finalDrive: 4.1,
    secondaryGearReduction: 1,
  },
  engine: {
    dataPoints: getEngineDataPoints(MATT_NC_25),
  },
  tireDiameter: 24.7,
  weight: 2670,
  thrustData: new Map<number, Map<number, CalculatedPoint>>(),
};

export const MATT_NC_LONGER = {
  name: "Matt NC Longer",
  transmission: {
    gears: NC_6_SPEED,
    finalDrive: 3.73,
    secondaryGearReduction: 1,
  },
  engine: {
    dataPoints: getEngineDataPoints(MATT_NC_25),
  },
  tireDiameter: 24.7,
  weight: 2670,
  thrustData: new Map<number, Map<number, CalculatedPoint>>(),
};

export const MATT_NC_SHORTER = {
  name: "Matt NC Shorter",
  transmission: {
    gears: NC_6_SPEED,
    finalDrive: 4.44,
    secondaryGearReduction: 1,
  },
  engine: {
    dataPoints: getEngineDataPoints(MATT_NC_25),
  },
  tireDiameter: 24.7,
  weight: 2670,
  thrustData: new Map<number, Map<number, CalculatedPoint>>(),
};
