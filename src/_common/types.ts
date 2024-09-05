export type ThrustVehicle = {
  name: string;
  transmission: Transmission;
  engine: WheelPowerCurve;
  tireDiameter: number;
  weight: number;
};

export type Transmission = {
  gears: Map<number, number>;
  finalDrive: number;
  secondaryGearReduction: number;
};

export type WheelPowerCurve = {
  dataPoints: Map<number, number>;
};

export type ThrustChart = {
  lines: Map<number, ThrustPlotPoint[]>;
};

export type ThrustPlotPoint = {
  wheelSpeed: number;
  acceleration: number;
};

export type ChartPoints = {
  line: number;
  speed: number;
  g: number;
};
