import { Box, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { StyledButton } from "../../ui/StyledButton";
import Icon from "@mdi/react";
import { mdiPlus } from "@mdi/js";
import StyledSearchbar from "../../ui/StyledSearchbar";
import StyledTable from "../StyledTable";
import { useNavigate } from "react-router-dom";
import { adminColumn } from "../../json/TableData";
import { useListStore } from "../../store/listStore";

const AdminManagement = () => {
  const navigate = useNavigate();
  const [isChange, setIsChange] = useState(false);
  const { getAdmins } = useListStore();
  const [pageNo, setPageNo] = useState(1);
  const [row, setRow] = useState(10);
  const [search, setSearch] = useState("");
  useEffect(() => {
    let filter = {};
    filter.pageNo = pageNo;
    filter.limit = row;
    if (search) {
      filter.search = search;
      setPageNo(1);
    }
    getAdmins(filter);
  }, [isChange, pageNo, search, row]);
  return (
    <>
      <Stack justifyContent={"flex-end"} direction={"row"} spacing={2}>
        <StyledSearchbar
          placeholder={"Search"}
          onchange={(e) => setSearch(e.target.value)}
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
          <StyledTable
            columns={adminColumn}
            pageNo={pageNo}
            setPageNo={setPageNo}
            rowPerSize={row}
            setRowPerSize={setRow}
          />
        </Box>
      </Box>
    </>
  );
};

export default AdminManagement;
