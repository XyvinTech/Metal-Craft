import {
  Stack,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";
import moment from "moment";

const data = [
  { date: "19-05-2024", operation: "Bulk Update", value: 20 },
  { date: "20-05-2024", operation: "Single Update", value: 50 },
];
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
        {data?.length > 0 ? (
          <TableBody>
            {data?.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell sx={{ color: "#687784" }}>{row.adminName}</TableCell>

                <TableCell sx={{ color: "#687784" }}>
                  {row.description}
                </TableCell>

                <TableCell sx={{ color: "#687784" }}>{row.host}</TableCell>
                <TableCell sx={{ color: "#687784" }}>
                  {row.agent.length > 30
                    ? `${row.agent.slice(0, 30)}...`
                    : row.agent}
                </TableCell>

                <TableCell sx={{ color: "#E8657C" }}>
                  {formatIndianDate(row.createdAt)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : (
          <TableBody>
            <Typography sx={{ textAlign: "center" }}>No Data Found</Typography>
          </TableBody>
        )}
      </Table>
    </TableContainer>
  </Stack>
);

export default RecentActivity;
