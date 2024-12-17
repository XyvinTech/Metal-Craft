import { Grid, Stack, Typography } from "@mui/material";
import StyledInput from "../../ui/StyledInput";
import { Controller, useForm } from "react-hook-form";
import { StyledButton } from "../../ui/StyledButton";

const ProjectDetail = ({ setActive }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    setActive(2);
    console.log("create project");
  };
  return (
    <>
      <Typography variant="h4" color="#64748B" pt={3}>
        Project Details
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container pt={4} spacing={3}>
          <Grid item xs={6}>
            <Typography variant="h6" color="textSecondary" mb={1}>
              Project Name
            </Typography>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <StyledInput {...field} placeholder={"Project Name"} />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" color="textSecondary" mb={1}>
              Project Code
            </Typography>
            <Controller
              name="code"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <StyledInput {...field} placeholder={"Project Code"} />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" color="textSecondary" mb={1}>
              Description
            </Typography>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <StyledInput {...field} placeholder={"Description"} rows={3} />
              )}
            />
          </Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={6}>
            <Typography variant="h6" color="textSecondary" mb={1}>
              Owner Name
            </Typography>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <StyledInput {...field} placeholder={"Owner Name"} />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" color="textSecondary" mb={1}>
              Project Management Consultant
            </Typography>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <StyledInput {...field} placeholder={"Name"} />
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
              <StyledButton type="submit" variant="primary" name="Next Step" />{" "}
              {/* <StyledButton type="submit" variant="primary" name="Next Step" /> */}
            </Stack>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default ProjectDetail;
