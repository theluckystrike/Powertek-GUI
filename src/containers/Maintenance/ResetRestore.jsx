import React from "react";
import { Box, Grid, Button, Typography, Paper } from "@mui/material";
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
  backgroundColor: "red", // green background
  "&:hover": {
    backgroundColor: "darkred",
  },
});

function ReserRestore() {
  const handleApply = () => {
    // Implement what happens when apply is clicked
    // console.log("Apply was clicked");
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
                  If you click 'Apply', system will be reset to defaults immediately. The entire system configuration
                  will be overwritten. The IP address, Subnet Mask, Gateway, and DNS Server will not be changed. The
                  password will be set to 'admin'.
                </Typography>
              </WarningBox>
              <Typography variant="h5" color="error" gutterBottom>
                Are you sure you want to proceed?
              </Typography>
              <ApplyButton variant="contained" size="large" onClick={handleApply}>
                Apply
              </ApplyButton>
            </StyledPaper>
          </NamedContainer>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ReserRestore;
