import React from "react";
import { Box, Chip, Typography, Grid, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import NamedContainer from "../../components/common/NamedContainer";

const data = [
  { label: "EMD1-H(%)", value: "46.3", status: "Normal" },
  { label: "EMD1-T(°C)", value: "18.4", status: "Normal" },
  { label: "Smoke", value: "", status: "Normal" },
  { label: "water", value: "", status: "Normal" },
  { label: "Address", value: "1", status: "" },
  { label: "Location Name", value: "Lab Room", status: "" },
];

function EnvironmentSensor() {
  return (
    <Box sx={{ p: 4, height: "100%", overflow: "scroll" }}>
      <Grid container rowSpacing={2}>
        <Grid item xs={12}>
          <NamedContainer
            overridetitle
            title={
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <Typography variant="h5" fontWeight="600">
                  Environment Sensor
                </Typography>
                <Chip
                  sx={{ "& .MuiChip-label": { fontWeight: 600 }, borderRadius: "9px" }}
                  label={`EMD 1`}
                  clickable={true}
                />
              </div>
            }
          >
            <TableContainer sx={{ display: "flex", flexDirection: "row", placeContent: "center" }}>
              <Table sx={{ minWidth: 650, width: "10%" }} aria-label="simple table">
                <TableBody>
                  {data.map((row) => (
                    <TableRow key={row.label} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                      <TableCell align="center" component="th" scope="row">
                        {row.label}
                      </TableCell>
                      <TableCell align="center">
                        <Typography component="span" variant="body2" sx={{ fontWeight: "medium" }}>
                          {row.value}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        {row.status && (
                          <Typography
                            component="span"
                            variant="body2"
                            sx={{
                              backgroundColor: row.status === "Normal" ? "#4caf50" : "#f44336",
                              color: "#fff",
                              borderRadius: 1,
                              padding: "3px 10px",
                              display: "inline-block",
                            }}
                          >
                            {row.status}
                          </Typography>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </NamedContainer>
        </Grid>
        <Grid item xs={12}>
          <NamedContainer
            overridetitle
            title={
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <Typography variant="h5" fontWeight="600">
                  Environment Sensor
                </Typography>
                <Chip
                  sx={{ "& .MuiChip-label": { fontWeight: 600 }, borderRadius: "9px" }}
                  label={`EMD 1`}
                  clickable={true}
                />
              </div>
            }
          ></NamedContainer>
        </Grid>
      </Grid>
    </Box>
  );
}

export default EnvironmentSensor;
