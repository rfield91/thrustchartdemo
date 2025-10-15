import { CalculatedPoint } from "../../../../../_common/types";
import { getEngineDataPoints } from "../../../../../utilities/get-engine-data-points";
import { TURBO_MIATA_BP4W } from "../../../../engines/mazda/miata/nanb/turbo-miata";
import { MIATA_6_SPEED } from "../../../../transmissions/mazda/miata/nanb/miata-6-speed";

export const TURBO_MIATA = {
  name: "Turbo Miata",
  transmission: {
    gears: MIATA_6_SPEED,
    finalDrive: 4.3,
    secondaryGearReduction: 1,
  },
  engine: {
    dataPoints: getEngineDataPoints(TURBO_MIATA_BP4W),
  },
  tireDiameter: 22.5,
  weight: 2350,
  thrustData: new Map<number, Map<number, CalculatedPoint>>(),
};
