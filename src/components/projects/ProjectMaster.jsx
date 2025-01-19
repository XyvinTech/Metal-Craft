import {
  Box,
  CircularProgress,
  Grid,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { StyledButton } from "../../ui/StyledButton";
import FileUpload from "../../ui/FileUpload";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useProjectStore } from "../../store/projectStore";
import { useNavigate } from "react-router-dom";
import { addUploadFile } from "../../api/mtoapi";
import * as XLSX from "xlsx";
import StyledInput from "../../ui/StyledInput";
import StyledSelectField from "../../ui/StyledSelectField";

const ProjectMaster = () => {
  const { addProjects, formData } = useProjectStore();
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();
  const [file, setFile] = useState(null);
  const [headers, setHeaders] = useState([]);
  const [loading, setLoading] = useState(false);
  const[saving, setSaving] = useState(false);
  const [progress, setProgress] = useState(0);
  const [processingMessage, setProcessingMessage] = useState("");
  const navigate = useNavigate();

  const processFile = (selectedFile) => {
    setFile(selectedFile);
    setLoading(true);
    setProgress(0);
    setProcessingMessage("Initializing...");

    const reader = new FileReader();

    reader.onloadstart = () => {
      setProgress(10);
      setProcessingMessage("Started reading file...");
    };

    reader.onprogress = (event) => {
      if (event.lengthComputable) {
        // Calculate progress for file reading (0-50%)
        const fileProgress = (event.loaded / event.total) * 50;
        setProgress(Math.round(fileProgress));
        setProcessingMessage("Reading file...");
      }
    };

    reader.onload = async (event) => {
      try {
        setProgress(60);
        setProcessingMessage("Processing Excel data...");

        // Process in chunks using setTimeout to keep UI responsive
        setTimeout(() => {
          const data = event.target.result;
          setProgress(70);
          setProcessingMessage("Parsing workbook...");

          const workbook = XLSX.read(data, { type: "binary" });
          setProgress(80);
          setProcessingMessage("Extracting headers...");

          const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
          const extractedHeaders = XLSX.utils.sheet_to_json(firstSheet, {
            header: 1,
          })[0];

          setProgress(90);
          setProcessingMessage("Finalizing...");

          setTimeout(() => {
            setHeaders(extractedHeaders);
            setProgress(100);
            setProcessingMessage("Complete!");
            setLoading(false);
          }, 500);
        }, 0);
      } catch (error) {
        console.error("Error processing file:", error);
        setProcessingMessage("Error processing file!");
        setLoading(false);
      }
    };

    reader.onerror = () => {
      setProcessingMessage("Error reading file!");
      setLoading(false);
    };

    // Start reading the file
    reader.readAsBinaryString(selectedFile);
  };

  const onSubmit = async (data) => {
    if (!file) {
      toast.error("Please upload a file before proceeding.");
      return;
    }

    try {
      setSaving(true);
      const form = new FormData();
      form.append("file", file);
      form.append("project", formData.project);
      form.append("code", formData.code);
      form.append("workOrder", formData.workOrder);
      form.append("poDate", formData.poDate);
      form.append("finishedDate", formData.finishedDate);
      form.append("description", formData.description);
      form.append("owner", formData.owner);
      form.append("consultant", formData.consultant);
      form.append("pk", data?.pk?.value);
      form.append("issuedQty", data.issuedQty?.value);
      form.append("consumedQty", data.consumedQty?.value);
      form.append("balanceQty", data.balanceQty?.value);
      form.append("reqQty", data.reqQty?.value);
      form.append("balanceToIssue", data.balanceToIssue?.value);
      form.append("dateName", data.dateName?.value);
      await addProjects(form);
      localStorage.removeItem("projectDetails");
      navigate("/project");
    } catch (error) {
      toast.error("An error occurred during file upload.");
    } finally {
      setSaving(false);
    }
  };
  const options = headers?.map((header) => ({ value: header, label: header }));

  return (
    <>
      <Typography variant="h4" color="#64748B" pt={3}>
        Project Master File
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container pt={4} spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h6" color="textSecondary" mb={1}>
              Add File
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <FileUpload onFileSelect={processFile} />
          </Grid>{" "}
          {loading && (
            <Grid item xs={12}>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap={2}
                my={3}
              >
                <CircularProgress
                  variant="determinate"
                  value={progress}
                  size={60}
                  thickness={4}
                />
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="body1" color="primary" mb={1}>
                    {progress}%
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {processingMessage}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          )}
          {headers.length > 0 && (
            <>
              <Grid item xs={6}>
                <Typography variant="h6" color="textSecondary" mb={1}>
                  Primary Key
                </Typography>
                <Controller
                  name="pk"
                  control={control}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field }) => (
                    <>
                      <StyledSelectField
                        {...field}
                        placeholder={"Primary Key"}
                        options={options}
                      />
                      {errors.pk && (
                        <Typography variant="body2" color="error">
                          Primary Key is required
                        </Typography>
                      )}
                    </>
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6" color="textSecondary" mb={1}>
                  Issued Quantity
                </Typography>
                <Controller
                  name="issuedQty"
                  control={control}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field }) => (
                    <>
                      <StyledSelectField
                        {...field}
                        placeholder={"Issued Quantity in MTO"}
                        options={options}
                      />
                      {errors.issuedQty && (
                        <Typography variant="body2" color="error">
                          Issued Quantity is required
                        </Typography>
                      )}
                    </>
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6" color="textSecondary" mb={1}>
                  Consumed Qty
                </Typography>
                <Controller
                  name="consumedQty"
                  control={control}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field }) => (
                    <>
                      <StyledSelectField
                        {...field}
                        placeholder={"Consumed Quantity in MTO"}
                        options={options}
                      />
                      {errors.consumedQty && (
                        <Typography variant="body2" color="error">
                          ConsumedQty Quantity is required
                        </Typography>
                      )}
                    </>
                  )}
                />
              </Grid>{" "}
              <Grid item xs={6}>
                <Typography variant="h6" color="textSecondary" mb={1}>
                  Balance Qty
                </Typography>
                <Controller
                  name="balanceQty"
                  control={control}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field }) => (
                    <>
                      <StyledSelectField
                        {...field}
                        placeholder={"Balance Quantity in MTO"}
                        options={options}
                      />
                      {errors.balanceQty && (
                        <Typography variant="body2" color="error">
                          Balance Quantity is required
                        </Typography>
                      )}
                    </>
                  )}
                />
              </Grid>{" "}
              <Grid item xs={6}>
                <Typography variant="h6" color="textSecondary" mb={1}>
                  Req Qty
                </Typography>
                <Controller
                  name="reqQty"
                  control={control}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field }) => (
                    <>
                      <StyledSelectField
                        {...field}
                        placeholder={"Req Quantity in MTO"}
                        options={options}
                      />
                      {errors.reqQty && (
                        <Typography variant="body2" color="error">
                          Req Quantity is required
                        </Typography>
                      )}
                    </>
                  )}
                />
              </Grid>{" "}
              <Grid item xs={6}>
                <Typography variant="h6" color="textSecondary" mb={1}>
                  Balance to Issue
                </Typography>
                <Controller
                  name="balanceToIssue"
                  control={control}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field }) => (
                    <>
                      <StyledSelectField
                        {...field}
                        placeholder={"Balance To Issue in MTO"}
                        options={options}
                      />
                      {errors.balanceToIssue && (
                        <Typography variant="body2" color="error">
                          Balance To Issue is required
                        </Typography>
                      )}
                    </>
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6" color="textSecondary" mb={1}>
                  Date Name
                </Typography>
                <Controller
                  name="dateName"
                  control={control}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field }) => (
                    <>
                      <StyledSelectField
                        {...field}
                        placeholder={"Date Name in MTO"}
                        options={options}
                      />
                      {errors.dateName && (
                        <Typography variant="body2" color="error">
                          Date Name is required
                        </Typography>
                      )}
                    </>
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Stack
                  mt={2}
                  justifyContent={"flex-end"}
                  direction={"row"}
                  spacing={2}
                >
                  <StyledButton
                    type="submit"
                    variant="primary"
                    disabled={saving}
                    name={saving ? "Saving..." : "Save"}
                  />
                </Stack>
              </Grid>
            </>
          )}
        </Grid>
      </form>
    </>
  );
};

export default ProjectMaster;
