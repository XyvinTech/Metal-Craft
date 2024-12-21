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
  Typography,
  Skeleton,
  TableSortLabel,
} from "@mui/material";
import { StyledButton } from "./StyledButton";
import moment from "moment";
import Icon from "@mdi/react";
import {
  mdiPencil,
  mdiSort,
  mdiSortAscending,
  mdiSortDescending,
  mdiStar,
} from "@mdi/js";

const StyledTableCell = styled(TableCell)`
  &.${tableCellClasses.head} {
    color: rgba(0, 0, 0, 0.87);
    font-size: 14px;
    padding: 14px;
    text-align: center;
    font-weight: 600;
    border-bottom: 2px solid #e0e0e0; /* Cleaner separator */
  }
  &.${tableCellClasses.body} {
    font-size: 14px;
    background-color: #fff;
    padding: 16px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.87);
    text-align: center;
  }
`;
const StickyActionCell = styled(TableCell)`
  position: sticky;
  right: 0;
  background-color: white;
  z-index: 1;
  text-align: center;
`;
const StyledTableRow = styled(TableRow)`
  &:last-child td,
  &:last-child th {
    border: 0;
  }
`;
const PaginationContainer = styled.div`
  position: sticky;
  bottom: 0;
  background-color: white;
  z-index: 10;
  padding: 16px;
  display: flex;
  justify-content: end;
`;

const StyledDataTable = ({
  columns,
  onSelectionChange,
  onView,
  onDelete,
  data,
  pageNo,
  setPageNo,
  totalCount,
  dashboard,
  rowPerSize,
  onSearch,
  onSort,
  setRowPerSize,
}) => {
  const [selectedIds, setSelectedIds] = useState([]);

  const handleSelectAllClick = (event) => {
    const isChecked = event.target.checked;
    const newSelectedIds = isChecked ? data.map((row) => row._id) : [];
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

  const handleEdit = (rowId) => {
    // console.log("View item Selected", rowId);
    onView(rowId);
  };

  const handleDelete = () => {
    onDelete();
    setSelectedIds([]);
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!data || data.length === 0) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [data]);
  const pageInc = () => {
    setPageNo((prev) => prev + 1);
  };
  const pageDec = () => {
    setPageNo((prev) => prev - 1);
  };
  const isSelected = (id) => selectedIds.includes(id);
  const handleChangeRowsPerPage = (event) => {
    setRowPerSize(parseInt(event.target.value, 10));
    setPageNo(1);
  };

  const formatIndianDate = (date) => {
    return moment(date).format("DD-MM-YYYY");
  };
  const formatTime = (time) => {
    return moment(time).format("h:mm A");
  };
  const ScrollableContainer = styled.div`
    overflow-x: auto;
    white-space: nowrap;
  `;
  const [searchInputs, setSearchInputs] = useState({});

  const handleSearchChange = (columnName, value) => {
    setSearchInputs((prev) => ({ ...prev, [columnName]: value }));
    onSearch(columnName, value);
  };
  const [sortState, setSortState] = React.useState({
    field: null,
    direction: "asc",
  });

  const handleSort = (field) => {
    const newDirection =
      sortState.field === field && sortState.direction === "asc"
        ? "desc"
        : "asc";
    setSortState({ field, direction: newDirection });
    onSort(field, newDirection);
  };
  const getSortIcon = (field) => {
    if (sortState.field !== field) return mdiSort;
    return sortState.direction === "asc" ? mdiSortAscending : mdiSortDescending;
  };
  return (
    <Box bgcolor={"white"} borderRadius={"16px"}>
      <ScrollableContainer>
        <TableContainer sx={{ border: "none" }}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell padding="checkbox">
                  <Checkbox
                    checked={
                      data &&
                      data.length > 0 &&
                      selectedIds.length === data.length
                    }
                    onChange={handleSelectAllClick}
                  />
                </StyledTableCell>
                {columns.map((column) => (
                  <StyledTableCell
                    key={column.field}
                    padding={column.padding || "normal"}
                  >
                    <Stack spacing={1}>
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="center"
                        spacing={1}
                      >
                        <Box style={{ fontWeight: "bold", fontSize: "14px" }}>
                          {column.title}
                        </Box>
                        <Icon
                          path={getSortIcon(column.field)}
                          size={1}
                          style={{ cursor: "pointer" }}
                          onClick={() => handleSort(column.field)}
                        />
                      </Stack>

                      <input
                        type="text"
                        placeholder="Search"
                        value={searchInputs[column.field] || ""}
                        onChange={(e) =>
                          handleSearchChange(column.field, e.target.value)
                        }
                        style={{
                          marginTop: "5px",
                          width: "100%",
                          padding: "8px",
                          border: "1px solid #d0d0d0",
                          borderRadius: "4px",
                          outline: "none",
                          fontSize: "12px",
                          boxSizing: "border-box",
                        }}
                      />
                    </Stack>
                  </StyledTableCell>
                ))}

                <StickyActionCell padding="normal"></StickyActionCell>
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
              ) : !data || data.length === 0 ? (
                <StyledTableRow>
                  <StyledTableCell colSpan={columns.length + 2}>
                    <Typography variant="h6" textAlign="center">
                      No data
                    </Typography>
                  </StyledTableCell>
                </StyledTableRow>
              ) : (
                data.map((row) => (
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
                      >
                        {["date"].includes(column.field)
                          ? formatIndianDate(row[column.field])
                          : ["time"].includes(column.field)
                          ? formatTime(row[column.field])
                          : row[column.field]}
                      </StyledTableCell>
                    ))}

                    <StickyActionCell>
                      <Box display="flex" alignItems="center">
                        <IconButton
                          aria-controls="simple-view"
                          aria-haspopup="true"
                          onClick={() => handleEdit(row._id)}
                        >
                          <Icon path={mdiPencil} size={1} />
                        </IconButton>
                      </Box>
                    </StickyActionCell>
                  </StyledTableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {!dashboard && totalCount > 0 && (
          <PaginationContainer>
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
            <TablePagination
              component="div"
              rowsPerPage={rowPerSize}
              labelDisplayedRows={({ from, to }) =>
                `${pageNo}-${Math.ceil(
                  totalCount / rowPerSize
                )} of ${totalCount}`
              }
              sx={{
                color: "#686465",
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
                    onClick={pageNo > 1 ? pageDec : null}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      cursor: pageNo > 1 ? "pointer" : "not-allowed",
                      opacity: pageNo > 1 ? 1 : 0.5,
                      pointerEvents: pageNo > 1 ? "auto" : "none",
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
                      pointerEvents:
                        pageNo < Math.ceil(totalCount / rowPerSize)
                          ? "auto"
                          : "none",
                    }}
                  >
                    <Icon path={mdiStar} size={1} />
                  </Box>
                </Stack>
              )}
            />
          </PaginationContainer>
        )}
      </ScrollableContainer>
    </Box>
  );
};

export default StyledDataTable;
