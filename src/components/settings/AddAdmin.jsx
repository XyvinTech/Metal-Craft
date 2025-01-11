import { mdiGreaterThan, mdiKeyboardBackspace } from "@mdi/js";
import Icon from "@mdi/react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import StyledInput from "../../ui/StyledInput";
import { StyledButton } from "../../ui/StyledButton";
import StyledSelectField from "../../ui/StyledSelectField";
import { useAdminStore } from "../../store/adminStore";
import StyledSwitch from "../../ui/StyledSwitch";
import { useDropDownStore } from "../../store/dropDownStore";
import { useEffect } from "react";
import { toast } from "react-toastify";

const AddAdmin = () => {
  const navigate = useNavigate();
  const { addAdmins, fetchSingleAdmin, single, updateAdmin } = useAdminStore();
  const { project, fetchListofProject } = useDropDownStore();
  const location = useLocation();
  const { adminId, isUpdate } = location.state || {};
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  useEffect(() => {
    fetchListofProject();
  }, []);
  useEffect(() => {
    if (isUpdate && adminId) {
      fetchSingleAdmin(adminId);
    }
  }, [adminId, isUpdate]);

  const options =
    project && Array.isArray(project)
      ? project.map((i) => ({
          value: i._id,
          label: i.project,
        }))
      : [];
  useEffect(() => {
    if (single && isUpdate) {
      setValue("name", single.name);
      const selectedProject = options.find(
        (project) => project.value === single.project
      );
      setValue("project", selectedProject);
      setValue("email", single.email);
      setValue("phone", single.phone);
      setValue("status", single.status);
    }
  }, [single, isUpdate, setValue]);
  const onSubmit = async (data) => {
    try {
      const formData = {
        name: data?.name,
        phone: data?.phone,
        email: data?.email,
        project: data?.project?.value,
      };
      if (isUpdate) {
        await updateAdmin(adminId, formData);
      } else {
        formData.password = "12345";
        await addAdmins(formData);
      }
      navigate("/settings");
    } catch (error) {
      toast.error(error?.message);
    }
  };
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container padding={"15px"} spacing={3}>
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
                name="project"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <StyledSelectField
                    {...field}
                    options={options}
                    placeholder={"Choose Project"}
                  />
                )}
              />
              <Stack direction={"row"} spacing={2}>
                <Stack width={"50%"}>
                  <Typography variant="h6" color="textSecondary" mb={1} mt={3}>
                    Email ID
                  </Typography>
                  <Controller
                    name="email"
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
                    name="phone"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <StyledInput {...field} placeholder={"Phone Number"} />
                    )}
                  />
                </Stack>
              </Stack>
              <Stack direction={"row"} pt={4} justifyContent={"space-between"}>
                <Typography variant="h6" color="textSecondary" mb={1} mt={3}>
                  Activate
                </Typography>
                <Controller
                  name="status"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <StyledSwitch
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  )}
                />
              </Stack>
              <Stack
                mt={3}
                direction={"row"}
                justifyContent={"flex-end"}
                spacing={2}
              >
                <StyledButton
                  name={"Cancel"}
                  variant={"secondary"}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(-1);
                  }}
                />
                <StyledButton name={"Create"} variant={"primary"} />
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default AddAdmin;
