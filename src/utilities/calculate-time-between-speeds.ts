import { ThrustPlotPoint, ThrustVehicle } from "../_common/types";

function interpolate(
  x1: number,
  x2: number,
  x: number,
  y1: number,
  y2: number
) {
  //   return y1 * (x - x1) * ((y2 - y1) / (x2 - x1));
  return y1 + (x - x1) * ((y2 - y1) / (x2 - x1));
}

export const calculateTimeBetweenSpeeds = (
  vehicleData: {
    vehicle: ThrustVehicle;
    thrust: Map<number, ThrustPlotPoint[]>;
  },
  speed1: number,
  speed2: number,
  startingGear: number
) => {
  const combinedSpeedPoints: ThrustPlotPoint[] = [];
  let lastReadWheelSpeed = speed1;
  let shiftCount = 0;
  let hasReachedTargetSpeed = false;

  vehicleData.thrust.forEach((points, gear) => {
    if (gear < startingGear || hasReachedTargetSpeed) return;

    const indexOfSpeed1 = points.findIndex((p) => p.wheelSpeed > speed1);
    const indexOfSpeed2 = points.findIndex((p) => p.wheelSpeed > speed2);
    const max = points[points.length - 1];

    if (max.wheelSpeed >= speed2) hasReachedTargetSpeed = true;

    const upperIndex = indexOfSpeed2 === -1 ? points.length - 1 : indexOfSpeed2;

    // interpolate lower
    if (indexOfSpeed1 > 0) {
      const lower = points[indexOfSpeed1 - 1];
      const upper = points[indexOfSpeed1];

      combinedSpeedPoints.push({
        wheelSpeed: speed1,
        acceleration: interpolate(
          lower.wheelSpeed,
          upper.wheelSpeed,
          speed1,
          lower.acceleration,
          upper.acceleration
        ),
      });
    }

    for (let i = indexOfSpeed1; i < upperIndex; i++) {
      combinedSpeedPoints.push(points[i]);
    }

    // interpolate upper
    if (indexOfSpeed2 !== -1 && indexOfSpeed2 < points.length) {
      const lower = points[indexOfSpeed2 - 1];
      const upper = points[indexOfSpeed2];
      combinedSpeedPoints.push({
        wheelSpeed: speed2,
        acceleration: interpolate(
          lower.wheelSpeed,
          upper.wheelSpeed,
          speed2,
          lower.acceleration,
          upper.acceleration
        ),
      });
    }

    shiftCount += gear == startingGear ? 0 : 1;
  });

  console.log(combinedSpeedPoints);

  let sum: number = 0;

  for (let i = 1; i < combinedSpeedPoints.length; i++) {
    const point1 = combinedSpeedPoints[i - 1];
    const point2 = combinedSpeedPoints[i];

    const deltaV = point2.wheelSpeed * 0.44704 - point1.wheelSpeed * 0.44704;
    const g = point2.acceleration * 9.80665;

    const time = deltaV / g;

    sum += time;
  }

  sum = sum + shiftCount * 0.4;

  return {
    time: sum,
    shiftCount: shiftCount,
  };
};
