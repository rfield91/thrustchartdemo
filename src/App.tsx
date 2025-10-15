import { ReactElement } from "react";
import {
  CartesianGrid,
  Label,
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
import {
  LFX_3160_BRANDON,
  LFX_3160_DAN,
  RX8_LFX_RYAN,
} from "./data/vehicles/mazda/rx8/lfx-swap";
import { getThrustPlotPoints } from "./utilities/get-thrust-plot-points";
import { numberWithSuffix } from "./utilities/number-with-suffix";

const getVehicles = () => {
  const vehicles = [RX8_LFX_RYAN, LFX_3160_DAN, LFX_3160_BRANDON];

  return vehicles.map((vehicle) => ({
    ...vehicle,
    thrustData: getThrustPlotPoints(vehicle),
  }));
};

function App() {
  const vehicles: ThrustVehicle[] = getVehicles();

  return (
    <div className="flex flex-col gap-10">
      <ThrustChart vehicles={vehicles} />
      <div className="flex gap-2 mx-auto">
        {vehicles.map((vehicle, index) => {
          const color = COLORS[index];

          return (
            <div
              className="p-5 border border-gray-100 rounded shadow-lg"
              key={vehicle.name}
            >
              <div style={{ color: color }}>
                <div>{vehicle.name}</div>
                <div>
                  {vehicle.transmission.finalDrive} FD, {vehicle.tireDiameter}"
                  tire diameter
                </div>
              </div>

              <table className="w-full">
                <thead>
                  <tr>
                    <td className="pr-5">Gear</td>
                    <td>Speed at Limiter</td>
                  </tr>
                </thead>
                <tbody>
                  {Array.from(vehicle.thrustData.entries()).map((gearData) => {
                    const [gear, data] = gearData;

                    return (
                      <tr key={gear}>
                        <td className="pr-5">{gear}</td>
                        <td>
                          {[...data][data.size - 1][1].wheelSpeed.toFixed(1)}mph
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
      {/*<TimeBetweenSpeedsSummary vehicles={vehicles} />*/}
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

    vehicle.thrustData.forEach((gearData, gear) => {
      const gearPoints: ThrustPlotPoint[] = [];

      gearData.forEach((point) => {
        maxWheelSpeed =
          point.wheelSpeed > maxWheelSpeed ? point.wheelSpeed : maxWheelSpeed;
        gearPoints.push({
          wheelSpeed: point.wheelSpeed,
          acceleration: point.acceleration,
        });
      });

      const lineKey = `${vehicle.name}, ${vehicle.tireDiameter}, ${
        vehicle.transmission.finalDrive
      } ${numberWithSuffix(gear)} gear`;

      lines.push(
        <Line
          key={lineKey}
          type="basis"
          data={gearPoints}
          dataKey="acceleration"
          name={lineKey}
          dot={false}
          activeDot={true}
          stroke={color}
          strokeWidth={2}
        />
      );
    });
  });

  maxWheelSpeed = Math.round(maxWheelSpeed / 10) * 10 + 1;

  return (
    <>
      <ResponsiveContainer width="100%" aspect={4 / 3}>
        <LineChart margin={{ bottom: 20 }}>
          {lines}
          <CartesianGrid strokeDasharray="3 3" />
          <YAxis dataKey="acceleration" />
          <XAxis
            type="number"
            dataKey="wheelSpeed"
            domain={[0, maxWheelSpeed + 10]}
            tickCount={maxWheelSpeed / 10}
          >
            <Label value="Speed (MPH)" offset={-10} position="insideBottom" />
          </XAxis>
          <Tooltip filterNull={true} />
          {/* <Legend
            align="right"
            layout="vertical"
            verticalAlign="middle"
            margin={{ bottom: 50 }}
          /> */}
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}

// type TimeBetweenSpeedsSummarProps = {
//   vehicles: ThrustVehicle[];
// };

// function TimeBetweenSpeedsSummary({ vehicles }: TimeBetweenSpeedsSummarProps) {
//   const thrustPlotPoints = vehicles.map((vehicle) => ({
//     vehicle,
//     thrust: getThrustPlotPoints(vehicle),
//   }));

//   // console.log("sanity check");
//   // calculateTimeBetweenSpeeds(thrustPlotPoints[0], 35, 55, 2);
//   // calculateTimeBetweenSpeeds(thrustPlotPoints[0], 35, 55, 3);
//   // calculateTimeBetweenSpeeds(thrustPlotPoints[1], 35, 55, 2);

//   // console.log("turn 1");
//   // calculateTimeBetweenSpeeds(thrustPlotPoints[0], 47, 76, 3);
//   // calculateTimeBetweenSpeeds(thrustPlotPoints[1], 47, 76, 2);

//   // console.log("Clubhouse to bridge");
//   // calculateTimeBetweenSpeeds(thrustPlotPoints[0], 40, 68, 3);
//   // calculateTimeBetweenSpeeds(thrustPlotPoints[1], 40, 68, 2);

//   // console.log("Final turn to start finish");
//   // calculateTimeBetweenSpeeds(thrustPlotPoints[0], 47, 68, 3);
//   // calculateTimeBetweenSpeeds(thrustPlotPoints[1], 75, 99, 3);

//   return (
//     <>
//       <TimeBetweenSpeeds
//         vehicle={thrustPlotPoints[0].vehicle}
//         thrust={thrustPlotPoints[0].thrust}
//         speed1={75}
//         speed2={99}
//         startingGear={4}
//       />

//       <TimeBetweenSpeeds
//         vehicle={thrustPlotPoints[1].vehicle}
//         thrust={thrustPlotPoints[1].thrust}
//         speed1={75}
//         speed2={99}
//         startingGear={3}
//       />
//     </>
//   );
// }

// type TimeBetweenSpeedsProps = {
//   vehicle: ThrustVehicle;
//   thrust: Map<number, ThrustPlotPoint[]>;
//   speed1: number;
//   speed2: number;
//   startingGear: number;
// };

// function TimeBetweenSpeeds({
//   vehicle,
//   thrust,
//   speed1,
//   speed2,
//   startingGear,
// }: TimeBetweenSpeedsProps) {
//   const time = calculateTimeBetweenSpeeds(
//     { vehicle, thrust },
//     speed1,
//     speed2,
//     startingGear
//   );

//   return (
//     <p>
//       {vehicle.name}, time to go from {speed1} to {speed2}:{" "}
//       {Math.round(time.time * 100) / 100}s, starting in{" "}
//       {numberWithSuffix(startingGear)} with {time.shiftCount} shifts
//     </p>
//   );
// }

export default App;
