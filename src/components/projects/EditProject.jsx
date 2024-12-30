import { mdiClose } from "@mdi/js";
import Icon from "@mdi/react";
import {
  Box,
  Dialog,
  DialogContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import StyledInput from "../../ui/StyledInput";
import { StyledButton } from "../../ui/StyledButton";
import { useProjectStore } from "../../store/projectStore";
import { toast } from "react-toastify";

const EditProject = ({ open, onClose, Transition, data, onChange }) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { updateProject } = useProjectStore();
  useEffect(() => {
    if (data) {
      setValue("project", data?.project);
      setValue("code", data?.code);
      setValue("description", data?.description);
      setValue("owner", data?.owner);
      setValue("consultant", data?.consultant);
    }
  }, [data, setValue]);

  const onSubmit = async (form) => {
    try {
      await updateProject(data?._id, form);
      onChange();
      onClose();
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      fullWidth
      maxWidth="xs"
      PaperProps={{
        sx: {
          position: "absolute",
          right: 0,
          top: 0,
          margin: 0,
          height: "200vh",
          borderRadius: "0",
        },
      }}
    >
      <DialogContent>
        <Stack
          spacing={3}
          direction={"row"}
          justifyContent={"space-between"}
          pt={2}
        >
          <Typography variant="h1" color="textSecondary">
            Edit Project
          </Typography>
          <Box
            display="flex"
            justifyContent="flex-end"
            sx={{ cursor: "pointer" }}
            onClick={onClose}
          >
            <Icon path={mdiClose} size={1} />
          </Box>
        </Stack>
        <Typography variant="h4" color="textTertiary" pt={3}>
          Project details
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container pt={4} spacing={3}>
            <Grid item xs={12}>
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
            <Grid item xs={12}>
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
            <Grid item xs={12}>
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
            <Grid item xs={12}>
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
            <Grid item xs={12}>
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
                justifyContent={"space-between"}
                direction={"row"}
                spacing={2}
              >
                <StyledButton variant="secondary" name={"Cancel"} />
                <StyledButton
                  type="submit"
                  variant="primary"
                  name={"Save"}
                />{" "}
              </Stack>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProject;