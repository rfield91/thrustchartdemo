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
  let combinedSpeedPoints: ThrustPlotPoint[] = [];
  let previousGearMax = speed1;
  let shiftCount = 0;

  vehicleData.thrust.forEach((points, gear) => {
    if (gear < startingGear || previousGearMax > speed2) return;

    console.log(points);
    const currentGearPoints: ThrustPlotPoint[] = [];

    for (let i = 1; i < points.length; i++) {
      const lower = points[i - 1];
      const upper = points[i];

      // interpolate lower end of gear range
      if (
        previousGearMax > lower.wheelSpeed &&
        previousGearMax < upper.wheelSpeed
      ) {
        currentGearPoints.push({
          wheelSpeed: previousGearMax,
          acceleration: interpolate(
            lower.wheelSpeed,
            upper.wheelSpeed,
            previousGearMax,
            lower.acceleration,
            upper.acceleration
          ),
        });
      }
      // interpolate upper end of gear range
      else if (speed2 > lower.wheelSpeed && speed2 < upper.wheelSpeed) {
        currentGearPoints.push({
          wheelSpeed: speed2,
          acceleration: interpolate(
            lower.wheelSpeed,
            upper.wheelSpeed,
            speed2,
            lower.acceleration,
            upper.acceleration
          ),
        });
      } else if (
        previousGearMax < upper.wheelSpeed &&
        upper.wheelSpeed < speed2
      ) {
        currentGearPoints.push(upper);
      }
    }

    if (currentGearPoints.length > 0) {
      combinedSpeedPoints = [...combinedSpeedPoints, ...currentGearPoints];

      previousGearMax = points[points.length - 1].wheelSpeed;

      shiftCount += gear == startingGear ? 0 : 1;
    }
  });
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
