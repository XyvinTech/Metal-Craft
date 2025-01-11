import { Grid, Stack, Typography } from "@mui/material";
import DashboardCard from "../components/Dashboard/DashboardCard";
import DashboardGraph from "../components/Dashboard/DashboardGraph";
import RecentActivity from "../components/Dashboard/RecentActivity";
import { useAdminStore } from "../store/adminStore";
import { useEffect } from "react";

const Dashboard = () => {
  const { fetchDashboard, dashboard } = useAdminStore();
  useEffect(() => {
    fetchDashboard();
  }, []);

  const activeCard = {
    title: "Active Projects",
    value: dashboard?.projectCount,
  };
  const activeTask = {
    title: "Alerts",
    value: dashboard?.alertCount,
  };
  const changes = {
    title: "Total Updates",
    value: dashboard?.changesCount,
  };
  const admin = {
    title: "Active Members",
    value: dashboard?.adminCount,
  };
  return (
    <>
      <Stack
        direction={"row"}
        padding={"25px"}
        bgcolor={"#fff"}
        height={"80px"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack>
          <Typography variant="h1" color={"textSecondary"}>
            Dashboard
          </Typography>
        </Stack>
      </Stack>
      <Grid container p={"25px"} spacing={4}>
        <Grid item lg={5} xs={12}>
          <Grid container spacing={6}>
            <Grid item lg={6} xs={6} >
              <DashboardCard data={activeCard} color={"textPrimary"} />
            </Grid>{" "}
            <Grid item lg={6}xs={6}>
              <DashboardCard data={activeTask} color={"#0EB78F"} />
            </Grid>
            <Grid item lg={6}xs={6}>
              {" "}
              <DashboardCard data={changes} color={"textPrimary"} />
            </Grid>
            <Grid item lg={6}xs={6}>
              <DashboardCard data={admin} color={"#0EB78F"} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={7}>
          <DashboardGraph />
        </Grid>{" "}
        <Grid item xs={12}>
          <RecentActivity data={dashboard?.recentActivity} />
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
