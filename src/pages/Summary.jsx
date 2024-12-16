import { Stack, Typography } from "@mui/material";

const Summary = () => {
  return (
    <>
      <Stack
        direction={"row"}
        padding={"10px"}
        bgcolor={"#fff"}
        height={"70px"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack>
          <Typography variant="h1" color={"textSecondary"}>
            Summary
          </Typography>
        </Stack>
      </Stack>
    </>
  );
};

export default Summary;
