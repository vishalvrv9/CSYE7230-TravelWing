// FlightsTab.js
import React from 'react';
import { Box, TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';


function FlightsTab({ country, setCountry, startDate, setStartDate, endDate, setEndDate, travelers, setTravelers }) {

    const handleReset = () => {
        setCountry('');
        setStartDate('');
        setEndDate('');
        setTravelers('');
    };

    const handleCountryChange = (event) => {
        setCountry(event.target.value);
    };

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    };

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    };

    const handleTravelersChange = (event) => {
        setTravelers(event.target.value);
    };

    return (

 
        <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 2, width: '45%' },
          '& .MuiFormControl-root': {
            m: 1, // Margin top and bottom for FormControl
            width: '45%' // Width for FormControl, you can adjust as needed
          },

        }}
        noValidate
        autoComplete="off"
      >
            <FormControl fullWidth>
              <InputLabel id="country-select-label">Select Country</InputLabel>
              <Select
                labelId="country-select-label"
                value={country}
                label="Select Country"
                onChange={handleCountryChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Paris">Paris</MenuItem>
                <MenuItem value="Newyork">Newyork</MenuItem>
              </Select>
            </FormControl>
            <TextField
                label="From"
                type="date"
                value={startDate}
                onChange={handleStartDateChange}
                sx={{ width: '45%', mb: 2 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                label="To"
                type="date"
                value={endDate}
                onChange={handleEndDateChange}
                sx={{ width: '45%', mb: 2 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
  
            <TextField
              label="Travelers"
              type="text"
              placeholder="Travelers"
              value={travelers}
              onChange={handleTravelersChange}
              sx={{ width: '40%', marginTop: 2 }}
            />
            <Box  sx={{ 
                 display: 'flex',
                 justifyContent: 'center',
                 '& > *': {
      width: '30%', 
      m: 2, 
    }}}>
            <Button variant="outlined" onClick={handleReset} sx={{ marginTop: 2 }}>
              Reset
            </Button>
            <Button
    variant="contained"
    sx={{ marginTop: 2 }}
  > Fetch Flights! </Button>
    </Box>
    </Box>
    );
}

export default FlightsTab;
