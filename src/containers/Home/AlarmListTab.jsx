import { Box, Card, CardContent, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React from 'react'

function createData(id, time, description, carbs, protein) {
    return { id, time, description, carbs, protein };
}

const rows = [
    createData(56, '22/03/2024 11:09:23', 'Inlet (PDU : 1) phase1 pf branch2 was lower than warning set point'),
    createData(57, '12/12/2024 11:09:55', 'Inlet (PDU : 1) phase1 pf branch2 was lower than critical set point'),
    createData(3, '04/02/2024 13:22:26', 'Inlet (PDU : 1) EMD1(EMD - 1) temperature was higher than high warning set point'),
    createData(62, '30/04/2024 17:22:11', 'PDU (PDU : 1) power off'),
    createData(22, '21/05/2024 05:22:04', 'Inlet (PDU : 1) phase1 pf branch2 was lower than high set point'),
];

const AlarmListTab = () => {
    return (
        <React.Fragment>
            <Grid item sm={12} lg={12}>
                <Card style={{ marginTop: "20px" }}>
                    {/* <Typography align="center" paddingY={1} sx={{ backgroundColor: theme.palette.mode === "dark" ? "#499DFD" : "#499DFD", }}>
                        Alarm List
                    </Typography> */}
                    <CardContent>
                        <Typography marginBottom="20px">Number of Active Alarms : 5</Typography>
                        <Box>
                            <TableContainer>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead style={{backgroundColor: "#499DFD"}}>
                                        <TableRow>
                                            <TableCell>Alarm ID</TableCell>
                                            <TableCell>Alarm Time</TableCell>
                                            <TableCell>Alarm Description</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((row) => (
                                            <TableRow
                                                key={row.id}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {row.id}
                                                </TableCell>
                                                <TableCell>{row.time}</TableCell>
                                                <TableCell>{row.description}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>

                    </CardContent>
                </Card>
            </Grid>

        </React.Fragment>
    )
}

export default AlarmListTab