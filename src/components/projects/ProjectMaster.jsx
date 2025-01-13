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
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const onFileSelect = (selectedFile) => {
    setFile(selectedFile);
    extractHeaders(selectedFile);
  };

  const extractHeaders = (file) => {
    setLoader(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const firstSheetName = workbook.SheetNames[0];
      const firstSheet = workbook.Sheets[firstSheetName];
      const headers = XLSX.utils.sheet_to_json(firstSheet, { header: 1 })[0]; // Extract the first row as headers
      setHeaders(headers); // Store headers in state
      setLoader(false);
    };
    reader.readAsBinaryString(file);
  };

  const onSubmit = async (data) => {
    if (!file) {
      toast.error("Please upload a file before proceeding.");
      return;
    }

    try {
      setLoading(true);
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
      setLoading(false);
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
            <FileUpload onFileSelect={onFileSelect} />
          </Grid>{" "}
          {headers?.length > 0 ? (
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
                    disabled={loading}
                    name={loading ? "Saving..." : "Save"}
                  />
                </Stack>
              </Grid>
            </>
          ) : (
            <Grid
              item
              xs={12}
              display="flex"
              justifyContent="center"
              alignItems="center"
              style={{ height: "100%" }}
            >
              <Box>
                {loader && (
                  <>
                    <Typography>Please wait Uploading...</Typography> <CircularProgress />
                  </>
                )}
              </Box>
            </Grid>
          )}
        </Grid>
      </form>
    </>
  );
};

export default ProjectMaster;
