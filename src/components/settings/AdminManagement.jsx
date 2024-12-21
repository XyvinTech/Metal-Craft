import { Box, Stack } from "@mui/material";
import React from "react";
import { StyledButton } from "../../ui/StyledButton";
import Icon from "@mdi/react";
import { mdiPlus } from "@mdi/js";
import StyledSearchbar from "../../ui/StyledSearchbar";
import StyledTable from "../StyledTable";
import { useNavigate } from "react-router-dom";

const AdminManagement = () => {
  const navigate = useNavigate();
  const column = [
    { title: "Date", field: "_id", padding: "none" },
    { title: "Sender", field: "name" },
    { title: "Receiver", field: "memberName" },
    { title: "Request Type", field: "type" },
    { title: "Status", field: "status" },
  ];
  return (
    <>
      <Stack justifyContent={"flex-end"} direction={"row"} spacing={2}>
        <StyledSearchbar
          placeholder={"Search"}
          //   onchange={(e) => setSearch(e.target.value)}
        />
        <StyledButton
          variant={"primary"}
          name={
            <>
              <Icon path={mdiPlus} size={1} />
              Add Admin
            </>
          }
          onClick={() => navigate("/settings/add-admin")}
        />
      </Stack>
      <Box paddingTop={"15px"}>
        <Box
          borderRadius={"16px"}
          bgcolor={"white"}
          p={1}
          border={"1px solid rgba(0, 0, 0, 0.12)"}
        >
          <StyledTable columns={column} />
        </Box>
      </Box>
    </>
  );
};

export default AdminManagement;
