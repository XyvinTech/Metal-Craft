import { mdiKeyboardBackspace } from "@mdi/js";
import Icon from "@mdi/react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { useState } from "react";
import ProjectDetail from "./ProjectDetail";
import ProjectMaster from "./ProjectMaster";

const CreateProject = () => {
  const [active, setActive] = useState(1);
  return (
    <Grid container padding={3}>
      <Grid item xs={12} mb={4}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Icon path={mdiKeyboardBackspace} size={1} />
          <Typography variant="h5">Back</Typography>
        </Stack>
      </Grid>
      <Grid
        item
        xs={6}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}minHeight={"80vh"}
      >
        {" "}
        <img
          src="https://img.freepik.com/free-photo/gray-smooth-textured-paper-background_53876-101833.jpg"
          alt="Logo"
          width={"374px"}
          height="374px"
        />
      </Grid>
      <Grid item xs={6}>
        <Stack direction={"row"} spacing={2}>
          <Box
            sx={{
              borderTop: `2px solid ${active === 1 ? "#042F61" : "#B1BDC7"}`,
              padding: "8px 10px",
            }}
          >
            <Typography>1 . Project Details</Typography>
          </Box>

          <Box
            sx={{
              borderTop: `2px solid ${active === 2 ? "#042F61" : "#B1BDC7"}`,
              width: "fit-content",
              padding: "8px 10px",
            }}
          >
            <Typography>2. Upload Bill Of Material</Typography>
          </Box>
        </Stack>

        
       <Box paddingTop={4}>
       <Typography variant="h1" color="textSecondary">
        Create New Project
      </Typography>
        {active === 1 && <ProjectDetail  setActive={setActive}/>}
        {active === 2 && <ProjectMaster setActive={setActive}/>}
       </Box>
      </Grid>
    </Grid>
  );
};

export default CreateProject;
