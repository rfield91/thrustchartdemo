import { ReactElement } from "react";
import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ThrustPlotPoint, ThrustVehicle } from "./_common/types";
import "./App.css";
import { COLORS } from "./data/colors";
import { ENGINES } from "./data/engines";
import { TRANSMISSIONS } from "./data/transmissionts";
import { calculateTimeBetweenSpeeds } from "./utilities/calculate-time-between-speeds";
import { getThrustPlotPoints } from "./utilities/get-thrust-plot-points";
import { numberWithSuffix } from "./utilities/number-with-suffix";

const getVehicles = () => {
  return [
    {
      name: "RS4 245",
      transmission: {
        gears: TRANSMISSIONS.miata5Speed,
        finalDrive: 4.3,
        secondaryGearReduction: 1,
      },
      engine: {
        dataPoints: ENGINES.ramn1,
      },
      tireDiameter: 22.5,
      weight: 2387,
    },
    {
      name: "Tall Ramn",
      transmission: {
        gears: TRANSMISSIONS.miata5Speed,
        finalDrive: 4.1,
        secondaryGearReduction: 1,
      },
      engine: {
        dataPoints: ENGINES.ramn1,
      },
      tireDiameter: 23.9,
      weight: 2387,
    },
    // {
    //   name: "Haywood",
    //   transmission: {
    //     gears: miata5Speed,
    //     finalDrive: 4.1,
    //     secondaryGearReduction: 1,
    //   },
    //   engine: {
    //     dataPoints: ramn1Dyno,
    //   },
    //   tireDiameter: 23.9,
    //   weight: 2200,
    // },
    // {
    //   name: "V730 225",
    //   transmission: {
    //     gears: miata5Speed,
    //     finalDrive: 4.3,
    //     secondaryGearReduction: 1,
    //   },
    //   engine: {
    //     dataPoints: ramn1Dyno,
    //   },
    //   tireDiameter: 22.9,
    //   weight: 2387,
    // },
    // {
    //   name: "RE71RS 225",
    //   transmission: {
    //     gears: miata5Speed,
    //     finalDrive: 4.3,
    //     secondaryGearReduction: 1,
    //   },
    //   engine: {
    //     dataPoints: ramn1Dyno,
    //   },
    //   tireDiameter: 23.9,
    //   weight: 2387,
    // },
    // {
    //   name: "6 speed v730 225",
    //   transmission: {
    //     gears: miata6Speed,
    //     finalDrive: 4.3,
    //     secondaryGearReduction: 1,
    //   },
    //   engine: {
    //     dataPoints: ramn1Dyno,
    //   },
    //   tireDiameter: 23.9,
    //   weight: 2250,
    // },
  ];
};

function App() {
  const vehicles: ThrustVehicle[] = getVehicles();

  return (
    <div className="flex flex-col gap-10">
      <ThrustChart vehicles={vehicles} />
      <TimeBetweenSpeedsSummary vehicles={vehicles} />
    </div>
  );
}

type ThrustChartProps = {
  vehicles: ThrustVehicle[];
};

function ThrustChart({ vehicles }: ThrustChartProps) {
  const lines: ReactElement[] = [];

  let maxWheelSpeed = 0;

  vehicles.forEach((vehicle, index) => {
    const color = COLORS[index];
    const thrustPlotPoints = getThrustPlotPoints(vehicle);

    thrustPlotPoints.forEach((gearData, gear) => {
      const gearPoints = gearData.map((point) => {
        maxWheelSpeed =
          point.wheelSpeed > maxWheelSpeed ? point.wheelSpeed : maxWheelSpeed;
        return {
          speed: point.wheelSpeed,
          accel: point.acceleration,
        };
      });

      const lineKey = `${vehicle.name}, ${vehicle.tireDiameter}, ${
        vehicle.transmission.finalDrive
      } ${numberWithSuffix(gear)} gear`;

      lines.push(
        <Line
          key={lineKey}
          type="basis"
          data={gearPoints}
          dataKey="accel"
          name={lineKey}
          dot={false}
          activeDot={true}
          stroke={color}
          strokeWidth={2}
        />
      );
    });
  });

  maxWheelSpeed = Math.round(maxWheelSpeed / 10) * 10;

  return (
    <>
      <h1>Thrust Chart</h1>
      <ResponsiveContainer width="100%" aspect={4 / 3}>
        <LineChart margin={{ bottom: 20 }}>
          {lines}
          <CartesianGrid strokeDasharray="3 3" />
          <YAxis dataKey="accel" />
          <XAxis
            type="number"
            dataKey="speed"
            domain={[0, maxWheelSpeed]}
            tickCount={maxWheelSpeed / 10}
          >
            <Label value="Speed (MPH)" offset={-10} position="insideBottom" />
          </XAxis>
          <Tooltip filterNull={true} />
          <Legend
            align="right"
            layout="vertical"
            verticalAlign="middle"
            margin={{ bottom: 50 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}

type TimeBetweenSpeedsSummarProps = {
  vehicles: ThrustVehicle[];
};

function TimeBetweenSpeedsSummary({ vehicles }: TimeBetweenSpeedsSummarProps) {
  const thrustPlotPoints = vehicles.map((vehicle) => ({
    vehicle,
    thrust: getThrustPlotPoints(vehicle),
  }));

  // console.log("sanity check");
  // calculateTimeBetweenSpeeds(thrustPlotPoints[0], 35, 55, 2);
  // calculateTimeBetweenSpeeds(thrustPlotPoints[0], 35, 55, 3);
  // calculateTimeBetweenSpeeds(thrustPlotPoints[1], 35, 55, 2);

  // console.log("turn 1");
  // calculateTimeBetweenSpeeds(thrustPlotPoints[0], 47, 76, 3);
  // calculateTimeBetweenSpeeds(thrustPlotPoints[1], 47, 76, 2);

  // console.log("Clubhouse to bridge");
  // calculateTimeBetweenSpeeds(thrustPlotPoints[0], 40, 68, 3);
  // calculateTimeBetweenSpeeds(thrustPlotPoints[1], 40, 68, 2);

  // console.log("Final turn to start finish");
  // calculateTimeBetweenSpeeds(thrustPlotPoints[0], 47, 68, 3);
  // calculateTimeBetweenSpeeds(thrustPlotPoints[1], 75, 99, 3);

  return (
    <>
      <TimeBetweenSpeeds
        vehicle={thrustPlotPoints[0].vehicle}
        thrust={thrustPlotPoints[0].thrust}
        speed1={35}
        speed2={55}
        startingGear={2}
      />

      <TimeBetweenSpeeds
        vehicle={thrustPlotPoints[0].vehicle}
        thrust={thrustPlotPoints[0].thrust}
        speed1={35}
        speed2={55}
        startingGear={3}
      />
    </>
  );
}

type TimeBetweenSpeedsProps = {
  vehicle: ThrustVehicle;
  thrust: Map<number, ThrustPlotPoint[]>;
  speed1: number;
  speed2: number;
  startingGear: number;
};

function TimeBetweenSpeeds({
  vehicle,
  thrust,
  speed1,
  speed2,
  startingGear,
}: TimeBetweenSpeedsProps) {
  const time = calculateTimeBetweenSpeeds(
    { vehicle, thrust },
    speed1,
    speed2,
    startingGear
  );

  return (
    <p>
      {vehicle.name}, time to go from {speed1} to {speed2}:{" "}
      {Math.round(time.time * 100) / 100}s, starting in{" "}
      {numberWithSuffix(startingGear)} with {time.shiftCount} shifts
    </p>
  );
}

export default App;
