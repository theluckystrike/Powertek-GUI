import React from "react";
import { Box, Grid, Button, Typography } from "@mui/material";
import NamedContainer from "../../components/common/NamedContainer";
import { styled } from "@mui/material/styles";

const StyledBox = styled(Box)({
  padding: "20px",
  textAlign: "center",
  margin: "10px 0",
  borderRadius: 8,
});

const ActionButton = styled(Button)({
  margin: "10px",
});

function Backup() {
  const handleDownloadBackup = () => {
    // Trigger download of the backup file
    console.log("Download backup initiated");
  };

  const handleFileChange = (event) => {
    // Handle file selected for upload
    const file = event.target.files[0];
    console.log("File selected for upload:", file.name);
    // Further processing can be done here
  };

  const handleUploadBackup = () => {
    // Trigger the upload process
    console.log("Upload backup initiated");
    // Actual upload logic needs to be implemented based on backend API
  };

  return (
    <Box sx={{ p: 4, height: "100%", overflow: "auto" }}>
      <Grid container rowSpacing={2}>
        <Grid item xs={12}>
          <NamedContainer title="Backup Management">
            <StyledBox>
              <Typography variant="h5" gutterBottom>
                Manage System Backups
              </Typography>
              <Box>
                <ActionButton variant="contained" color="primary" onClick={handleDownloadBackup}>
                  Download Backup
                </ActionButton>
                <input
                  accept=".zip, .tar, .tar.gz"
                  style={{ display: "none" }}
                  id="raised-button-file"
                  multiple
                  type="file"
                  onChange={handleFileChange}
                />
                <label htmlFor="raised-button-file">
                  <ActionButton component="span" variant="contained" color="secondary">
                    Select Backup File
                  </ActionButton>
                </label>
                <ActionButton variant="contained" color="success" onClick={handleUploadBackup}>
                  Upload Backup
                </ActionButton>
              </Box>
            </StyledBox>
          </NamedContainer>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Backup;
