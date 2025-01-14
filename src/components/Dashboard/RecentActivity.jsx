import {
  Stack,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TableHead,
} from "@mui/material";
import moment from "moment";


const formatIndianDate = (date) => {
  return moment(date).format("DD-MM-YYYY");
};

const RecentActivity = ({ data }) => (
  <Stack
    bgcolor={"#fff"}
    borderRadius={"8px"}
    padding={"20px 16px"}
    spacing={2}
  >
    <Typography variant="h4" color="textSecondary">
      Recent Activity
    </Typography>
    <TableContainer component={Paper} elevation={0}>
      <Table>
      <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold", fontSize: "12px", color: "#4A4A4A" }}>
              Admin Name
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", fontSize: "12px", color: "#4A4A4A" }}>
              Description
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", fontSize: "12px", color: "#4A4A4A" }}>
              Host
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", fontSize: "12px", color: "#4A4A4A" }}>
              Agent
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", fontSize: "12px", color: "#4A4A4A" }}>
              Date
            </TableCell>
          </TableRow>
        </TableHead>
        {data?.length > 0 ? (
          <TableBody>
            {data?.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell sx={{ color: "#687784", fontSize: "10px" }}>
                  {row.adminName}
                </TableCell>

                <TableCell sx={{ color: "#687784", fontSize: "10px" }}>
                  {row.description}
                </TableCell>

                <TableCell sx={{ color: "#687784", fontSize: "10px" }}>
                  {row.host}
                </TableCell>
                <TableCell sx={{ color: "#687784", fontSize: "10px" }}>
                  {row.agent.length > 30
                    ? `${row.agent.slice(0, 30)}...`
                    : row.agent}
                </TableCell>

                <TableCell sx={{ color: "#E8657C", fontSize: "10px" }}>
                  {formatIndianDate(row.createdAt)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : (
          <TableBody>
            <TableRow>
              <TableCell
                colSpan={5}
                sx={{
                  textAlign: "center",
                  color: "#687784",
                  fontSize: "12px",
                  padding: "20px 0",
                }}
              >
                No Data Found
              </TableCell>
            </TableRow>
          </TableBody>
        )}
      </Table>
    </TableContainer>
  </Stack>
);

export default RecentActivity;
