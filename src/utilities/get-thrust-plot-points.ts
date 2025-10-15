import { CalculatedPoint, ThrustVehicle } from "../_common/types";

export function getThrustPlotPoints(vehicle: ThrustVehicle) {
  const tireRadiusMeters = (vehicle.tireDiameter * 0.0254) / 2;
  const vehicleWeightKg = vehicle.weight * 0.453592;

  const thrustChart = new Map<number, Map<number, CalculatedPoint>>();

  vehicle.transmission.gears.forEach((ratio, gear) => {
    thrustChart.set(gear, new Map<number, CalculatedPoint>());

    vehicle.engine.dataPoints.forEach((engineDataPoint) => {
      const effectiveRatio =
        ratio * vehicle.transmission.secondaryGearReduction;

      const wheelSpeedMph =
        ((engineDataPoint.rpm /
          (vehicle.transmission.finalDrive * effectiveRatio)) *
          vehicle.tireDiameter *
          Math.PI *
          60) /
        63360;

      const wheelTorqueNm =
        vehicle.transmission.finalDrive *
        effectiveRatio *
        engineDataPoint.torqueNm *
        0.9;

      const wheelForce = wheelTorqueNm / tireRadiusMeters;

      const acceleration = wheelForce / vehicleWeightKg / 9.81;

      thrustChart.get(gear)?.set(engineDataPoint.rpm, {
        wheelSpeed: wheelSpeedMph,
        wheelTorqueNm: wheelTorqueNm,
        wheelForceNm: wheelForce,
        acceleration: acceleration,
      });
    });
  });

  return thrustChart;
}
