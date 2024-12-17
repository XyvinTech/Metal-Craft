import { Grid, Stack, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { StyledButton } from "../../ui/StyledButton";
import FileUpload from "../../ui/FileUpload";

const ProjectMaster = ({ setActive }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log("create project");
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
            <FileUpload/>
          </Grid>

          <Grid item xs={12}>
            <Stack
              mt={2}
              justifyContent={"space-between"}
              direction={"row"}
              spacing={2}
            >
              <StyledButton
                variant="secondary"
                onClick={(e) => {
                  e.preventDefault();
                  setActive(1);
                }}
                name="Previous Step"
              />
              <StyledButton type="submit" variant="primary" name="Import" />{" "}
            </Stack>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default ProjectMaster;
