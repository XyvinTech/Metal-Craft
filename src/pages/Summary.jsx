import { Box, Stack, Typography } from "@mui/material";
import StyledSelectField from "../ui/StyledSelectField";
import { StyledButton } from "../ui/StyledButton";
import StyledTable from "../components/StyledTable";
import Icon from "@mdi/react";
import { mdiPlus } from "@mdi/js";

const Summary = () => {
  const column = [
    { title: "Date", field: "_id", padding: "none" },
    { title: "Sender", field: "name" },
    { title: "Receiver", field: "memberName" },
    { title: "Request Type", field: "type" },
    { title: "Status", field: "status" },
  ];
  return (
    <>
      <Stack
        padding={"10px"}
        bgcolor={"#fff"}
        // height={"70px"}
        spacing={2}
      >
        <Typography variant="h1" color={"textSecondary"}>
          Summary
        </Typography>{" "}
        <Stack justifyContent={"space-between"} direction={"row"}>
          <Stack width={"20%"}>
            {" "}
            <StyledSelectField placeholder={"Select Project"} />{" "}
          </Stack>

          <StyledButton name={"Generate"} variant={"primary"} />
        </Stack>
      </Stack>
      <Box padding={"15px"} paddingTop={"25px"}>
        <Typography variant="h1" color={"textSecondary"}>
          Identity Wise Summary
        </Typography>
        <Stack paddingTop={"25px"} spacing={4}>
          <Box
            borderRadius={"16px"}
            bgcolor={"white"}
            p={1}
            border={"1px solid rgba(0, 0, 0, 0.12)"}
          >
            <StyledTable menu columns={column} />
          </Box>
          <Stack justifyContent={"flex-end"} direction={"row"} spacing={2}>
            <StyledButton variant={"pdf"}
              name={
                <>
                  <Icon path={mdiPlus} size={1} /> pdf
                </>
              }
            />
            <StyledButton
              name={
                <>
                  <Icon path={mdiPlus} size={1} /> Excel{" "}
                </>
              }
            />
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default Summary;
