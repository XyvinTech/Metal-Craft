import { Grid, Stack, Typography } from "@mui/material";
import StyledInput from "../../ui/StyledInput";
import { Controller, useForm } from "react-hook-form";
import { StyledButton } from "../../ui/StyledButton";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useProjectStore } from "../../store/projectStore";

const ProjectDetail = ({ setActive }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },setValue
  } = useForm();
  const { setFormData } = useProjectStore();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("projectDetails"));
    if (storedData) {
      Object.keys(storedData)?.forEach((key) => {
        setValue(key, storedData[key]);
      });
    }
  }, [setValue]);
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setFormData(data);
      localStorage.setItem("projectDetails", JSON.stringify(data));
      setActive(2);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
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
              name="project"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <>
                  <StyledInput {...field} placeholder={"Project Name"} />
                  {errors.project && (
                    <Typography variant="body2" color="error">
                      Project Name is required
                    </Typography>
                  )}
                </>
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
              rules={{ required: true }}
              render={({ field }) => (
                <>
                  <StyledInput {...field} placeholder={"Project Code"} />
                  {errors.code && (
                    <Typography variant="body2" color="error">
                      Project Code is required
                    </Typography>
                  )}
                </>
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" color="textSecondary" mb={1}>
              Description
            </Typography>
            <Controller
              name="description"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <>
                  <StyledInput
                    {...field}
                    placeholder={"Description"}
                    rows={3}
                  />
                  {errors.description && (
                    <Typography variant="body2" color="error">
                      Description is required
                    </Typography>
                  )}
                </>
              )}
            />
          </Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={6}>
            <Typography variant="h6" color="textSecondary" mb={1}>
              Owner Name
            </Typography>
            <Controller
              name="owner"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <>
                  <StyledInput {...field} placeholder={"Owner Name"} />
                  {errors.owner && (
                    <Typography variant="body2" color="error">
                      Owner Name is required
                    </Typography>
                  )}
                </>
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" color="textSecondary" mb={1}>
              Project Management Consultant
            </Typography>
            <Controller
              name="consultant"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <>
                  <StyledInput
                    {...field}
                    placeholder={"Project Management Consultant Name"}
                  />
                  {errors.consultant && (
                    <Typography variant="body2" color="error">
                      Project Management Consultant is required
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
                name={loading ? "Loading..." : "Next Step"}
              />{" "}
              {/* <StyledButton type="submit" variant="primary" name="Next Step" /> */}
            </Stack>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default ProjectDetail;
