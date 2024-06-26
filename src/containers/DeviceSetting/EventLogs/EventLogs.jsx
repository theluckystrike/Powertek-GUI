import React from "react";
import NamedContainer, { CollapsiableNamedContainer } from "../../../components/common/NamedContainer";
import { Box, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import styled from "@emotion/styled";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderColor: theme.palette.mode === "dark" ? "#233a57" : "#d4dbe5",
}));

const logsData = [
  {
    date: "06/02/2024",
    time: "12:09:01",
    severity: "Warning",
    event: "(PDU RACK 1:1) EMD1(EMD-1) temperature was lower than low warning set point",
  },
  {
    date: "06/02/2024",
    time: "12:08:56",
    severity: "Information",
    event: "(PDU RACK 1:1) EMD1(EMD-1) temperature had returned from low warning to normal",
  },
  {
    date: "06/02/2024",
    time: "12:02:35",
    severity: "Warning",
    event: "(PDU RACK 1:1) EMD1(EMD-1) temperature was lower than low warning set point",
  },
  // Add the rest of the logs in the same format
];

function LogViewer({ logs }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="log table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell>Time</StyledTableCell>
            <StyledTableCell>Severity</StyledTableCell>
            <StyledTableCell>Event</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {logs.map((log, index) => (
            <TableRow key={index}>
              <StyledTableCell>{log.date}</StyledTableCell>
              <StyledTableCell>{log.time}</StyledTableCell>
              <StyledTableCell>{log.severity}</StyledTableCell>
              <StyledTableCell>{log.event}</StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function EventLogs() {
  return (
    <Box sx={{ p: 4, height: "100%", overflow: "auto" }}>
      <Grid container rowSpacing={2}>
        <Grid item xs={12}>
          <NamedContainer title="Event Logs">
            <Grid container rowSpacing={2}>
              <Grid item xs={12}>
                <Grid container rowSpacing={2}>
                  <Grid item xs={12}>
                    <CollapsiableNamedContainer title="System Logs">
                      <LogViewer logs={logsData} />
                    </CollapsiableNamedContainer>
                  </Grid>
                  <Grid item xs={12}>
                    <CollapsiableNamedContainer title="Inlet Logs">
                      <LogViewer logs={logsData} />
                    </CollapsiableNamedContainer>
                  </Grid>
                  <Grid item xs={12}>
                    <CollapsiableNamedContainer title="Outlet Logs">
                      <LogViewer logs={logsData} />
                    </CollapsiableNamedContainer>
                  </Grid>
                  <Grid item xs={12}>
                    <CollapsiableNamedContainer title="Sensor Logs">
                      <LogViewer logs={logsData} />
                    </CollapsiableNamedContainer>
                  </Grid>
                  <Grid item xs={12}>
                    <CollapsiableNamedContainer title="Alarm Logs">
                      <LogViewer logs={logsData} />
                    </CollapsiableNamedContainer>
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

export default EventLogs;
