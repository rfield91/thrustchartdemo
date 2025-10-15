export type ThrustVehicle = {
  name: string;
  transmission: Transmission;
  engine: WheelPowerCurve;
  tireDiameter: number;
  weight: number;
  thrustData: Map<number, Map<number, CalculatedPoint>>;
};

export type CalculatedPoint = {
  wheelSpeed: number;
  wheelTorqueNm: number;
  wheelForceNm: number;
  acceleration: number;
};

export type Transmission = {
  gears: Map<number, number>;
  finalDrive: number;
  secondaryGearReduction: number;
};

export type WheelPowerCurve = {
  dataPoints: EngineDataPoint[];
};

export type EngineDataPoint = {
  rpm: number;
  powerHp: number;
  torqueFtlb: number;
  torqueNm: number;
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
