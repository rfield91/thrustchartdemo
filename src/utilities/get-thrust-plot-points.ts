import { ThrustPlotPoint, ThrustVehicle } from "../_common/types";

export function getThrustPlotPoints(vehicle: ThrustVehicle) {
  const tireRadiusMeters = (vehicle.tireDiameter * 0.0254) / 2;
  const vehicleWeightKg = vehicle.weight * 0.453592;

  const thrustChart = new Map<number, ThrustPlotPoint[]>();

  vehicle.transmission.gears.forEach((_ratio, gear) => {
    thrustChart.set(gear, []);
  });

  vehicle.engine.dataPoints.forEach((hp, rpm) => {
    const engineTorqueFtLbs = (hp * 5252) / rpm;
    const engineTorqueNm = engineTorqueFtLbs * 1.3558179483;

    vehicle.transmission.gears.forEach((ratio, gear) => {
      const effectiveRatio =
        ratio * vehicle.transmission.secondaryGearReduction;

      const wheelSpeedMph =
        ((rpm / (vehicle.transmission.finalDrive * effectiveRatio)) *
          vehicle.tireDiameter *
          Math.PI *
          60) /
        63360;

      const wheelTorqueNm =
        vehicle.transmission.finalDrive * effectiveRatio * engineTorqueNm * 0.9;

      const wheelForce = wheelTorqueNm / tireRadiusMeters;

      const acceleration = wheelForce / vehicleWeightKg / 9.81;

      thrustChart.get(gear)?.push({
        wheelSpeed: wheelSpeedMph,
        acceleration: acceleration,
      });
    });
  });

  return thrustChart;
}
