import {
  Dialog,
  Typography,
  DialogContent,
  Stack,
  DialogTitle,
  Box,
  DialogActions,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import StyledInput from "../../ui/StyledInput";
import { useProjectStore } from "../../store/projectStore";
import { useEffect } from "react";
import { StyledButton } from "../../ui/StyledButton";
import Icon from "@mdi/react";
import { mdiClose } from "@mdi/js";

const StyledFilter = ({ open, onClose, columns, Transition }) => {
  const { control, handleSubmit, reset, setValue } = useForm();
  const { filters, setFilters } = useProjectStore();

  useEffect(() => {
    if (filters) {
      columns?.forEach((column) => {
        if (filters[column]) {
          setValue(column, filters[column]);
        } else {
          setValue(column, "");
        }
      });
    }
  }, [filters, columns, setValue]);

  const onSubmit = (data) => {
    const filteredData = {};

    columns.forEach((column) => {
      if (data?.[column]) {
        filteredData[column] = data[column];
      }
    });

    setFilters(filteredData);
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      TransitionComponent={Transition}
      maxWidth="xs"
      PaperProps={{
        sx: {
          position: "absolute",
          top: 0,
          right: 0,
          margin: 0,
          minHeight: "100vh",
          width: "430px",
        },
      }}
    >
      {" "}
      <DialogTitle
        sx={{
          height: "auto",
          position: "sticky",
          top: 0,
          zIndex: 10,
          background: "#fff",
          padding: 3,
          borderBottom: "1px solid #E0E0E0",
        }}
      >
        {" "}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h3" color={"#4F4F4F"}>
            Filter
          </Typography>
          <Typography
            onClick={onClose}
            color="#000"
            style={{ cursor: "pointer" }}
          >
            <Icon path={mdiClose} size={1} />
          </Typography>
        </Box>
      </DialogTitle>{" "}
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent sx={{ padding: 2 }}>
          {columns.map((column) => (
            <Stack key={column} mb={2}>
              <Typography variant="h9" color="textSecondary" mb={1}>
                {column}
              </Typography>
              <Controller
                name={column}
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <>
                    <StyledInput
                      {...field}
                      placeholder={`Search ${column}`}
                      id={column}
                      fullWidth
                    />
                  </>
                )}
              />
            </Stack>
          ))}
        </DialogContent>
        <DialogActions
          sx={{
            position: "sticky",
            bottom: 0,
            zIndex: 10,
            background: "#fff",
            borderTop: "1px solid #E0E0E0",
            padding: 2,
          }}
        >
          {" "}
          <StyledButton
            variant="secondary"
            name="Reset"
            onClick={(e) => {
              e.preventDefault();
              filters && setFilters({});
              onClose();
            }}
          />
          <StyledButton variant="primary" name="Apply" type="submit" />
        </DialogActions>{" "}
      </form>
    </Dialog>
  );
};

export default StyledFilter;
