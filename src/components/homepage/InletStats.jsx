import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Divider from "../common/styled/Divider";
import { ReportingBar } from "../common/ReportingBar";

function InletStats({ minCurrent = 0, maxCurrent = 16, currentMap, stats, realPower, apparentPower }) {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        alignContent: "center",
        justifyContent: "center",
        margin: "auto",
        flexDirection: "row",
        flexGrow: 1,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          justifyContent: "center",
          flexGrow: 1,
          width: "50%",
        }}
      >
        <Grid
          container
          spacing={1}
          sx={{ display: "flex", alignItems: "center", justifyContent: "center", margin: "auto", width: "100%" }}
        >
          {Object.keys(currentMap).map((key) => (
            <Grid item xs={10}>
              {/* <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                <div style={{ display: "flex", flexDirection: "row", width: "85%", margin: "auto" }}>
                  <Typography variant="body1" component="div" fontWeight="600" sx={{ textAlign: "end", width: "25%" }}>
                    {key}:
                  </Typography>
                  <Typography
                    variant="body1"
                    component="div"
                    fontWeight="600"
                    sx={{ textAlign: "center", width: "25%" }}
                  >
                    {currentMap[key]}A
                  </Typography>
                  <Typography
                    variant="body1"
                    component="div"
                    fontWeight="600"
                    sx={{ textAlign: "start", width: "25%" }}
                  >
                    |
                  </Typography>
                  <Typography
                    variant="body1"
                    component="div"
                    fontWeight="600"
                    sx={{ textAlign: "start", width: "25%" }}
                  >
                    {parseInt((currentMap[key] * 100) / (maxCurrent - minCurrent))}%
                  </Typography>
                </div>
                <div style={{ width: "100%" }}>
                  <ReportingBar min={minCurrent} max={maxCurrent} value={currentMap[key]} />
                </div>
              </div> */}

              <Typography variant="body1" component="div" fontWeight="600" sx={{ textAlign: "center" }}>
                {key}: {currentMap[key]}A | {parseInt((currentMap[key] * 100) / (maxCurrent - minCurrent))}%
              </Typography>
              <ReportingBar min={minCurrent} max={maxCurrent} value={currentMap[key]} />
            </Grid>
          ))}
        </Grid>
        <Divider sx={{ marginTop: "10px", marginBottom: "10px" }} />
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
          <Typography fontSize="2rem" fontWeight="700" component="div" sx={{ width: "50%", textAlign: "center" }}>
            {realPower} W
          </Typography>
          <Divider orientation="vertical" sx={{ marginTop: "10px", marginBottom: "10px" }} flexItem />
          <Typography
            fontSize="2rem"
            fontWeight="700"
            component="div"
            sx={{ width: "50%", textAlign: "center", borderRight: "10px" }}
          >
            {apparentPower} VA
          </Typography>
        </div>
      </div>
      <div>
        <Divider orientation="vertical" sx={{ marginRight: "10px", marginLeft: "10px", height: "-1%" }} />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "50%",
          justifyContent: "center",
          alignContent: "center",
          flexGrow: 1,
          padding: "4",
        }}
      >
        {stats.map((stat) => (
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <Typography fontSize="1rem" fontWeight="600" component="div" sx={{ width: "50%", textAlign: "end" }}>
              {stat.name} :
            </Typography>
            <Typography fontSize="1rem" fontWeight="400" component="div" sx={{ width: "50%", textAlign: "center" }}>
              {stat.value}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InletStats;
