import React, { useEffect, useState } from "react";
import { useMtoStore } from "../store/mtoStore";
import { useProjectStore } from "../store/projectStore";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import StyledDataTable from "../ui/StyledDataTable";

const MasterData = ({ refresh, isChange }) => {
  const { filters } = useProjectStore();
  const { lists, totalCount, getMtoByProject, columns,loading } = useMtoStore();
  const { id } = useParams();
  const [row, setRow] = useState(10);
  const [pageNo, setPageNo] = useState(1);
  console.log("lists", filters);
  
  useEffect(() => {
    let filter = {
      pageNo,
      limit: row,
      ...filters,
    };

    getMtoByProject(id, filter);
  }, [id, isChange, pageNo, row, refresh, filters]);
  return (
    <Box
      borderRadius={"16px"}
      bgcolor={"white"}
      p={1}
      border={"1px solid rgba(0, 0, 0, 0.12)"}
    >
      <StyledDataTable
        columns={columns}
        pageNo={pageNo}
        setPageNo={setPageNo}
        rowPerSize={row}
        setRowPerSize={setRow}
        lists={lists}
        loading={loading}
        totalCount={totalCount}
      />
    </Box>
  );
};

export default MasterData;
