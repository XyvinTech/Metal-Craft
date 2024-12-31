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
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import { mdiClose, mdiDotsVertical, mdiMenu, mdiPlus } from "@mdi/js";
import Icon from "@mdi/react";
import StyledSearchbar from "../ui/StyledSearchbar";
import { useNavigate } from "react-router-dom";
import { useProjectStore } from "../store/projectStore";
import moment from "moment";
import EditProject from "../components/projects/EditProject";
import DeleteProject from "../components/projects/DeleteProject";

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
  const [id, setId] = useState("");
  const [isChange, setIsChange] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const navigate = useNavigate();
  const { projects, getProjects, fetchProjectById, singleProject } =
    useProjectStore();

  useEffect(() => {
    getProjects();
  }, [isChange]);

  const formatIndianDate = (date) => {
    return moment(date).format("DD-MM-YYYY");
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleMenuClick = (event, project) => {
    setMenuAnchor(event.currentTarget);
    setSelectedProject(project);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleDetails = () => {
    fetchProjectById(selectedProject._id);
    setDialogOpen(true);
    handleMenuClose();
  };

  const handleEdit = () => {
    fetchProjectById(selectedProject._id);
    setEditOpen(true);
    handleMenuClose();
  };

  const handleDelete = () => {
    setDeleteOpen(true);
    handleMenuClose();
  };

  return (
    <>
      <Stack
        direction={"row"}
        padding={"25px"}
        bgcolor={"#fff"}
        height={"80px"}
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
                <Icon path={mdiPlus} size={1} /> Add Project
              </>
            }
            onClick={() => navigate("/project/create-project")}
          />
        </Stack>
      </Stack>
      <Box padding={"25px"}>
        <Stack
          direction={"row"}
          justifyContent={"end"}
          paddingBottom={"15px"}
          alignItems={"center"}
        >
          <Stack direction={"row"} spacing={2}>
            <StyledSearchbar placeholder={"Search"} />
          </Stack>
        </Stack>
        <Grid container spacing={2}>
          {projects?.map((item, index) => (
            <Grid item md={1.7} sx={{ cursor: "pointer" }} key={item._id}>
              <Stack
                bgcolor={"#fff"}
                borderRadius={"8px"}
                onClick={() => navigate(`/project/${item._id}`)}

                padding={"16px"}
                height={"260px"}
              >
                <Stack
                  bgcolor={"#F8F8F8"}
                  borderRadius={"8px"}
                  padding={"20px"}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  position={"relative"}
                  height={"150px"}
                >
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      fetchProjectById(item._id);

                      handleMenuClick(e, item);
                      setId(index);
                    }}
                    style={{
                      position: "absolute",
                      top: "0px",
                      right: "0px",
                    }}
                  >
                    <Icon path={mdiDotsVertical} size={0.8} color={"#333"} />
                  </IconButton>
                  <Box
                    borderRadius={"50%"}
                    width={"93px"}
                    height={"93px"}
                    bgcolor={"rgba(63, 126, 201, 0.1)"}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Typography
                      color="#3F7EC9"
                      fontSize={"32px"}
                      fontWeight={400}
                    >
                      P{index + 1}
                    </Typography>
                  </Box>
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

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
      >
        <MenuItem
          sx={{ fontSize: "12px", color: "#000" }}
          onClick={handleDetails}
        >
          Details
        </MenuItem>
        <MenuItem sx={{ fontSize: "12px", color: "#000" }} onClick={handleEdit}>
          Edit
        </MenuItem>
        <MenuItem
          sx={{ fontSize: "12px", color: "red" }}
          onClick={handleDelete}
        >
          Delete
        </MenuItem>
      </Menu>

      <Dialog
        open={dialogOpen}
        TransitionComponent={Transition}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="xs"
        PaperProps={{
          sx: {
            position: "absolute",
            right: 0,
            top: 0,
            margin: 0,
            borderRadius: "0",
            // height: "auto", 
            minHeight: "100vh", 
          },
        }}
      >
        <DialogContent>
          <Stack spacing={3}>
            <Box
              display="flex"
              justifyContent="flex-end"
              sx={{ cursor: "pointer" }}
              onClick={handleCloseDialog}
            >
              <Icon path={mdiClose} size={1} />
            </Box>
            <Stack direction={"row"} alignItems={"center"}>
              <Box
                borderRadius={"50%"}
                width={"70px"}
                height={"70px"}
                bgcolor={"rgba(63, 126, 201, 0.1)"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Typography color="#3F7EC9" fontSize={"32px"} fontWeight={400}>
                  P{id + 1}
                </Typography>
              </Box>
              <Stack direction={"column"} paddingLeft={"10px"} spacing={1}>
                <Typography variant="h4" color="textSecondary">
                  {singleProject?.project}
                </Typography>
                <Typography variant="h5" color="textTertiary">
                  {singleProject?.code}
                </Typography>
              </Stack>
            </Stack>
            <Stack spacing={1}>
              <Typography variant="h7" color="textTertiary">
                Description
              </Typography>
              <Typography variant="h7" color="textSecondary">
                {singleProject?.description}
              </Typography>
            </Stack>
            <Stack spacing={1}>
              <Typography variant="h7" color="textTertiary">
                Owner Name
              </Typography>
              <Typography variant="h7" color="textSecondary">
                {singleProject?.owner}
              </Typography>
            </Stack>
            <Stack spacing={1}>
              <Typography variant="h7" color="textTertiary">
                Project Management Consultant
              </Typography>
              <Typography variant="h7" color="textSecondary">
                {singleProject?.consultant}
              </Typography>
            </Stack>
            <Stack spacing={1}>
              <Typography variant="h7" color="textTertiary">
                Created Date
              </Typography>
              <Typography variant="h7" color="textSecondary">
                {formatIndianDate(singleProject?.createdAt)}
              </Typography>
            </Stack>
          </Stack>
        </DialogContent>
      </Dialog>
      <EditProject
        open={editOpen}
        onClose={() => {
          setEditOpen(false);
        }}
        data={singleProject}
        Transition={Transition}
        onChange={() => {
          setIsChange(!isChange);
        }}
      />
      <DeleteProject
        open={deleteOpen}
        onClose={() => {
          setDeleteOpen(false);
        }}
        id={selectedProject?._id}
        onChange={() => {
          setIsChange(!isChange);
        }}
      />
    </>
  );
};

export default Projects;
