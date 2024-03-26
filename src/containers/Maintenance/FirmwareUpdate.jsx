import React, { useState } from "react";
import { Box, Grid, Typography, TextField, Button } from "@mui/material";
import NamedContainer from "../../components/common/NamedContainer";
import Divider from "../../components/common/styled/Divider";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";

const Input = styled("input")({
  display: "none",
});

function FirmwareUpdate() {
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
      setFilename(file.name);
    }
  };

  const handleFileUpload = () => {
    // Handle the file upload logic here
    // console.log(file);
    // You might want to send the file to a server or process it here
  };

  return (
    <Box sx={{ p: 4, height: "100%", overflow: "scroll" }}>
      <Grid container rowSpacing={2}>
        <Grid item xs={12}>
          <NamedContainer title="Firmware Update">
            <Grid container rowSpacing={2}>
              <Grid item xs={12}>
                <Grid container rowSpacing={2}>
                  <Grid item xs={5} sx={{ display: "flex" }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, margin: "auto" }}>
                      Current Version
                    </Typography>
                  </Grid>
                  <Grid item xs={1} sx={{ display: "flex", placeContent: "center" }}>
                    <Divider
                      orientation="vertical"
                      variant="middle"
                      flexItem
                      sx={{ display: "flex", placeContent: "center" }}
                    />
                  </Grid>
                  <Grid item xs={5} sx={{ display: "flex" }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, margin: "auto" }}>
                      PWT_v0.4a04
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container rowSpacing={2}>
                  <Grid item xs={5} sx={{ display: "flex" }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, margin: "auto" }}>
                      Upload File to update
                    </Typography>
                  </Grid>
                  <Grid item xs={1} sx={{ display: "flex", placeContent: "center" }}>
                    <Divider
                      orientation="vertical"
                      variant="middle"
                      flexItem
                      sx={{ display: "flex", placeContent: "center" }}
                    />
                  </Grid>
                  <Grid item xs={5} sx={{ display: "flex" }}>
                    <label htmlFor="firmware-upload">
                      <Input
                        accept=".bin" // Specify the file types you want to accept
                        id="firmware-upload"
                        type="file"
                        onChange={handleFileChange}
                      />
                      <Button variant="contained" component="span" startIcon={<CloudUploadIcon />}>
                        Firmware File
                      </Button>
                    </label>
                    <TextField
                      id="file-name"
                      variant="outlined"
                      disabled
                      value={filename}
                      sx={{ ml: 2 }}
                      size="small"
                    />
                    <Button variant="contained" color="primary" onClick={handleFileUpload} sx={{ ml: 2 }}>
                      Apply
                    </Button>
                    {/* <Box alignItems="center" justifyContent="space-between" mt={2}></Box> */}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </NamedContainer>
        </Grid>
      </Grid>
    </Box>
  );
}

export default FirmwareUpdate;
