import React, { useState } from "react";
import {
  Box,
  Grid,
  Button,
  Typography,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
} from "@mui/material";
import NamedContainer from "../../components/common/NamedContainer";
import { styled } from "@mui/material/styles";

const StyledPaper = styled(Paper)({
  backgroundColor: "#ffeb3b", // yellow background
  padding: "20px",
  textAlign: "center",
  position: "relative",
});

const WarningBox = styled(Box)({
  backgroundColor: "white",
  color: "black",
  border: "1px solid black",
  padding: "10px",
  margin: "10px 0",
});

const ApplyButton = styled(Button)({
  backgroundColor: "red", // red background, not green
  "&:hover": {
    backgroundColor: "darkred",
  },
});

function ResetRestore() {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleApply = () => {
    // Implement what happens when apply is clicked
    console.log("System will be reset to defaults");
    handleCloseDialog(); // Close dialog after applying
  };

  return (
    <Box sx={{ p: 4, height: "100%", overflow: "auto" }}>
      <Grid container rowSpacing={2}>
        <Grid item xs={12}>
          <NamedContainer title="Reset/Restore">
            <StyledPaper elevation={3}>
              <Typography variant="h4" color="error" gutterBottom>
                Reset To Default w/o IP
              </Typography>
              <WarningBox>
                <Typography variant="h6">
                  If you click 'Apply', the system will be reset to defaults immediately. The entire system
                  configuration will be overwritten. The IP address, Subnet Mask, Gateway, and DNS Server will not be
                  changed. The password will be set to 'admin'.
                </Typography>
              </WarningBox>
              <Typography variant="h5" color="error" gutterBottom>
                Are you sure you want to proceed?
              </Typography>
              <ApplyButton variant="contained" size="large" onClick={handleOpenDialog}>
                Apply
              </ApplyButton>
            </StyledPaper>
          </NamedContainer>
        </Grid>
      </Grid>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Reset"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you really want to reset the system settings to default without changing IP settings? This action cannot
            be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleApply} autoFocus color="error">
            Proceed
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ResetRestore;
