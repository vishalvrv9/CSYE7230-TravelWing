// HotelsTab.js
import React from 'react';
import { Box, TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import HotelTable from './HotelDetails';

function HotelsTab({ country, setCountry, startDate, setStartDate, endDate, setEndDate, travelers, setTravelers, hotels, setHotelOffers }) {

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
    const handleSearchHotels = async () => {
      const locationCode = country;
      try {
          // Append the query parameters to the URL
          const url = `http://localhost:8080/api/v1/hotels/search-by-city/${locationCode}`;

          const response = await fetch(url, {
              method: 'GET', // Specify the method as GET
              headers: {
                  'Content-Type': 'application/json'
              },
          });
          console.log(response)
          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          setHotelOffers(data.data); // Assuming you have a state to store the fetched data
      } catch (error) {
          console.error('Error fetching flights:', error);
          // Handle errors, for example, updating the state to display an error message
      }
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
                <MenuItem value="PAR">Paris</MenuItem>
                <MenuItem value="JfK">Newyork</MenuItem>
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
    sx={{ marginTop: 2 }} onClick = {handleSearchHotels}
  > Fetch Hotels! </Button>
  </Box>
  {hotels && hotels.length > 0 && (
                <HotelTable hotels={hotels} />
            )}
    </Box>
    );
}

export default HotelsTab;
