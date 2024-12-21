import React, { useState } from "react";
import StyledDataTable from "../ui/StyledDataTable";
import { userColumns, userData } from "../Layout/TableData";
import { Box, Stack, Typography } from "@mui/material";
import Icon from "@mdi/react";
import {
  mdiGreaterThan,
  mdiHistory,
  mdiKeyboardBackspace,
  mdiPlus,
} from "@mdi/js";
import { useNavigate } from "react-router-dom";
import StyledSearchbar from "../ui/StyledSearchbar";
import { StyledButton } from "../ui/StyledButton";

const ProjectView = () => {
  const navigate = useNavigate();
  const [row, setRow] = useState(10);
  const [pageNo, setPageNo] = useState(1);
  const [total, setTotal] = useState(10);
  const [selectedRows, setSelectedRows] = useState([]);
  const handleSelectionChange = (newSelectedIds) => {
    setSelectedRows(newSelectedIds);
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
          <Stack direction="row" spacing={1} alignItems="center"sx={{ cursor: "pointer" }}>
            <Icon path={mdiHistory} size={1} />
            <Typography variant="h9" color="textTertiary">
              Last Updated: 1 Hour Ago
            </Typography>
          </Stack>
          <StyledButton
            variant="primary"
            name={
              <>
                <Icon path={mdiPlus} size={1} />
                Bulk Update
              </>
            }
            // onClick={() => navigate("/add-admin")}
          />
        </Stack>
      </Stack>
      <Box padding={"15px"}>
        <Stack
          direction={"row"}
          spacing={2}
          justifyContent={"flex-end"}
          mb={"15px"}
        >
          <StyledSearchbar
            placeholder={"Search"}
            //   onchange={(e) => setSearch(e.target.value)}
          />
        </Stack>
        <Box
          borderRadius={"16px"}
          bgcolor={"white"}
          p={1}
          border={"1px solid rgba(0, 0, 0, 0.12)"}
        >
          <StyledDataTable
            data={userData}
            columns={userColumns}
            pageNo={pageNo}
            setPageNo={setPageNo}
            rowPerSize={row}
            setRowPerSize={setRow}
            totalCount={total}
            onSelectionChange={handleSelectionChange}
          />
        </Box>
      </Box>
    </>
  );
};

export default ProjectView;
