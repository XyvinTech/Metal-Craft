import { Box, Stack, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import AdminManagement from "../components/settings/AdminManagement";

const Settings = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
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
            Settings
          </Typography>
        </Stack>
      </Stack>
      <Tabs
        value={selectedTab}
        onChange={handleChange}
        aria-label="tabs"
        TabIndicatorProps={{
          style: {
            backgroundColor: "#042F61",
            height: 4,
            borderRadius: "4px",
          },
        }}
        sx={{
          paddingTop: "0px",
          margin: 2,
          backgroundColor: "white",
          "& .MuiTabs-indicator": {
            backgroundColor: "#042F61",
          },
          "& .MuiTab-root": {
            textTransform: "none",
            fontSize: "16px",
            fontWeight: 600,
            color: "#686465",
          },
          "& .MuiTab-root.Mui-selected": {
            color: "#042F61",
          },
        }}
      >
        <Tab label="Admin Management" />
        <Tab label="Admin Activity" />
      </Tabs>
      <Box padding={"15px"}>{selectedTab === 0 && <AdminManagement />}</Box>
    </>
  );
};

export default Settings;