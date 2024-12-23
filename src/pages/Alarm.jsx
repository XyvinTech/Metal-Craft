import { Box, Stack } from "@mui/material";
import { StyledButton } from "../ui/StyledButton";
import StyledTable from "../components/StyledTable";
import Icon from "@mdi/react";
import { mdiCalculator, mdiFileDocumentOutline } from "@mdi/js";
import { summaryColumn } from "../json/TableData";
import { useEffect, useState } from "react";
import { useListStore } from "../store/listStore";
import { useParams } from "react-router-dom";

const Alarm = ({ refresh }) => {
  const { getAlarms } = useListStore();
  const { id } = useParams();
  const [pageNo, setPageNo] = useState(1);
  const [row, setRow] = useState(10);
  
  useEffect(() => {
    let filter = {};
    filter.pageNo = pageNo;
    filter.limit = row;

    getAlarms(id);
  }, [pageNo, row, refresh]);
  return (
    <>
      <Stack spacing={4}>
        <Box
          borderRadius={"16px"}
          bgcolor={"white"}
          p={1}
          border={"1px solid rgba(0, 0, 0, 0.12)"}
        >
          <StyledTable
            menu
            columns={summaryColumn}
            pageNo={pageNo}
            setPageNo={setPageNo}
            rowPerSize={row}
            setRowPerSize={setRow}
          />
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

export default Alarm;
