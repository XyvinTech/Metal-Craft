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

const DashboardGraph = ({ data }) => (
  <Stack
    bgcolor={"#fff"}
    borderRadius={"8px"}
    padding={"20px 16px"}
    spacing={2}
  >
    <Typography variant="h4" color="textSecondary">
      Last Update Count in the week
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
