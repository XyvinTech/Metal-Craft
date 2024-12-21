import React, { useEffect, useState } from "react";
import { StyledButton } from "../ui/StyledButton";
import {
  Box,
  Dialog,
  DialogContent,
  Grid,
  Slide,
  Stack,
  Typography,
} from "@mui/material";
import Icon from "@mdi/react";
import { mdiClose, mdiInformationOutline, mdiPlus } from "@mdi/js";
import StyledSearchbar from "../ui/StyledSearchbar";
import image from "../assets/images/project.png";
import { useNavigate } from "react-router-dom";
import { useProjectStore } from "../store/projectStore";
const Transition = React.forwardRef((props, ref) => (
  <Slide
    direction="left"
    ref={ref}
    {...props}
    timeout={{ enter: 1000, exit: 500 }}
  />
));
const Projects = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { projects, getProjects, fetchProjectById, singleProject } =
    useProjectStore();
  useEffect(() => {
    getProjects();
  }, []);

  const handleClose = () => {
    setDialogOpen(false);
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
        <Stack>
          <Typography variant="h1" color={"textSecondary"}>
            Projects
          </Typography>
        </Stack>
        <Stack direction={"row"} spacing={2} justifyContent={"flex-end"}>
          <StyledButton
            variant={"primary"}
            name={
              <>
                <Icon path={mdiPlus} size={1} />
                Add Project
              </>
            }
            onClick={() => navigate("/project/create-project")}
          />
        </Stack>
      </Stack>
      <Box padding={"15px"}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          paddingBottom={"15px"}
          alignItems={"center"}
        >
          <Stack direction={"row"} spacing={1}>
            <StyledButton variant={"filterPrimary"} name={"All"} />
            <StyledButton variant={"filterSecondary"} name={"New Project"} />
          </Stack>
          <Stack direction={"row"} spacing={2}>
            <StyledSearchbar
              placeholder={"Search"}
              //   onchange={(e) => setSearch(e.target.value)}
            />
          </Stack>
        </Stack>
        <Grid container spacing={2}>
          {" "}
          {projects?.map((item) => (
            <Grid item md={1.7} sx={{ cursor: "pointer" }}>
              <Stack
                bgcolor={"#FFFFFF"}
                borderRadius={"8px"}
                onClick={() => navigate(`/project/${item._id}`)}
                padding={"16px"}
              >
                <Stack
                  bgcolor={"#F8F8F8"}
                  borderRadius={"8px"}
                  padding={"20px"}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  position={"relative"}
                >
                  <Icon
                    path={mdiInformationOutline}
                    onClick={(e) => {
                      e.stopPropagation();
                      fetchProjectById(item._id);
                      setDialogOpen(true);
                    }}
                    size={0.8}
                    color={"#333"}
                    style={{
                      cursor: "pointer",
                      position: "absolute",
                      top: "8px",
                      right: "8px",
                    }}
                  />
                  <img
                    src={image}
                    style={{ borderRadius: "50%" }}
                    width={"93px"}
                    height={"93px"}
                  />
                </Stack>

                <Typography
                  pt={2}
                  pb={1}
                  variant="h5"
                  color="textSecondary"
                  textAlign={"center"}
                >
                  {item?.project}
                </Typography>
                <Typography
                  variant="h6"
                  color="textSecondary"
                  textAlign={"center"}
                >
                  {item?.owner}
                </Typography>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Dialog
        open={dialogOpen}
        TransitionComponent={Transition}
        onClose={handleClose}
        fullWidth
        maxWidth="xs"
        PaperProps={{
          sx: {
            position: "absolute",
            right: 0,
            top: 0,
            margin: 0,
            height: "100vh",
            borderRadius: "0",
          },
        }}
      >
        <DialogContent>
          <Stack spacing={3}>
            <Box
              display="flex"
              justifyContent="flex-end"
              sx={{ cursor: "pointer" }}
              onClick={handleClose}
            >
              <Icon path={mdiClose} size={1} />
            </Box>
            <Stack direction={"row"} alignItems={"center"}>
              <img
                src={image}
                style={{ borderRadius: "50%" }}
                width={"70px"}
                height={"70px"}
              />
              <Stack direction={"column"} paddingLeft={"10px"} spacing={1}>
                <Typography variant="h4" color="textSecondary">
                  {singleProject?.project}
                </Typography>
                <Typography variant="h5" color="textTertiary">
                  {singleProject?.code}
                </Typography>
              </Stack>
            </Stack>{" "}
            <Stack spacing={1}>
              <Typography variant="h7" color="textTertiary">
                Description
              </Typography>
              <Typography variant="h7" color="textSecondary">
                {singleProject?.description}
              </Typography>
            </Stack>{" "}
            <Stack spacing={1}>
              <Typography variant="h7" color="textTertiary">
                Owner Name
              </Typography>
              <Typography variant="h7" color="textSecondary">
                {singleProject?.owner}
              </Typography>
            </Stack>{" "}
            <Stack spacing={1}>
              <Typography variant="h7" color="textTertiary">
                Project Management Consultant
              </Typography>
              <Typography variant="h7" color="textSecondary">
                {singleProject?.consultant}
              </Typography>
            </Stack>{" "}
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Projects;
