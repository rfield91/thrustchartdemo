import { CalculatedPoint } from "../../../../../_common/types";
import { getEngineDataPoints } from "../../../../../utilities/get-engine-data-points";
import { RAMN1 } from "../../../../engines/mazda/miata/nanb/ramn1";
import { MIATA_5_SPEED } from "../../../../transmissions/mazda/miata/nanb/miata-5-speed";

export const RAMN_39_225RS4 = {
  name: "RS4 225/3.9",
  transmission: {
    gears: MIATA_5_SPEED,
    finalDrive: 3.9,
    secondaryGearReduction: 1,
  },
  engine: {
    dataPoints: getEngineDataPoints(RAMN1),
  },
  tireDiameter: 22.7,
  weight: 2300,
  thrustData: new Map<number, Map<number, CalculatedPoint>>(),
};

export const RAMN_TALL = {
  name: "Tall Ramn",
  transmission: {
    gears: MIATA_5_SPEED,
    finalDrive: 4.1,
    secondaryGearReduction: 1,
  },
  engine: {
    dataPoints: getEngineDataPoints(RAMN1),
  },
  tireDiameter: 23.9,
  weight: 2387,
  thrustData: new Map<number, Map<number, CalculatedPoint>>(),
};
