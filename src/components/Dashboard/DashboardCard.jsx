import { Stack, Typography } from "@mui/material";

const DashboardCard = ({ data ,color}) => {
  return (
    <Stack
      bgcolor={"#fff"}
      
      borderRadius={"8px"}
      justifyContent={"space-between"}
      padding={"20px 16px"}
      sx={{
        height: { xs: "100px", lg: "166px" }, // Adjust height for different breakpoints
        width: { xs: "100px", lg: "208px" },}}
    >
      <Typography variant="h4" color="textSecondary">{data?.title}</Typography>
      <Typography fontSize={"30px"} fontWeight={700} color={color}>{data?.value}</Typography>
    </Stack>
  );
};

export default DashboardCard;
