import { Box, Stack } from "@mui/material";
import { StyledButton } from "../ui/StyledButton";
import StyledTable from "../components/StyledTable";
import Icon from "@mdi/react";
import { mdiCalculator, mdiFileDocumentOutline } from "@mdi/js";
import { summaryColumn } from "../json/TableData";
import { useEffect, useState } from "react";
import { useListStore } from "../store/listStore";
import { useParams } from "react-router-dom";
import { generateExcel } from "../utils/generateExcel";
import { getSummary, getSummaryDownload } from "../api/mtoapi";
import StyledSelectField from "../ui/StyledSelectField";
import { useMtoStore } from "../store/mtoStore";
import StyledDataTable from "../ui/StyledDataTable";

const Summary = ({ refresh }) => {
  const { summary, totalCount, getSummarys, sumColumn, loading } =
    useMtoStore();
  const { id } = useParams();
  const [pageNo, setPageNo] = useState(1);
  const [type, setType] = useState([]);
  const [generate, setGenerate] = useState(false);
  const [download, setDownload] = useState(false);
  const [row, setRow] = useState(10);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const fetchedOptions = await getSummary(id);
        if (fetchedOptions?.data?.headers?.length > 0) {
          setOptions(
            fetchedOptions?.data?.headers?.map((item) => ({
              value: item,
              label: item,
            }))
          );
        }
        if (fetchedOptions?.data?.selectedHeaders?.length > 0) {
          setType(fetchedOptions?.data?.selectedHeaders);
          setType(
            fetchedOptions?.data?.selectedHeaders?.map((header) => header)
          );
        }
      } catch (error) {
        console.error("Error fetching summary options:", error);
      }
    };

    fetchOptions();
  }, [id]);
  useEffect(() => {
    let filter = {};
    filter.pageNo = pageNo;
    filter.limit = row;
    if (type) {
      filter.selectedHeaders = type;
    }
    if (download) {
      filter.download = true;
    }

    const fetchData = async () => {
      await getSummarys(id, filter);
    };

    fetchData();
  }, [pageNo, row, refresh, generate]);

  const handleDownload = async () => {
    setDownload(true);
    try {
      let filter = {};
      if (type) {
        filter.selectedHeaders = type;
      }
      const data = await getSummaryDownload(id, filter);
      const csvData = data;

      if (csvData) {
        generateExcel(csvData);
      } else {
        console.error(
          "Error: Missing headers or data in the downloaded content"
        );
      }
    } catch (error) {
      console.error("Error downloading users:", error);
    } finally {
      setDownload(false);
    }
  };
  return (
    <>
      <Stack spacing={4}>
        <Stack justifyContent={"space-between"} direction={"row"} spacing={6}>
          <Stack minWidth={"30%"}>
            {" "}
            <StyledSelectField
              isMulti
              value={options?.filter((option) => type?.includes(option.value))}
              onChange={(selectedOptions) =>
                setType(selectedOptions.map((option) => option.value))
              }
              placeholder={"Select Headers"}
              options={options}
            />{" "}
          </Stack>
          <Stack>
            <StyledButton
              name={"Generate"}
              variant={"primary"}
              onClick={() => setGenerate((prev) => !prev)}
            />
          </Stack>
        </Stack>
        {summary?.length > 0 && (
          <>
            {" "}
            <Box
              borderRadius={"16px"}
              bgcolor={"white"}
              p={1}
              border={"1px solid rgba(0, 0, 0, 0.12)"}
            >
              <StyledDataTable
                columns={sumColumn}
                pageNo={pageNo}
                setPageNo={setPageNo}
                rowPerSize={row}
                setRowPerSize={setRow}
                lists={summary}
                loading={loading}
                totalCount={totalCount}
              />
            </Box>
            <Stack justifyContent={"flex-end"} direction={"row"} spacing={2}>
              {/* <StyledButton
            variant={"pdf"}
            name={
              <>
                pdf <Icon path={mdiFileDocumentOutline} size={1} />
              </>
            }
          /> */}
              <StyledButton
                variant={"download"}
                name={
                  download ? (
                    <>
                      <Icon path={mdiCalculator} size={1} />
                      <span>Downloading...</span>
                    </>
                  ) : (
                    <>
                      <Icon path={mdiCalculator} size={1} />
                      <span>Excel</span>
                    </>
                  )
                }
                onClick={handleDownload}
                disabled={download}
              />
            </Stack>{" "}
          </>
        )}
      </Stack>
    </>
  );
};

export default Summary;
