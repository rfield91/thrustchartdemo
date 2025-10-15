import { EngineDataPoint } from "../_common/types";

export function getEngineDataPoints(engineData: Map<number, number>) {
  const calculatedEngineDataPoints: EngineDataPoint[] = [];

  engineData.forEach((hp, rpm) => {
    const torqueFtlb = (hp * 5252) / rpm;
    calculatedEngineDataPoints.push({
      rpm: rpm,
      powerHp: hp,
      torqueFtlb: torqueFtlb,
      torqueNm: torqueFtlb * 1.3558179483,
    });
  });

  return calculatedEngineDataPoints;
}
