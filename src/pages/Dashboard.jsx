import { Grid, Stack, Typography } from "@mui/material";
import DashboardCard from "../components/Dashboard/DashboardCard";
import DashboardGraph from "../components/Dashboard/DashboardGraph";
import RecentActivity from "../components/Dashboard/RecentActivity";

const Dashboard = () => {
  const activeCard = {
    title: "Active Projects",
    value: 10,
  };
  const activeTask = {
    title: "Active Tasks",
    value: 56,
  };
  return (
    <>
      <Stack
        direction={"row"}
        padding={"10px"}
        bgcolor={"#fff"}
        height={"70px"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack>
          <Typography variant="h1" color={"textSecondary"}>
            Dashboard
          </Typography>
        </Stack>
      </Stack>
      <Grid container p={"15px"} spacing={4}>
        <Grid item xs={5}>
          <Stack direction={"row"} spacing={2}>
            <DashboardCard data={activeCard} color={"textPrimary"} />
            <DashboardCard data={activeTask} color={"#0EB78F"} />
          </Stack>
        </Grid>
        <Grid item xs={7}>
          <DashboardGraph />
        </Grid>{" "}
        <Grid item xs={5}></Grid> <Grid item xs={7}><RecentActivity/></Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
