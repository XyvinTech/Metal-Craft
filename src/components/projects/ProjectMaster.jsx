import { Grid, Stack, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { StyledButton } from "../../ui/StyledButton";
import FileUpload from "../../ui/FileUpload";
import { toast } from "react-toastify";
import { useState } from "react";
import { useProjectStore } from "../../store/projectStore";
import { useNavigate } from "react-router-dom";
import { addUploadFile } from "../../api/mtoapi";
import StyledInput from "../../ui/StyledInput";

const ProjectMaster = () => {
  const { addProjects, formData } = useProjectStore();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
      form.append("description", formData.description);
      form.append("owner", formData.owner);
      form.append("consultant", formData.consultant);
      form.append("pk", data.pk);
      form.append("issuedQty", data.issuedQty);
      form.append("consumedQty", data.consumedQty);
      form.append("dateName", data.dateName);
      await addProjects(form);
      navigate("/project");
    } catch (error) {
      toast.error("An error occurred during file upload.");
    } finally {
      setLoading(false);
    }
  };

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
            <FileUpload onFileSelect={setFile} />
          </Grid>{" "}
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
                  <StyledInput {...field} placeholder={"Primary Key"} />
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
                  <StyledInput
                    {...field}
                    placeholder={"Issued Quantity in MTO"}
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
                  <StyledInput
                    {...field}
                    placeholder={"Consumed Quantity in MTO"}
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
              Date Name
            </Typography>
            <Controller
              name="dateName"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <>
                  <StyledInput {...field} placeholder={"Date Name in MTO"} />
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
                name={loading ? "Saving..." : "Save"}
              />
            </Stack>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default ProjectMaster;
