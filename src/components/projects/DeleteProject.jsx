import { mdiTrashCanOutline } from "@mdi/js";
import Icon from "@mdi/react";
import { Box, Dialog, DialogContent, Stack, Typography } from "@mui/material";
import React from "react";
import { StyledButton } from "../../ui/StyledButton";
import { useProjectStore } from "../../store/projectStore";
import { toast } from "react-toastify";

const DeleteProject = ({ open, onClose, onChange, id }) => {
  const { deleteProjects } = useProjectStore();
  const handleSubmit = async () => {
    try {
      await deleteProjects(id);
      onChange();
      onClose();
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogContent>
        <Stack spacing={2} pt={2}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            borderRadius={"50%"}
            height={"44px"}
            width={"44px"}
            bgcolor={"rgba(179, 38, 30, 0.1)"}
            sx={{ cursor: "pointer" }}
            onClick={onClose}
            color={"#B3261E"}
          >
            <Icon path={mdiTrashCanOutline} size={1} />
          </Box>
          <Typography variant="h4" color="textSecondary">
            Delete Project ?
          </Typography>
          <Typography fontSize={"12px"} fontWeight={300} color="#333F49">
            Are you sure you want to permanently delete this project? This
            action cannot be undone.
          </Typography>
          <Stack direction={"row"} justifyContent={"flex-end"} spacing={2}>
            <StyledButton
              name={"Cancel"}
              onClick={onClose}
              variant={"secondary"}
            />
            <StyledButton
              name={"Delete Project"}
              onClick={handleSubmit}
              variant={"danger"}
            />
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteProject;
