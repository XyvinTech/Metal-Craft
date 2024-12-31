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
} from "@mui/material";
import moment from "moment";
import Icon from "@mdi/react";
import { mdiGreaterThan, mdiLessThan } from "@mdi/js";

const StyledTableCell = styled(TableCell)`
  &.${tableCellClasses.head} {
    background-color: #fff;
    color: rgba(0, 0, 0, 0.87);
    font-size: 14px;
    padding: 14px;

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
  onSelectionChange,
  onView,
  lists,
  totalCount,
  pageNo,
  setPageNo,
  rowPerSize,
  setRowPerSize,
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!lists || lists.length === 0) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [lists]);

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
            <StyledTableCell key={column} padding={column.padding || "normal"}>
              {column}
            </StyledTableCell>
          ))}
          <StyledTableCell padding="normal"></StyledTableCell>
        </TableRow>
      </TableHead>
    ),
    [columns, lists, onSelectionChange]
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

  const renderCellContent = useMemo(
    () => (column, row) => {
      if (
        ["createdAt", "newIssuedDate", "oldIssuedDate", "issuedDate"].includes(
          column.field
        )
      ) {
        return formatIndianDate(row[column.field]);
      }

      if (typeof row[column] === "string" && row[column].length > 30) {
        return `${row[column].slice(0, 30)}...`;
      }

      return row[column];
    },
    [formatIndianDate]
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
                        key={column.field}
                        padding={column.padding || "normal"}
                        sx={{ cursor: "pointer" }}
                        onClick={() => onView(row._id)}
                      >
                        {renderCellContent(column, row)}
                      </StyledTableCell>
                    ))}
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
                  labelDisplayedRows={({ from, to }) =>
                    `${pageNo}-${paginationData.totalPages} of ${totalCount}`
                  }
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
