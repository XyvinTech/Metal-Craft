import {
  Dialog,
  Typography,
  DialogContent,
  Stack,
  DialogTitle,
  Box,
  DialogActions,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useProjectStore } from "../../store/projectStore";
import { StyledButton } from "../../ui/StyledButton";
import Icon from "@mdi/react";
import { mdiClose } from "@mdi/js";

const StyledSort = ({ open, onClose, columns, Transition }) => {
  const [selectedSort, setSelectedSort] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const { sortCriteria, setSortCriteria } = useProjectStore();

  useEffect(() => {
    if (sortCriteria) {
      const [column, order] = sortCriteria.split(" ");
      setSelectedSort(column);
      setSortOrder(order);
    }
  }, [sortCriteria]);
  const handleSortChange = (event) => {
    setSelectedSort(event.target.value);
  };

  const handleOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleApplySort = () => {
    const criteria = `${selectedSort} ${sortOrder}`;
    setSortCriteria(criteria);
    onClose();
  };

  const handleClose = () => {
    setSelectedSort("");
    setSortOrder("");
    onClose();
  };

  const handleReset = () => {
    setSelectedSort("");
    setSortOrder("");
    setSortCriteria(null);
    onChange(null);
    onClose();
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      fullWidth
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
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h3" color={"#4F4F4F"}>
            Sort
          </Typography>
          <Typography
            onClick={handleClose}
            color="#000"
            style={{ cursor: "pointer" }}
          >
            <Icon path={mdiClose} size={1} />
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ padding: 2 }}>
        <Stack spacing={2}>
          {" "}
          <Typography variant="h6" color="textSecondary">
            Select Order
          </Typography>
          <RadioGroup
            value={sortOrder}
            onChange={handleOrderChange}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              color: "#000",
            }}
          >
            <FormControlLabel
              value="asc"
              control={<Radio />}
              label="Ascending"
              sx={{
                ".MuiTypography-root": {
                  fontSize: "12px",
                },
              }}
            />
            <FormControlLabel
              value="desc"
              control={<Radio />}
              label="Descending"
              sx={{
                ".MuiTypography-root": {
                  fontSize: "12px",
                },
              }}
            />
          </RadioGroup>
          <Typography variant="h6" color="textSecondary">
            Select Column
          </Typography>
          <RadioGroup
            value={selectedSort}
            onChange={handleSortChange}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              color: "#000",
            }}
          >
            {columns.map((column) => (
              <FormControlLabel
                key={column}
                value={column}
                control={<Radio />}
                label={column}
                sx={{
                  ".MuiTypography-root": {
                    fontSize: "12px",
                  },
                }}
              />
            ))}
          </RadioGroup>
        </Stack>
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
        <StyledButton
          name="Cancel"
          onClick={handleReset}
          variant={"secondary"}
        />
        <StyledButton
          variant="primary"
          name="Apply"
          onClick={handleApplySort}
        />
      </DialogActions>
    </Dialog>
  );
};

export default StyledSort;
