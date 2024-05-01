import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import NamedContainer from "../../components/common/NamedContainer";
import { Box, Grid, Radio, RadioGroup, FormControlLabel } from "@mui/material";

export default function APIErrorDemo() {
  const [open, setOpen] = React.useState(false);
  const [type, setType] = React.useState("success");

  const [state, setState] = React.useState({
    vertical: "top",
    horizontal: "center",
  });

  const { vertical, horizontal } = state;

  const handleChange = (event) => {
    const [vertical, horizontal] = event.target.value.split("-");
    setState((prevState) => ({
      ...prevState,
      vertical: vertical,
      horizontal: horizontal,
    }));
  };

  const handleClick = (severity) => {
    setType(severity);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const positionSelector = (
    <React.Fragment>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <RadioGroup row value={`${state.vertical}-${state.horizontal}`} onChange={handleChange}>
          <FormControlLabel value="top-center" control={<Radio />} label="Top-Center" />
          <FormControlLabel value="top-left" control={<Radio />} label="Top-Left" />
          <FormControlLabel value="top-right" control={<Radio />} label="Top-Right" />
          <FormControlLabel value="bottom-left" control={<Radio />} label="Bottom-Left" />
          <FormControlLabel value="bottom-right" control={<Radio />} label="Bottom-Right" />
          <FormControlLabel value="bottom-center" control={<Radio />} label="Bottom-Center" />
        </RadioGroup>
      </Box>
    </React.Fragment>
  );

  return (
    <Box sx={{ p: 4, height: "100%", overflow: "auto" }}>
      <Grid container rowSpacing={2}>
        <Grid item xs={12}>
          <NamedContainer title="API Error Demo">
            {positionSelector}
            <Grid container rowSpacing={2}>
              <Grid item xs={6}>
                <Button
                  onClick={() => {
                    handleClick("success");
                  }}
                  sx={{ width: "100%" }}
                >
                  Open Snackbar (Success)
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  onClick={() => {
                    handleClick("error");
                  }}
                  sx={{ width: "100%" }}
                >
                  Open Snackbar (Error)
                </Button>
              </Grid>
            </Grid>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical, horizontal }}>
              <Alert onClose={handleClose} severity={type} variant="filled" sx={{ width: "100%" }}>
                {type === "success" ? `API call was a SUCCESS!` : `ERROR in calling API.`}
              </Alert>
            </Snackbar>
          </NamedContainer>
        </Grid>
      </Grid>
    </Box>
  );
}
