import { mdiGreaterThan, mdiKeyboardBackspace } from "@mdi/js";
import Icon from "@mdi/react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import StyledInput from "../../ui/StyledInput";
import { StyledButton } from "../../ui/StyledButton";
import StyledSelectField from "../../ui/StyledSelectField";

const AddAdmin = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <>
      <Stack
        direction={"row"}
        padding={"10px"}
        bgcolor={"#fff"}
        height={"70px"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <Box sx={{ cursor: "pointer" }} onClick={() => navigate(-1)}>
            <Icon path={mdiKeyboardBackspace} size={1} />
          </Box>
          <Typography variant="h1">Settings</Typography>
          <Icon path={mdiGreaterThan} size={0.8} />
          <Typography variant="h4">Add Admin</Typography>
        </Stack>
      </Stack>
      <Grid container padding={"20px"} spacing={3}>
        <Grid item xs={8}>
          <Box
            bgcolor={"#fff"}
            border={"1px solid rgba(0, 0, 0, 0.12)"}
            borderRadius={"12px"}
            padding={"20px"}
          >
            <Typography variant="h6" color="textSecondary" mb={1}>
              Name
            </Typography>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <StyledInput {...field} placeholder={"Enter Name"} />
              )}
            />
            <Typography variant="h6" color="textSecondary" mb={1} mt={3}>
              Project
            </Typography>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <StyledSelectField {...field} placeholder={"Choose Project"} />
              )}
            />
            <Stack direction={"row"} spacing={2}>
              <Stack width={"50%"}>
                <Typography variant="h6" color="textSecondary" mb={1} mt={3}>
                  Email ID
                </Typography>
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <StyledInput {...field} placeholder={"Email Id"} />
                  )}
                />
              </Stack>
              <Stack width={"50%"}>
                <Typography variant="h6" color="textSecondary" mb={1} mt={3}>
                  Phone Number
                </Typography>
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <StyledInput {...field} placeholder={"Phone Number"} />
                  )}
                />
              </Stack>
            </Stack>
            <Stack
              mt={3}
              direction={"row"}
              justifyContent={"flex-end"}
              spacing={2}
            >
              <StyledButton name={"Cancel"} variant={"secondary"} />
              <StyledButton name={"Create"} variant={"primary"} />
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default AddAdmin;
