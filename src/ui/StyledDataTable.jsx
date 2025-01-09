import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  Box,
  Stack,
  TablePagination,
  Typography,
  Skeleton,
  IconButton,
} from "@mui/material";
import moment from "moment";
import Icon from "@mdi/react";
import {
  mdiCheck,
  mdiGreaterThan,
  mdiLessThan,
  mdiPencil,
  mdiWindowClose,
} from "@mdi/js";
import { StyledCalender } from "./StyledCalender";

const StyledTableCell = styled(TableCell)`
  &.${tableCellClasses.head} {
    background-color: #fff;
    color: #042f61;
    font-size: 12px;
    padding: 14px;
    text-transform: capitalize;
    text-align: center;
    font-weight: 600;
  }
  &.${tableCellClasses.body} {
    font-size: 10px;
    background-color: #fff;
    padding: 14px;
    font-weight: 100;
    color: rgba(0, 0, 0, 0.87);
    text-align: center;
  }
`;

const StyledTableRow = styled(TableRow)`
  &:last-child td,
  &:last-child th {
    border: 0;
  }
`;
const StickyActionCell = styled(TableCell)`
  position: sticky;
  right: 0;
  background-color: white;
  z-index: 1;
  text-align: center;
`;
const ScrollableContainer = styled.div`
  overflow-x: auto;
  white-space: nowrap;
`;
const PaginationContainer = styled.div`
  position: sticky;
  bottom: 0;
  background-color: white;
  border-top: 1px solid rgba(0, 0, 0, 0.12);
  z-index: 10;
  display: flex;
  justify-content: end;
`;

