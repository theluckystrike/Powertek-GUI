import React, { useState } from "react";
import { Container, Divider, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import styled from "@emotion/styled";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

import OfflineBoltIcon from "@mui/icons-material/OfflineBolt";

export default function HomePage(props) {
  useState(() => {
    console.log("HomePage props", props);
  });

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
  }));

  const stats = [
    { name: "Power Factor", value: "0.45" },
    { name: "Frequency", value: "50Hz" },
    { name: "RMS Voltage", value: "220V" },
    { name: "Active Power", value: "28.31 KWh" },
    { name: "Reactive Power", value: "0.5VAr" },
    { name: "Apparent Power", value: "65.60kVAh" },
  ];

  return (
    <Box sx={{ p: 4, backgroundColor: "rgb(249, 249, 249, 0.7)", height: "100%" }}>
      <Grid container rowSpacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Item color="#fff" p="4" height="100%">
                <Typography variant="h5" fontWeight="600">
                  INLET
                </Typography>
                <Divider sx={{ bgcolor: "rgba(0, 0, 0, 0.87)", marginTop: "10px", marginBottom: "10px" }} />
                <div style={{ display: "flex", flexDirection: "column", padding: "4" }}>
                  {stats.map((stat) => (
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                      <Typography
                        fontSize="1rem"
                        fontWeight="600"
                        component="div"
                        sx={{ width: "50%", textAlign: "end" }}
                      >
                        {stat.name} :
                      </Typography>
                      <Typography
                        fontSize="1rem"
                        fontWeight="400"
                        component="div"
                        sx={{ width: "50%", textAlign: "center" }}
                      >
                        {stat.value}
                      </Typography>
                    </div>
                  ))}
                </div>
                <Divider sx={{ bgcolor: "rgba(0, 0, 0, 0.87)", marginTop: "10px", marginBottom: "10px" }} />
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
                  <Typography
                    fontSize="2rem"
                    fontWeight="700"
                    component="div"
                    sx={{ width: "50%", textAlign: "center" }}
                  >
                    4.5 W
                  </Typography>
                  <Divider
                    orientation="vertical"
                    sx={{ bgcolor: "rgba(0, 0, 0, 0.87)", marginTop: "10px", marginBottom: "10px" }}
                    flexItem
                  />
                  <Typography
                    fontSize="2rem"
                    fontWeight="700"
                    component="div"
                    sx={{ width: "50%", textAlign: "center", borderRight: "10px" }}
                  >
                    12.4 VA
                  </Typography>
                </div>
              </Item>
            </Grid>
            <Grid item xs={9}>
              <Item color="#fff" p="4" sx={{ height: "calc(100% - 16px)" }}>
                <Typography variant="h5" fontWeight="600">
                  OVERCURRENT CIRCUIT BREAKER
                </Typography>
                <Divider sx={{ bgcolor: "rgba(0, 0, 0, 0.87)", marginTop: "10px", marginBottom: "10px" }} />
                <Grid container spacing={2}>
                  {[...Array(6)].map((x, i) => (
                    <Grid item xs={4}>
                      <Item color="#fff" sx={{ boxShadow: "none" }}>
                        {/* <div style={{ display: "flex", flexDirection: "row" }}> */}
                        <Typography variant="body1" component="div" fontWeight="600" sx={{ textAlign: "center" }}>
                          Circuit Breaker {i + 1}L{(i % 3) + 1} :{" "}
                        </Typography>
                        <Typography variant="body1" component="div" fontWeight="600" sx={{ textAlign: "center" }}>
                          {i + 1} /16 A
                        </Typography>
                        {/* </div> */}
                        {/* <Divider sx={{ bgcolor: "rgba(0, 0, 0, 0.87)", marginTop: "10px", marginBottom: "10px" }} /> */}
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <div>0</div> {/* Label for min value */}
                          <div
                            style={{
                              background: "#e0e0de",
                              height: "10px",
                              width: `100%`,
                              borderRadius: 50,
                              position: "relative", // Needed to position the pointer and value label correctly
                            }}
                          >
                            <div
                              style={{
                                background: `linear-gradient(90deg, rgba(15,218,30,1) 0%, rgba(223,226,16,1) 65%, rgba(255,0,0,1) 100%)`,
                                height: "10px",
                                width: `${((i + 1) / 100) * 100 * 10}%`,
                                borderRadius: "inherit",
                                backgroundAttachment: "fixed",
                              }}
                            ></div>
                            <div
                              style={{
                                position: "absolute",
                                left: `${((i + 1) / 100) * 100 * 10}%`,
                                top: "-5px",
                                width: "2px",
                                height: "20px",
                                background: "#000",
                              }}
                            ></div>
                            <div
                              style={{
                                position: "absolute",
                                left: `${((i + 1) / 100) * 100 * 10 + 1}%`,
                                top: "-4px",
                                color: "#000",
                                fontSize: "12px",
                                fontWeight: "600",
                              }}
                            >{`${i + 1}`}</div>
                          </div>
                          <div>16</div>
                        </div>
                      </Item>
                    </Grid>
                  ))}
                </Grid>
              </Item>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={12}>
            <Item color="#fff" p="4" height="100%">
              <Typography variant="h5" fontWeight="600">
                OUTLET STATUS
              </Typography>
              <Divider sx={{ bgcolor: "rgba(0, 0, 0, 0.87)", marginTop: "10px", marginBottom: "10px" }} />
              <Grid container spacing={1}>
                {[...Array(35)].map((x, i) => (
                  <Grid item xs={1.5}>
                    <Chip
                      sx={{ "& .MuiChip-label": { fontWeight: 600 } }}
                      icon={<OfflineBoltIcon />}
                      color="success"
                      label={`Outlet ${i + 1} (0.00A)`}
                      clickable={true}
                    />
                  </Grid>
                ))}
              </Grid>
            </Item>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Item color="#fff" p="4" height="100%">
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                  <Typography variant="h5" fontWeight="600">
                    EMD Information
                  </Typography>
                  <Chip
                    sx={{ "& .MuiChip-label": { fontWeight: 600 }, borderRadius: "9px" }}
                    // color="success"
                    label={`EMD 1`}
                    // clickable={true}
                    // disabled={true}
                  />
                </div>
                <Divider sx={{ bgcolor: "rgba(0, 0, 0, 0.87)", marginTop: "10px", marginBottom: "10px" }} />
              </Item>
            </Grid>
            <Grid item xs={8}>
              <Item color="#fff" p="4" height="100%">
                <Typography variant="h5" fontWeight="600">
                  PlaceHolder
                </Typography>
                <Divider sx={{ bgcolor: "rgba(0, 0, 0, 0.87)", marginTop: "10px", marginBottom: "10px" }} />
              </Item>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
