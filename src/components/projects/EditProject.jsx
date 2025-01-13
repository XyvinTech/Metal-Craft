import { mdiClose } from "@mdi/js";
import Icon from "@mdi/react";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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
import { StyledCalender } from "../../ui/StyledCalender";

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
      setValue("workOrder", data?.workOrder);
      setValue("poDate", data?.poDate);
      setValue("finishedDate", data?.finishedDate);
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
          minHeight: "100vh",
          borderRadius: "0",
        },
      }}
    >
      <DialogTitle
        sx={{
          height: "auto",
          position: "sticky",
          top: 0,
          zIndex: 10,
          background: "#fff",
          padding: 2,
          borderBottom: "1px solid #E0E0E0",
        }}
      >
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
        </Stack>{" "}
      </DialogTitle>{" "}
      <DialogContent>
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
                Work Order
              </Typography>
              <Controller
                name="workOrder"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <>
                    <StyledInput {...field} placeholder={"Work Order"} />
                    {errors.workOrder && (
                      <Typography variant="body2" color="error">
                        Work Order is required
                      </Typography>
                    )}
                  </>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" color="textSecondary" mb={1}>
                Po Date
              </Typography>
              <Controller
                name="poDate"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <>
                    <StyledCalender {...field} />
                    {errors.poDate && (
                      <Typography variant="body2" color="error">
                        po Date is required
                      </Typography>
                    )}
                  </>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" color="textSecondary" mb={1}>
              Finished Date
              </Typography>
              <Controller
                name="finishedDate"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <>
                    <StyledCalender {...field} />
                    {errors.finishedDate && (
                      <Typography variant="body2" color="error">
                       finished Date is required
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
            </Grid>{" "}
          </Grid>
          <DialogActions
            sx={{
              position: "sticky",
              bottom: 0,
              zIndex: 10,
              background: "#fff",
              borderTop: "1px solid #E0E0E0",
              padding: 4,
            }}
          >
            <StyledButton variant="secondary" name={"Cancel"} />
            <StyledButton type="submit" variant="primary" name={"Save"} />{" "}
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProject;
