import { Grid, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { StyledButton } from "../../ui/StyledButton";
import FileUpload from "../../ui/FileUpload";
import { toast } from "react-toastify";
import { useState } from "react";
import { useProjectStore } from "../../store/projectStore";
import { useNavigate } from "react-router-dom";
import { addUploadFile } from "../../api/mtoapi";

const ProjectMaster = () => {
  const { lastProjectId } = useProjectStore();
  const { handleSubmit } = useForm();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async () => {
    if (!file) {
      toast.error("Please upload a file before proceeding.");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("project", lastProjectId);

      await addUploadFile(formData);

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
          <Grid item xs={12} mb={16}>
            <FileUpload onFileSelect={setFile} />
          </Grid>
          <Grid item xs={12}>
            <Stack
              mt={2}
              justifyContent={"space-between"}
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
