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

const data = [
  { date: "19-05-2024", operation: "Bulk Update", value: 20 },
  { date: "20-05-2024", operation: "Single Update", value: 50 },
];

const RecentActivity = () => (
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
        <TableBody>
          {data.map((row, index) => (
            <TableRow
              key={index}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell sx={{ color: "#687784" }}>{row.date}</TableCell>
              <TableCell sx={{ color: "#333F49" }}>{row.operation}</TableCell>
              <TableCell sx={{ color: "#E8657C" }}>{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Stack>
);

export default RecentActivity;
