import React, { useEffect, useState } from "react";
import { useMtoStore } from "../store/mtoStore";
import { useProjectStore } from "../store/projectStore";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import StyledDataTable from "../ui/StyledDataTable";
import { toast } from "react-toastify";

const MasterData = ({ refresh, isChange }) => {
  const { filters, sortColumn, sortOrder } = useProjectStore();
  const {
    lists,
    totalCount,
    getMtoByProject,
    columns,
    loading,
    editable,
    updateMto,
  } = useMtoStore();
  const { id } = useParams();
  const [row, setRow] = useState(10);
  const [fetch, setFetch] = useState(false);
  const [pageNo, setPageNo] = useState(1);

  useEffect(() => {
    let filter = {
      pageNo,
      limit: row,
      ...filters,
    };
    // filter.sortFields = sortColumn;
    // filter.sortOrder = sortOrder;

    getMtoByProject(id, filter);
  }, [id, isChange, pageNo, row, refresh, filters, fetch, sortColumn, sortOrder]);
  const handleEdit = async (row, data) => {
    try {
      let filter = { project: id };
      // filter.project =id;
      await updateMto(row, data, filter);
      setFetch(!fetch);
    } catch (error) {
      toast.error(error?.message);
    }
  };
  console.log("sortOrder", sortOrder);
  
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
        editableRows={editable}
        action
        onSave={(rowId, data) => handleEdit(rowId, data)}
      />
    </Box>
  );
};

export default MasterData;
