import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  Box,
  Divider,
  Stack,
  TablePagination,
  IconButton,
  Checkbox,
  Menu,
  MenuItem,
  Typography,
  Skeleton,
} from "@mui/material";
import moment from "moment";
import Icon from "@mdi/react";
import { mdiDotsVertical, mdiStar } from "@mdi/js";
import { StyledButton } from "../ui/StyledButton";

const StyledTableCell = styled(TableCell)`
  &.${tableCellClasses.head} {
    background-color: #fff;
    color: rgba(0, 0, 0, 0.87);
    font-size: 14px;
    padding: 16px;

    text-align: center;

    font-weight: 600;
  }
  &.${tableCellClasses.body} {
    font-size: 14px;
    background-color: #fff;
    padding: 14px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.87);
    text-align: center;
  }
`;

const StyledTableRow = styled(TableRow)`
  &:last-child td,
  &:last-child th {
    border: 0;
  }
  cursor: ${({ showEdit }) => (showEdit ? "pointer" : "default")};
  &:hover {
    background-color: ${({ showEdit }) => (showEdit ? "#f0f0f0" : "inherit")};
  }
`;

const StyledTable = ({
  columns,
  onSelectionChange,
  onView,
  onDelete,
  onModify,
  menu,
  pageNo,
  setPageNo,
  onDeleteRow,
  rowPerSize,
  setRowPerSize,
}) => {
  const [selectedIds, setSelectedIds] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [rowId, setRowId] = useState(null);
  const [loading, setLoading] = useState(false);
  const totalCount = 10;
  const lists = [
    {
      _id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      createdAt: "2023-10-01T12:00:00Z",
      status: "Active",
      time: "2023-10-01T14:30:00Z",
    },
    {
      _id: "2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      createdAt: "2023-11-10T15:30:00Z",
      status: "Pending",
      time: "2023-11-10T16:45:00Z",
    },
    {
      _id: "3",
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      createdAt: "2023-09-12T08:20:00Z",
      status: "Rejected",
      time: "2023-09-12T09:00:00Z",
    },
    {
      _id: "4",
      name: "Bob Lee",
      email: "bob.lee@example.com",
      createdAt: "2023-12-05T10:15:00Z",
      status: "Active",
      time: "2023-12-05T11:00:00Z",
    },
    {
      _id: "5",
      name: "Charlie Brown",
      email: "charlie.brown@example.com",
      createdAt: "2023-08-21T13:00:00Z",
      status: "Cancelled",
      time: "2023-08-21T13:30:00Z",
    },
  ];
  
  const handleSelectAllClick = (event) => {
    const isChecked = event.target.checked;
    const newSelectedIds = isChecked ? lists.map((row) => row._id) : [];
    setSelectedIds(newSelectedIds);
    onSelectionChange(newSelectedIds);
  };
  const handleRowCheckboxChange = (event, id) => {
    const isChecked = event.target.checked;
    const newSelectedIds = isChecked
      ? [...selectedIds, id]
      : selectedIds.filter((selectedId) => selectedId !== id);
    setSelectedIds(newSelectedIds);
    onSelectionChange(newSelectedIds);
  };
  const handleRowDelete = (id) => {
    onDeleteRow(id);
    handleMenuClose();
  };
  const handleMenuOpen = (event, id) => {
    setAnchorEl(event.currentTarget);
    setRowId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setRowId(null);
  };

  const handleDelete = () => {
    onDelete();
    setSelectedIds([]);
    handleMenuClose();
  };

  const handleModify = () => {
    onModify(rowId);
    handleMenuClose();
  };

  const handleRowClick = (id) => {
    onView(id);
  };

  const isSelected = (id) => selectedIds.includes(id);

  const getStatusVariant = (status) => {
    if (typeof status === "boolean") {
      return status ? "green" : "red";
    }
    switch (status) {
      case "pending":
        return "#FF9F00";
      case "rejected":
        return "#C62828";
      case "active":
        return "#4CAF50";
      case "deleted":
        return "#9E9E9E";
      case "cancelled":
        return "#FF5722";
      case "blocked":
        return "red";
      case "published":
        return "#3F51B5";
      case "unpublished":
        return "#9C27B0";
      case "created":
        return "#FFC107";
      case "success":
        return "#4CAF50";
      case "failure":
        return "red";
      case "live":
        return "#03A9F4";
      default:
        return "#607D8B";
    }
  };
  const formatIndianDate = (date) => {
    return moment.utc(date).format("DD-MM-YYYY");
  };

  const formatTime = (time) => {
    return moment(time).format("h:mm A");
  };

  const pageInc = () => {
    setPageNo((prev) => prev + 1);
  };
  const pageDec = () => {
    setPageNo((prev) => prev - 1);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowPerSize(parseInt(event.target.value, 10));
    setPageNo(1);
  };
  return (
    <Box bgcolor={"white"} borderRadius={"16px"}>
      <TableContainer sx={{ border: "none" }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell padding="checkbox">
                <Checkbox
                  checked={
                    lists &&
                    lists.length > 0 &&
                    selectedIds.length === lists.length
                  }
                  onChange={handleSelectAllClick}
                />
              </StyledTableCell>
              {columns.map((column) => (
                <StyledTableCell
                  key={column.field}
                  padding={column.padding || "normal"}
                >
                  {column.title}
                </StyledTableCell>
              ))}
              <StyledTableCell padding="normal"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              Array.from(new Array(5)).map((_, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell padding="checkbox">
                    <Skeleton variant="rectangular" width={24} height={24} />
                  </StyledTableCell>

                  {columns.map((column) => (
                    <StyledTableCell key={column.field}>
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
              ))
            ) : lists.length === 0 ? (
              <StyledTableRow>
                <StyledTableCell colSpan={columns.length + 2}>
                  <Typography variant="h7" textAlign="center">
                    No data
                  </Typography>
                </StyledTableCell>
              </StyledTableRow>
            ) : (
              lists.map((row) => (
                <StyledTableRow
                  role="checkbox"
                  key={row._id}
                  selected={isSelected(row._id)}
                >
                  <StyledTableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected(row._id)}
                      onChange={(event) =>
                        handleRowCheckboxChange(event, row._id)
                      }
                    />
                  </StyledTableCell>
                  {columns.map((column) => (
                    <StyledTableCell
                      key={column.field}
                      padding={column.padding || "normal"}
                      sx={{ cursor: "pointer" }}
                      onClick={() => handleRowClick(row._id)}
                    >
                      {["createdAt"].includes(column.field) ? (
                        formatIndianDate(row[column.field])
                      ) : ["time"].includes(column.field) ? (
                        formatTime(row[column.field])
                      ) : column.field === "status" ||
                        column.field === "activate" ? (
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <span
                            style={{
                              color: getStatusVariant(row[column.field]),
                              padding: "3px 8px",
                              borderRadius: "100px",
                              border: `1px solid ${getStatusVariant(
                                row[column.field]
                              )}`,
                            }}
                          >
                            {row[column.field] === true ||
                            row[column.field] === "activated"
                              ? "active"
                              : row[column.field] === false ||
                                row[column.field] === "deactivated"
                              ? "inactive"
                              : row[column.field]}
                          </span>
                        </Box>
                      ) : typeof row[column.field] === "string" &&
                        row[column.field].length > 30 ? (
                        `${row[column.field].slice(0, 30)}...`
                      ) : (
                        row[column.field]
                      )}
                    </StyledTableCell>
                  ))}

                  <StyledTableCell padding="normal">
                    <Box display="flex" alignItems="center">
                      {!menu && (
                        <IconButton
                          aria-controls="simple-menu"
                          aria-haspopup="true"
                          onClick={(event) => handleMenuOpen(event, row._id)}
                        >
                          <Icon path={mdiDotsVertical} size={1} />
                        </IconButton>
                      )}
                      <Menu
                        id="row-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl) && rowId === row._id}
                        onClose={handleMenuClose}
                      >
                        [
                        <>
                          {" "}
                          <MenuItem onClick={handleModify}>Edit</MenuItem>
                          <MenuItem
                            onClick={() => handleRowDelete(row._id)}
                            style={{ color: "red" }}
                          >
                            Remove
                          </MenuItem>
                        </>
                        , ]
                      </Menu>
                    </Box>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            )}
          </TableBody>
        </Table>
        <Divider />
        <Stack
          // padding={2}
          component="div"
          direction={"row"}
          justifyContent={selectedIds.length > 0 ? "space-between" : "flex-end"}
          alignItems="center"
        >
          {selectedIds.length > 0 && (
            <Stack direction="row" alignItems="center">
              <Typography paddingRight={3}>
                {`${selectedIds.length} item${
                  selectedIds.length > 1 ? "s" : ""
                } selected`}
              </Typography>
              <StyledButton
                variant="primary"
                name="Delete"
                onClick={() => handleDelete(selectedIds)}
              />
            </Stack>
          )}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box display="flex" alignItems="center">
              <TablePagination
                component="div"
                rowsPerPage={rowPerSize}
                labelDisplayedRows={({ from, to }) =>
                  `${pageNo}-${Math.ceil(
                    totalCount / rowPerSize
                  )} of ${totalCount}`
                }
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={({ onPageChange }) => (
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    marginLeft={2}
                  >
                    {" "}
                    <Box
                      onClick={pageNo > 1 ? pageDec : null}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        cursor: pageNo > 1 ? "pointer" : "not-allowed",
                        opacity: pageNo > 1 ? 1 : 0.5,
                      }}
                    >
                      <Icon path={mdiStar} size={1} />
                    </Box>
                    <Box
                      onClick={
                        pageNo < Math.ceil(totalCount / rowPerSize)
                          ? pageInc
                          : null
                      }
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        cursor:
                          pageNo < Math.ceil(totalCount / rowPerSize)
                            ? "pointer"
                            : "not-allowed",
                        opacity:
                          pageNo < Math.ceil(totalCount / rowPerSize) ? 1 : 0.5,
                      }}
                    >
                      {" "}
                      <Icon path={mdiStar} size={1} />
                    </Box>
                  </Stack>
                )}
              />
            </Box>
          </Stack>
        </Stack>
      </TableContainer>
    </Box>
  );
};

export default StyledTable;
