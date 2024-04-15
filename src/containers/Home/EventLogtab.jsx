import { useTheme } from '@emotion/react';
import { Box, Button, Card, CardContent, FormControl, Grid, Input, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React from 'react'

const columns = [
    { field: 'date', headerName: 'Date & Time', width: 250 },
    { field: 'event', headerName: 'Event Level', width: 180 },
    {
        field: 'des',
        headerName: 'Event Description',
        type: 'any',
        width: 500
    },
];

const rows = [
    { id: 1, event: 'Information', date: '06/02/2024 20:33:12', des: 'Outlet (PDU:3) phase1 voltage had returned from warning to normal' },
    { id: 2, event: 'Warning', date: '12/03/2024 20:33:12', des: 'Outlet (PDU:3) Active/Main Power change to Active/Backup Power' },
    { id: 3, event: 'Information', date: '17/04/2024 20:33:12', des: 'Outlet (PDU:3) phase1 voltage was higher than warning set point' },
    { id: 4, event: 'Information', date: '22/05/2024 20:33:12', des: 'Outlet (PDU:3) Active/Backup Power change to Active/Main Power' },
    { id: 5, event: 'Warning', date: '03/06/2024 20:33:12', des: 'Outlet (PDU:3) phase1 voltage had returned from warning to normal' },
];

const EventLogtab = () => {

    const theme = useTheme();

    const [data, setData] = React.useState('10');

    const handleChange = (event) => {
        setData(event.target.value);
    };

    const [device, setDevice] = React.useState('All');

    const handleChangeDevice = (event) => {
        setDevice(event.target.value);
    };

    const [level, setLevel] = React.useState('Information');

    const handleChangeLevel = (event) => {
        setLevel(event.target.value);
    };

    return (
        <React.Fragment>
            <Grid item sm={12} lg={12}>
                <Card style={{ marginTop: "20px" }}>
                    <CardContent>
                        {/* <Typography align="center" paddingY={1} sx={{ backgroundColor: theme.palette.mode === "dark" ? "#499DFD" : "#499DFD", }}>
                        Event Log
                    </Typography> */}
                        <Grid lg={6}>
                            <Box display="flex">
                                <Grid lg={6}>
                                    <Box display="flex" alignItems="center">
                                        <Typography>From: </Typography>
                                        <Input type='date' placeholder='24/02/2024' />
                                    </Box>
                                </Grid>
                                <Grid lg={6}>
                                    <Box display="flex" alignItems="center">
                                        <Typography>To: </Typography>
                                        <Input type='date' placeholder='24/02/2024' />
                                    </Box>
                                </Grid>
                            </Box>
                        </Grid>
                        <Grid lg={6}>
                            <Box display="flex" marginTop="20px">
                                <Grid lg={6}>
                                    <Box display="flex" alignItems="center">
                                        <Typography>Device: </Typography>
                                        <FormControl size='small' sx={{ m: 1, minWidth: 180 }}>
                                            <InputLabel id="demo-simple-select-label">All</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={device}
                                                label="All"
                                                onChange={handleChangeDevice}
                                            >
                                                <MenuItem value='all'>All</MenuItem>
                                                <MenuItem value='laptop'>Laptop</MenuItem>
                                                <MenuItem value='tablet'>Tablet</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Grid>
                                <Grid lg={6}>
                                    <Box display="flex" alignItems="center">
                                        <Typography>Event Level: </Typography>
                                        <FormControl size='small' sx={{ m: 1, minWidth: 180 }}>
                                            <InputLabel id="demo-simple-select-label">Information</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={level}
                                                label="Information"
                                                onChange={handleChangeLevel}
                                            >
                                                <MenuItem value='all'>Information</MenuItem>
                                                <MenuItem value='laptop'>Warning</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Grid>
                            </Box>
                        </Grid>
                        <Grid lg={12}>
                            <Box>
                                <Button variant='contained' color='primary' style={{ marginRight: "30px" }}>Apply</Button>
                                <Button variant='contained' color='error'>Clear All</Button>
                            </Box>
                            <Box sx={{ marginTop: "30px" }}>
                                <Box display="flex" alignItems="center">
                                    <Typography>
                                        Show
                                    </Typography>
                                    <FormControl sx={{ m: 1, minWidth: 80 }}>
                                        <InputLabel id="demo-simple-select-label">10</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={data}
                                            label="Age"
                                            onChange={handleChange}
                                        >
                                            <MenuItem value={10}>10</MenuItem>
                                            <MenuItem value={20}>20</MenuItem>
                                            <MenuItem value={30}>30</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <Typography>entries per page</Typography>
                                </Box>
                                <div style={{ height: 371, width: '100%' }}>
                                    <TableContainer>
                                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                            <TableHead style={{ backgroundColor: "#499DFD" }}>
                                                <TableRow>
                                                    <TableCell>Date & Time</TableCell>
                                                    <TableCell>Event Level</TableCell>
                                                    <TableCell>Event Description</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {rows.map((row) => (
                                                    <TableRow
                                                        key={row.id}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell component="th" scope="row">
                                                            {row.date}
                                                        </TableCell>
                                                        <TableCell>{row.event}</TableCell>
                                                        <TableCell>{row.des}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                            </Box>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </React.Fragment>
    )
}

export default EventLogtab