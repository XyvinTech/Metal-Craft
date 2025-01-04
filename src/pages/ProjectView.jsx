import React, { useEffect, useState } from "react";
import StyledDataTable from "../ui/StyledDataTable";
import { Badge, Box, Slide, Stack, Tab, Tabs, Typography } from "@mui/material";
import Icon from "@mdi/react";
import {
  mdiClose,
  mdiFilter,
  mdiGreaterThan,
  mdiHistory,
  mdiKeyboardBackspace,
  mdiPlus,
  mdiSort,
} from "@mdi/js";
import { useNavigate, useParams } from "react-router-dom";
import { StyledButton } from "../ui/StyledButton";
import { useMtoStore } from "../store/mtoStore";
import BulkUpdate from "../components/projects/BulkUpdate";
import Summary from "./Summary";
import Alarm from "./Alarm";
import moment from "moment";
import StyledFilter from "../components/projects/StyledFilter";
import { useProjectStore } from "../store/projectStore";
import StyledSort from "../components/projects/StyledSort";
import MasterData from "./MasterData";
const Transition = React.forwardRef((props, ref) => (
  <Slide
    direction="left"
    ref={ref}
    {...props}
    timeout={{ enter: 1000, exit: 500 }}
  />
));
const ProjectView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [row, setRow] = useState(10);
  const [isChange, setIsChange] = useState(false);
  const [open, setOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [selectedTab, setSelectedTab] = useState(0);
  const { filters, setFilters, sortColumn, sortOrder } = useProjectStore();
  const { lists, totalCount, getMtoByProject, project, columns } =
    useMtoStore();
  const [lastSynced, setLastSynced] = useState(() =>
    moment().format("hh:mm A")
  );

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  useEffect(() => {
    let filter = {
      pageNo,
      limit: row,
      ...filters,
    };

    getMtoByProject(id, filter);
  }, [id, isChange, pageNo, row, refresh, filters]);

  const handleRemoveFilter = (key) => {
    const updatedFilters = { ...filters };

    delete updatedFilters[key];
    setFilters(updatedFilters);
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
        <Stack direction="row" alignItems="center" spacing={1}>
          <Box sx={{ cursor: "pointer" }} onClick={() => navigate(-1)} display={"flex"} pr={2} justifyContent={"center"} alignItems={"center"}>
            <Icon path={mdiKeyboardBackspace} size={.6} />
          </Box>
          <Typography variant="h6" textTransform={"capitalize"}>Project</Typography>
          <Icon path={mdiGreaterThan} size={0.6} />
          <Typography variant="h6" textTransform={"capitalize"}>{project}</Typography>
        </Stack>
        <Stack direction="row" spacing={2} alignItems="center">
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ cursor: "pointer" }}
            onClick={() => {
              setRefresh(!refresh);
              const currentTime = new Date();
              setLastSynced(
                `${currentTime?.getHours()}:${String(
                  currentTime?.getMinutes()
                )?.padStart(2, "0")} ${
                  currentTime?.getHours() >= 12 ? "PM" : "AM"
                }`
              );
            }}
          >
            <Icon path={mdiHistory} size={1} />
            <Typography variant="h9" color="textTertiary">
              Last Updated: {lastSynced}
            </Typography>
          </Stack>{" "}
          {selectedTab === 0 && (
            <StyledButton
              variant="primary"
              name={
                <>
                  <Icon path={mdiPlus} size={1} />
                  Bulk Update
                </>
              }
              onClick={() => setOpen(true)}
            />
          )}
        </Stack>
      </Stack>

      {Object.keys(filters)?.length > 0 && (
        <Box padding={"25px"}>
          <Typography variant="h6">Applied Filters:</Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" mt={1}>
            {Object.entries(filters)?.map(([key, value]) => (
              <Box
                key={key}
                display="flex"
                alignItems="center"
                borderRadius="6px"
                px={2}
                py={1}
                bgcolor="rgba(4, 47, 97, 0.2)"
              >
                <Typography variant="body2" sx={{ marginRight: "8px" }}>
                  {key}: {value}
                </Typography>
                <Icon
                  path={mdiClose}
                  size={0.8}
                  sx={{ cursor: "pointer" }}
                  onClick={() => handleRemoveFilter(key)}
                />
              </Box>
            ))}
          </Stack>
        </Box>
      )}

      <Box padding={"25px"}>
        {" "}
        <Stack
          direction="row"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #E0E0E0",
            bgcolor: "#fff",
          }}
        >
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
              backgroundColor: "white",
              "& .MuiTabs-indicator": {
                backgroundColor: "#042F61",
              },
              "& .MuiTab-root": {
                textTransform: "none",
                fontSize: "14px",
                fontWeight: 200,
                color: "#686465",
              },
              "& .MuiTab-root.Mui-selected": {
                color: "#042F61",
              },
            }}
          >
            <Tab label="Master Data" />
            <Tab label="Summary" />
            <Tab label="Alarm" />
          </Tabs>

          {selectedTab === 0 && (
            <Stack direction="row" spacing={2} alignItems="center">
              <Badge
                color="secondary"
                badgeContent={Object.keys(filters)?.length > 0 ? "!" : null}
                sx={{
                  "& .MuiBadge-badge": { fontSize: 12, fontWeight: "bold" },
                }}
              >
                {" "}
                <Box
                  onClick={() => setFilterOpen(true)}
                  sx={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    color: "#042F61",
                  }}
                >
                  <Typography variant="body2">Filter</Typography>
                  <Icon path={mdiFilter} size={.7} />
                </Box>
              </Badge>
              <Badge
                color="secondary"
                badgeContent={sortColumn && sortColumn?.length > 0 ? "!" : null}
                sx={{
                  "& .MuiBadge-badge": { fontSize: 12, fontWeight: "bold" },
                }}
              >
                {" "}
                <Box
                  sx={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    color: "#042F61",
                    pr: 2,
                  }}
                  onClick={() => setSortOpen(true)}
                >
                  <Typography variant="body2">Sort</Typography>
                  <Icon path={mdiSort} size={.7} />
                </Box>
              </Badge>
            </Stack>
          )}
        </Stack>
        <Box paddingTop={"25px"}>
          {selectedTab === 0 && (
            <MasterData refresh={refresh} isChange={isChange} />
            //   <Box
            //   borderRadius={"16px"}
            //   bgcolor={"white"}
            //   p={1}
            //   border={"1px solid rgba(0, 0, 0, 0.12)"}
            // >
            //   <StyledDataTable
            //     columns={columns}
            //     pageNo={pageNo}
            //     setPageNo={setPageNo}
            //     rowPerSize={row}
            //     setRowPerSize={setRow}
            //     lists={lists}
            //     totalCount={totalCount}
            //   />
            // </Box>
          )}
          {selectedTab === 1 && <Summary refresh={refresh} />}
          {selectedTab === 2 && <Alarm refresh={refresh} />}
        </Box>
        <BulkUpdate
          open={open}
          onClose={() => setOpen(false)}
          onChange={() => setIsChange(!isChange)}
        />
      </Box>
      <StyledFilter
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        columns={columns}
        Transition={Transition}
      />
      <StyledSort
        open={sortOpen}
        onClose={() => setSortOpen(false)}
        Transition={Transition}
        columns={columns}
      />
    </>
  );
};

export default ProjectView;
