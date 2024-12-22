import { useState } from "react";
import {
  Typography,
  Dialog,
  DialogContent,
  Stack,
  DialogTitle,
  Box,
  Grid,
} from "@mui/material";
import { StyledButton } from "../../ui/StyledButton";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { addUploadFile, getDownload } from "../../api/mtoapi";
import FileUpload from "../../ui/FileUpload";
import { generateExcel } from "../../utils/generateExcel";
import { mdiClose, mdiTrayArrowDown } from "@mdi/js";
import Icon from "@mdi/react";
const BulkUpdate = ({ open, onClose, onChange }) => {
  const [active, setActive] = useState(1);
  const [file, setFile] = useState(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleClear = (event) => {
    event.preventDefault();

    onClose();
  };

  const handleApply = () => {
    setActive(2);
  };
  const handleSubmit = async () => {
    if (!file) {
      toast.error("Please upload a file before proceeding.");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("project", id);

      await addUploadFile(formData);
      onChange();
      onClose();
    } catch (error) {
      toast.error("An error occurred during file upload.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      const data = await getDownload();
      const csvData = data.data;
      if (csvData && csvData.headers && csvData.csvData) {
        generateExcel(csvData.headers, csvData.csvData);
      } else {
        console.error(
          "Error: Missing headers or data in the downloaded content"
        );
      }
    } catch (error) {
      console.error("Error downloading users:", error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: {
          borderRadius: "12px",
          position: "absolute",
          padding: "20px",
        },
      }}
    >
      <DialogContent sx={{ padding: 2 }}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography variant="h1" color="textSecondary" mb={4}>
            Bulk Update
          </Typography><Box sx={{ cursor: "pointer",color:"textSecondary" }} onClick={handleClear}>
          <Icon path={mdiClose} size={1} /></Box>
        </Stack>
        <Grid item xs={6}>
          <Stack direction={"row"} spacing={2}>
            <Box
              sx={{
                borderTop: `2px solid ${active === 1 ? "#042F61" : "#B1BDC7"}`,
                padding: "8px 10px",
              }}
            >
              <Typography>1 .Download Backup File</Typography>
            </Box>

            <Box
              sx={{
                borderTop: `2px solid ${active === 2 ? "#042F61" : "#B1BDC7"}`,
                width: "fit-content",
                padding: "8px 10px",
              }}
            >
              <Typography>2. Upload Bulk Update File</Typography>
            </Box>
          </Stack>

          <Box paddingTop={4}>
            {active === 1 && (
              <>
                <Stack spacing={2} pt={15}>
                  <Typography color="textSecondary" variant="h5">
                    Your Backup File is Ready to Download
                  </Typography>
                  <Stack width={"fit-content"}>
                    <StyledButton
                      name={
                        <>
                          <Icon path={mdiTrayArrowDown} size={1} /> Download
                        </>
                      }
                      variant="primary"
                      onClick={handleDownload}
                    />
                  </Stack>
                </Stack>
                <Stack
                  direction={"row"}
                  spacing={2}
                  padding={2}
                  pb={2}
                  justifyContent={"end"}
                >
                  <StyledButton
                    variant="secondary"
                    name="Cancel"
                    onClick={handleClear}
                  />
                  <StyledButton
                    variant="tertiary"
                    name="Continue"
                    onClick={handleApply}
                  />
                </Stack>
              </>
            )}
            {active === 2 && (
              <>
                <Stack spacing={2} pt={15}>
                  <Typography variant="h6" color="textSecondary" mb={1}>
                    Add File
                  </Typography>
                  <FileUpload onFileSelect={setFile} />
                </Stack>
                <Stack
                  direction={"row"}
                  spacing={2}
                  padding={2}
                  pb={2}
                  justifyContent={"end"}
                >
                  <StyledButton
                    variant="secondary"
                    name="Cancel"
                    onClick={handleClear}
                  />
                  <StyledButton
                    variant="tertiary"
                    name={loading ? "Updating..." : "Update"}
                    onClick={handleSubmit}
                  />
                </Stack>
              </>
            )}
          </Box>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default BulkUpdate;
