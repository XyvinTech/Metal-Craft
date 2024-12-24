import { Stack, Typography } from "@mui/material";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "MON", date: 1, value: 20 },
  { day: "TUE", date: 2, value: 60 },
  { day: "WED", date: 3, value: 50 },
  { day: "THU", date: 4, value: 50 },
  { day: "FRI", date: 5, value: 40 },
  { day: "SAT", date: 6, value: 80 },
  { day: "SUN", date: 7, value: 70 },
  { day: "MON", date: 8, value: 30 },
  { day: "TUE", date: 9, value: 60 },
  { day: "WED", date: 10, value: 50 },
  { day: "THU", date: 11, value: 80 },
  { day: "FRI", date: 12, value: 90 },
];

const DashboardGraph = () => (
  <Stack
    bgcolor={"#fff"}
    borderRadius={"8px"}
    padding={"20px 16px"}
    spacing={2}
  >
    <Typography variant="h4" color="textSecondary">
      Change Made
    </Typography>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" tick={{ fill: "#687784", fontSize: 12 }} />
        <YAxis tick={{ fill: "#687784", fontSize: 12 }} />
        <Tooltip />
        <Bar dataKey="value" fill="#003366" barSize={11} />
      </BarChart>
    </ResponsiveContainer>
  </Stack>
);

export default DashboardGraph;
