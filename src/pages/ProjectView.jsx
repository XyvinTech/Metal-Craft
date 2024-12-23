import React, { useEffect, useState } from "react";
import StyledDataTable from "../ui/StyledDataTable";
import { userColumns } from "../json/TableData";
import { Box, Stack, Tab, Tabs, Typography } from "@mui/material";
import Icon from "@mdi/react";
import {
  mdiGreaterThan,
  mdiHistory,
  mdiKeyboardBackspace,
  mdiPlus,
} from "@mdi/js";
import { useNavigate, useParams } from "react-router-dom";
import StyledSearchbar from "../ui/StyledSearchbar";
import { StyledButton } from "../ui/StyledButton";
import { useMtoStore } from "../store/mtoStore";
import { toast } from "react-toastify";
import BulkUpdate from "../components/projects/BulkUpdate";
import Summary from "./Summary";

const ProjectView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [row, setRow] = useState(10);
  const [isChange, setIsChange] = useState(false);
  const [open, setOpen] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [selectedTab, setSelectedTab] = useState(0);
  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  const { lists, totalCount, getMtoByProject, updateMto } = useMtoStore();

  useEffect(() => {
    getMtoByProject(id);
  }, [id, isChange]);
  const handleEdit = async (id, data) => {
    try {
      const formData = {
        issuedDate: data?.issuedDate,
        consumedQty: data?.consumedQty,
        issuedQtyAss: data?.issuedQtyAss,
      };
      await updateMto(id, formData);
      setIsChange(!isChange);
    } catch (error) {
      toast.error(error?.message);
    }
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
        <Stack direction="row" alignItems="center" spacing={1}>
          <Box sx={{ cursor: "pointer" }} onClick={() => navigate(-1)}>
            <Icon path={mdiKeyboardBackspace} size={1} />
          </Box>
          <Typography variant="h1">Project</Typography>
          <Icon path={mdiGreaterThan} size={0.8} />
          <Typography variant="h4">Project Name</Typography>
        </Stack>
        <Stack direction="row" spacing={2} alignItems="center">
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ cursor: "pointer" }}
          >
            <Icon path={mdiHistory} size={1} />
            <Typography variant="h9" color="textTertiary">
              Last Updated: 1 Hour Ago
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
      <Box padding={"15px"}>
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
            marginBottom: "15px",
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
          <Tab label="Master Data" />
          <Tab label="Summary" />
          <Tab label="Alarm" />
        </Tabs>
        <Box padding={"15px"} paddingTop={"15px"}>
          {selectedTab === 0 && (
            <Box
              borderRadius={"16px"}
              bgcolor={"white"}
              p={1}
              border={"1px solid rgba(0, 0, 0, 0.12)"}
            >
              <StyledDataTable
                data={lists}
                columns={userColumns}
                pageNo={pageNo}
                setPageNo={setPageNo}
                rowPerSize={row}
                setRowPerSize={setRow}
                totalCount={totalCount}
                onSave={(rowId, data) => handleEdit(rowId, data)}
              />
            </Box>
          )}
          {selectedTab === 1 && <Summary />}
        </Box>
        <BulkUpdate
          open={open}
          onClose={() => setOpen(false)}
          onChange={() => setIsChange(!isChange)}
        />
      </Box>
    </>
  );
};

export default ProjectView;
