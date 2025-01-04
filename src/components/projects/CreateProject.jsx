import { mdiKeyboardBackspace } from "@mdi/js";
import Icon from "@mdi/react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { useState } from "react";
import ProjectDetail from "./ProjectDetail";
import ProjectMaster from "./ProjectMaster";
import { useNavigate } from "react-router-dom";
import { useProjectStore } from "../../store/projectStore";

const CreateProject = () => {
  const [active, setActive] = useState(1);
  const { totalCount } = useProjectStore();
  const navigate = useNavigate();
  return (
    <Grid container padding={3}>
      <Grid item xs={12} mb={4}>
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{ cursor: "pointer" }}
          onClick={() => navigate(-1)}
        >
          <Icon path={mdiKeyboardBackspace} size={1} />
          <Typography variant="h5">Back</Typography>
        </Stack>
      </Grid>
      <Grid
        item
        xs={6}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        minHeight={"80vh"}
      >
        {" "}
        <Box
          borderRadius={"50%"}
          width={"200px"}
          height={"200px"}
          bgcolor={"rgba(63, 126, 201, 0.1)"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography color="#3F7EC9" fontSize={"52px"} fontWeight={400}>
            P{totalCount + 1}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Stack direction={"row"} spacing={2}>
          <Box
            sx={{
              borderTop: `2px solid ${active === 1 ? "#042F61" : "#B1BDC7"}`,
              padding: "8px 10px",
              cursor: "pointer",
            }}
            onClick={() => setActive(1)}
          >
            <Typography color={active === 1 ? "#042F61" : "#B1BDC7"}>
              1 . Project Details
            </Typography>
          </Box>

          <Box
            sx={{
              borderTop: `2px solid ${active === 2 ? "#042F61" : "#B1BDC7"}`,
              width: "fit-content",
              padding: "8px 10px",
            }}
          >
            <Typography color={active === 2 ? "#042F61" : "#B1BDC7"}>
              2. Upload Bill Of Material
            </Typography>
          </Box>
        </Stack>

        <Box paddingTop={4}>
          <Typography variant="h1" color="textSecondary">
            Create New Project
          </Typography>
          {active === 1 && <ProjectDetail setActive={setActive} />}
          {active === 2 && <ProjectMaster setActive={setActive} />}
        </Box>
      </Grid>
    </Grid>
  );
};

export default CreateProject;
