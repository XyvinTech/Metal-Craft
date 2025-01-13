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
    balanceIss,
    balanceStock,
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
    if (sortColumn) {
      filter.sortFields = sortColumn;
    }

    if (sortOrder) {
      filter.sortOrder = sortOrder;
    }

    getMtoByProject(id, filter);
  }, [
    id,
    isChange,
    pageNo,
    row,
    refresh,
    filters,
    fetch,
    sortColumn,
    sortOrder,
  ]);
  const handleEdit = async (row, data) => {
    try {
      let filter = { project: id };
      const req = data[editable[2]];
      const iss = data[editable[0]];
      const cons = data[editable[1]];
      if (req - iss < 0) {
        toast.error("Balance issue is negative");
      }
      if (iss - cons < 0) {
        toast.error("Balance Stock is negative");
      }
      await updateMto(row, data, filter);
      setFetch(!fetch);
    } catch (error) {
      toast.error(error?.message);
    }
  };

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
        balanceIss={balanceIss}
        balanceStock={balanceStock}
        onSave={(rowId, data) => handleEdit(rowId, data)}
      />
    </Box>
  );
};

export default MasterData;
