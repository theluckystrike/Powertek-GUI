import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Box,
  Chip,
} from "@mui/material";
import NamedContainer from "../../components/common/NamedContainer";
import { ReportingBar } from "../../components/common/ReportingBar";

function BreakerOverCurrent() {
  const [checked, setChecked] = useState([false, false, false]);

  const handleCheckboxChange = (position) => {
    const updatedChecked = checked.map((item, index) => (index === position ? !item : item));
    setChecked(updatedChecked);
  };

  const getStatusChip = (status) => {
    return (
      <Chip
        label={status}
        style={{ backgroundColor: status === "OPEN" ? "green" : "red", color: "white" }}
        sx={{
          "& .MuiChip-label": { fontWeight: 600, textTransform: "uppercase" },
          width: "40%",
        }}
      />
    );
  };

  return (
    <Box sx={{ p: 4, height: "100%", overflow: "scroll" }}>
      <NamedContainer title="Breaker Over Current">
        <TableContainer>
          <Table aria-label="PDU table">
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={checked.some((item) => item) && !checked.every((item) => item)}
                    checked={checked.every((item) => item)}
                    onChange={() => setChecked(checked.map(() => true))}
                  />
                </TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">PDU</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">RMS Current</TableCell>
                <TableCell align="center">Protected Outlets</TableCell>
                <TableCell align="center">Lines</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[...Array(3)].map((_, index) => (
                <TableRow key={index}>
                  <TableCell padding="checkbox">
                    <Checkbox checked={checked[index]} onChange={() => handleCheckboxChange(index)} />
                  </TableCell>
                  <TableCell align="center">Circuit Breaker L{index + 1}</TableCell>
                  <TableCell align="center">PDU name</TableCell>
                  <TableCell align="center">{getStatusChip(index % 2 === 0 ? "OPEN" : "CLOSED")}</TableCell>
                  <TableCell align="center">
                    <div>
                      <div>{index}/ 16 A</div>
                      <ReportingBar value={index} />
                    </div>
                  </TableCell>
                  <TableCell align="center">{[1, 2, 3].map((n) => `${n + index * 3},`).join("")}</TableCell>
                  <TableCell align="center">L{index + 1}-N</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </NamedContainer>
    </Box>
  );
}

export default BreakerOverCurrent;
