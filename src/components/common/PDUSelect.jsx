import React from "react";
import { MenuItem, FormControl, Select, InputLabel } from "@mui/material";

export default function PduSelect() {
  const [pdu, setPdu] = React.useState(1);

  const handleChange = (event) => {
    setPdu(event.target.value);
  };

  return (
    <FormControl sx={{ width: "200px" }}>
      <InputLabel id="pdu-select-label">PDU</InputLabel>
      <Select
        labelId="pdu-select-label"
        id="pdu-select"
        value={pdu}
        label="PDU"
        onChange={handleChange}
        size="small"
        sx={{ maxWidth: "200px" }}
      >
        <MenuItem value={1}>PDU 1 (Master)</MenuItem>
        <MenuItem value={2}>PDU 2 (Slave)</MenuItem>
        <MenuItem value={3}>PDU 3 (Slave)</MenuItem>
        <MenuItem value={4}>PDU 4 (Slave)</MenuItem>
        <MenuItem value={5}>PDU 5 (Slave)</MenuItem>
        <MenuItem value={6}>PDU 6 (Slave)</MenuItem>
        <MenuItem value={7}>PDU 7 (Slave)</MenuItem>
        <MenuItem value={8}>PDU 8 (Slave)</MenuItem>
      </Select>
    </FormControl>
  );
}
