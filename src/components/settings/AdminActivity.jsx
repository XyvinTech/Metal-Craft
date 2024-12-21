import { Box, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import StyledSearchbar from "../../ui/StyledSearchbar";
import StyledTable from "../StyledTable";
import { useNavigate } from "react-router-dom";
import { adminColumn } from "../../json/TableData";
import { useListStore } from "../../store/listStore";

const AdminActivity = () => {
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
  }, [pageNo, search, row]);

  return (
    <>
      <Stack justifyContent={"flex-end"} direction={"row"} spacing={2}>
        <StyledSearchbar
          placeholder={"Search"}
          onchange={(e) => setSearch(e.target.value)}
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

export default AdminActivity;
