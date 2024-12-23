import { Box, Stack } from "@mui/material";
import { StyledButton } from "../ui/StyledButton";
import StyledTable from "../components/StyledTable";
import Icon from "@mdi/react";
import { mdiCalculator, mdiFileDocumentOutline } from "@mdi/js";
import { summaryColumn } from "../json/TableData";

const Summary = () => {
  return (
    <>
      <Stack spacing={4}>
        <Box
          borderRadius={"16px"}
          bgcolor={"white"}
          p={1}
          border={"1px solid rgba(0, 0, 0, 0.12)"}
        >
          <StyledTable menu columns={summaryColumn} />
        </Box>
        <Stack justifyContent={"flex-end"} direction={"row"} spacing={2}>
          <StyledButton
            variant={"pdf"}
            name={
              <>
                pdf <Icon path={mdiFileDocumentOutline} size={1} />
              </>
            }
          />
          <StyledButton
            variant={"download"}
            name={
              <>
                Excel <Icon path={mdiCalculator} size={1} />
              </>
            }
          />
        </Stack>
      </Stack>
    </>
  );
};

export default Summary;
