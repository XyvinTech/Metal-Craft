import React, { useEffect, useState } from "react";
import { useMtoStore } from "../store/mtoStore";
import { useProjectStore } from "../store/projectStore";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
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
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pendingEdit, setPendingEdit] = useState(null);

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
    const req = data[editable[2]];
    const iss = data[editable[0]];
    const cons = data[editable[1]];

    if (req - iss < 0 || iss - cons < 0) {
      setPendingEdit({ row, data });
      setDialogOpen(true);
    } else {
      await processEdit(row, data);
    }
  };

  const processEdit = async (row, data) => {
    try {
      let filter = { project: id };
      await updateMto(row, data, filter);
      setFetch(!fetch);
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfirmEdit = async () => {
    if (pendingEdit) {
      await processEdit(pendingEdit.row, pendingEdit.data);
      setPendingEdit(null);
    }
    setDialogOpen(false);
  };

  const handleClose = () => {
    setDialogOpen(false);
    setPendingEdit(null);
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
      <Dialog open={dialogOpen} onClose={handleClose}>
        <DialogContent>
          <Typography variant="h8">
            This change will result in negative balance values. Are you sure you
            want to proceed?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmEdit} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MasterData;
