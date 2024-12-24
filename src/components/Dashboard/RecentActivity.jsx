import { Stack, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const data = [
  { date: "19-05-2024", operation: "Bulk Update", value: 20 },
  { date: "20-05-2024", operation: "Data Sync", value: 50 }, // Example additional row
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
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Operation</TableCell>
            <TableCell>Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.operation}</TableCell>
              <TableCell>{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Stack>
);

export default RecentActivity;
