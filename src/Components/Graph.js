import React from "react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  Tooltip,
  YAxis,
  Text,
} from "recharts";
import { Box } from "@mui/material";

const Graph = (props) => {
  const [chartData, setChartData] = React.useState();

  const createDataForChart = () => {};

  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        marginTop: "5px",
      }}
    >
      <ResponsiveContainer width="80%" height={400}>
        <LineChart data={data}>
          <Line type="monotone" dataKey="uv" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="name" />
          <YAxis />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default Graph;