const StyledDataTable = ({
  columns,
action,
  lists,
  totalCount,
  pageNo,
  setPageNo,
  loading,
  rowPerSize,
  setRowPerSize,
  editableRows,
  onSave,
}) => {
  const [editedData, setEditedData] = useState({});
  const [editableRow, setEditableRow] = useState(null);
  const handleEdit = (rowId) => {
    setEditableRow(rowId);
    setEditedData((prev) => ({
      ...prev,
      [rowId]: { ...lists.find((row) => row._id === rowId) },
    }));
  };

  const handleSave = (rowId) => {
    if (onSave) {
      onSave(rowId, editedData[rowId]);
    }
    setEditableRow(null);
    setEditedData((prev) => {
      const newData = { ...prev };
      delete newData[rowId];
      return newData;
    });
  };

  const handleCancel = (rowId) => {
    setEditableRow(null);
    setEditedData((prev) => {
      const newData = { ...prev };
      delete newData[rowId];
      return newData;
    });
  };
  const formatIndianDate = useMemo(
    () => (date) => {
      return moment.utc(date).format("DD-MM-YYYY");
    },
    []
  );

  const paginationData = useMemo(
    () => ({
      totalPages: Math.ceil(totalCount / rowPerSize),
      canDecrementPage: pageNo > 1,
      canIncrementPage: pageNo < Math.ceil(totalCount / rowPerSize),
    }),
    [totalCount, rowPerSize, pageNo]
  );

  const tableHeaders = useMemo(
    () => (
      <TableHead>
        <TableRow>
          {columns.map((column) => (
            <StyledTableCell key={column} padding="normal">
              {column}
            </StyledTableCell>
          ))}
          {action &&
          <StyledTableCell padding="normal"></StyledTableCell>}
        </TableRow>
      </TableHead>
    ),
    [columns]
  );

  const loadingSkeleton = useMemo(
    () =>
      Array.from(new Array(5)).map((_, index) => (
        <StyledTableRow key={index}>
          {columns.map((column) => (
            <StyledTableCell key={column}>
              <Skeleton variant="text" width="100%" height={20} />
            </StyledTableCell>
          ))}
          <StyledTableCell>
            <Box display="flex" alignItems="center">
              <Skeleton variant="circular" width={24} height={24} />
              <Skeleton
                variant="circular"
                width={24}
                height={24}
                sx={{ marginLeft: 1 }}
              />
            </Box>
          </StyledTableCell>
        </StyledTableRow>
      )),
    [columns]
  );

  const handleEditChange = (rowId, field, value) => {
    setEditedData((prev) => ({
      ...prev,
      [rowId]: {
        ...prev[rowId],
        [field]: value,
      },
    }));
  };

  const renderCellContent = useMemo(
    () => (column, row) => {

      if (editableRows?.includes(column) && editableRow === row._id) {
        // Check if the column is a date field by determining if its name contains "date"
        const isDateColumn = column.toLowerCase().includes("date");
      
        if (isDateColumn) {
          // Render a styled calendar (date picker) for date fields
          return (
            <StyledCalender
             value={editedData[row._id]?.[column] ?? row[column]}
              onChange={(date) => handleEditChange(row._id, column, date)}
              style={{
                width: "100%",
                padding: "6px",
                fontSize: "10px",
                border: "1px solid #d0d0d0",
                borderRadius: "4px",
              }}
            />
          );
        }
      
        // Render the text input for non-date fields
        return (
          <input
            type="text"
            value={editedData[row._id]?.[column] ?? row[column]}
            onChange={(e) => handleEditChange(row._id, column, e.target.value)}
            style={{
              width: "100%",
              padding: "6px",
              fontSize: "10px",
              border: "1px solid #d0d0d0",
              borderRadius: "4px",
            }}
          />
        );
      }
      

      if (
        ["createdAt", "newIssuedDate", "oldIssuedDate", "issuedDate"].includes(
          column
        )
      ) {
        return formatIndianDate(row[column]);
      }

      if (typeof row[column] === "string" && row[column].length > 30) {
        return `${row[column].slice(0, 30)}...`;
      }

      return row[column];
    },
    [editableRows, editedData, formatIndianDate]
  );

  const handleChangeRowsPerPage = (event) => {
    setRowPerSize(parseInt(event.target.value, 10));
    setPageNo(1);
  };

  return (
    <Box bgcolor={"white"} borderRadius={"16px"}>
      <ScrollableContainer>
        <TableContainer sx={{ border: "none" }}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            {tableHeaders}
            <TableBody>
              {loading ? (
                loadingSkeleton
              ) : lists?.length === 0 ? (
                <StyledTableRow>
                  <StyledTableCell colSpan={columns.length + 2}>
                    <Typography variant="h7" textAlign="center">
                      No data
                    </Typography>
                  </StyledTableCell>
                </StyledTableRow>
              ) : (
                lists?.map((row) => (
                  <StyledTableRow role="checkbox" key={row._id}>
                    {columns.map((column) => (
                      <StyledTableCell
                        key={column}
                        padding="normal"
                        // sx={{ cursor: isEditable ? "pointer" : "default" }}
                      >
                        {renderCellContent(column, row)}
                      </StyledTableCell>
                    ))}
                    {action &&
                    <StickyActionCell>
                      {editableRow === row._id ? (
                        <Box display="flex" justifyContent="center" gap={1}>
                          <IconButton
                            onClick={() => handleSave(row._id)}
                            title="Save"
                            style={{
                              color: "#39940E",
                              borderRadius: "4px",
                              padding: "4px",
                            }}
                          >
                            <Icon path={mdiCheck} size={0.8} />
                          </IconButton>

                          <IconButton
                            onClick={() => handleCancel(row._id)}
                            title="Cancel"
                            style={{
                              color: "#B3261E",
                              borderRadius: "4px",
                              padding: "4px",
                            }}
                          >
                            <Icon path={mdiWindowClose} size={0.8} />
                          </IconButton>
                        </Box>
                      ) : (
                        <IconButton
                          onClick={() => handleEdit(row._id)}
                          style={{
                            color: "#042F61",
                            borderRadius: "4px",
                            padding: "4px",
                          }}
                        >
                          <Icon path={mdiPencil} size={0.8} />
                        </IconButton>
                      )}
                    </StickyActionCell>}
                  </StyledTableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <PaginationContainer>
          <Stack
            direction={"row"}
            justifyContent={"flex-end"}
            alignItems="center"
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box display="flex" alignItems="center">
                <TablePagination
                  component="div"
                  rowsPerPage={rowPerSize}
                  labelRowsPerPage={
                    <Typography sx={{ fontSize: "12px" }}>Rows per page:</Typography>
                  }
                  labelDisplayedRows={({ from, to }) =>
                    `${pageNo}-${paginationData.totalPages} of ${totalCount}`
                  }
                  sx={{
                    "& .MuiTablePagination-toolbar": {
                      fontSize: "12px", 
                    },
                    "& .MuiTablePagination-displayedRows": {
                      fontSize: "12px",
                    },
                  }}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={({ onPageChange }) => (
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      marginLeft={2}
                    >
                      <Box
                        onClick={
                          paginationData.canDecrementPage
                            ? () => setPageNo((prev) => prev - 1)
                            : null
                        }
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          cursor: paginationData.canDecrementPage
                            ? "pointer"
                            : "not-allowed",
                          opacity: paginationData.canDecrementPage ? 1 : 0.5,
                        }}
                      >
                        <Icon path={mdiLessThan} size={0.6} />
                      </Box>
                      <Box
                        onClick={
                          paginationData.canIncrementPage
                            ? () => setPageNo((prev) => prev + 1)
                            : null
                        }
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          cursor: paginationData.canIncrementPage
                            ? "pointer"
                            : "not-allowed",
                          opacity: paginationData.canIncrementPage ? 1 : 0.5,
                        }}
                      >
                        <Icon path={mdiGreaterThan} size={0.6} />
                      </Box>
                    </Stack>
                  )}
                />
              </Box>
            </Stack>
          </Stack>
        </PaginationContainer>
      </ScrollableContainer>
    </Box>
  );
};

export default StyledDataTable;
