import React, { useState, useEffect } from 'react';
import {
  Grid,
  TextField,
  List,
  ListItem,
  ListItemText,
  Box,
  Typography,
  Paper,
  Divider,
  TablePagination,
} from '@mui/material';
import { useUserAuth } from '../context/UserAuthContext';

const ItineraryList = () => {
  const [itineraries, setItineraries] = useState([]);
  const [filteredItineraries, setFilteredItineraries] = useState([]);
  const [searchParams, setSearchParams] = useState({ source: '', destination: '', searchDate: ''});
  const [selectedItinerary, setSelectedItinerary] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const userEmail = "sravanti.kanchi111@gmail.com";
  const [searchDate, setSearchDate] = useState('');
  const { user } = useUserAuth();

  useEffect(() => {
    const fetchItineraries = async () => {
      

      try {
        const response = await fetch(`http://localhost:8080/api/v1/users/${encodeURIComponent(user.email)}/itineraries`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setItineraries(data.itineraries || []);
        setFilteredItineraries(data.itineraries || []);
      } catch (error) {
        console.error("Failed to fetch itineraries:", error);
      }
    };

    fetchItineraries();
  }, [user.email]);


  useEffect(() => {
    // Update the filter to include the creation date
    const result = itineraries.filter(itinerary => {
      return (
        itinerary.source.toLowerCase().includes(searchParams.source.toLowerCase()) &&
        itinerary.destination.toLowerCase().includes(searchParams.destination.toLowerCase()) &&
        (!searchDate || itinerary.createdAt.startsWith(searchDate)) // Check if the start of the createdAt string matches the search date
      );
    });
    setFilteredItineraries(result);
  }, [searchParams, itineraries, searchDate]);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = event => {
    const { name, value } = event.target;
    setSearchParams(prevParams => ({
      ...prevParams,
      [name]: value,
    }));
  };

  const handleItineraryClick = itinerary => {
    setSelectedItinerary(itinerary);
  };

  const handleDateSearchChange = (event) => {
    setSearchDate(event.target.value);
  };

  // Calculate the number of empty rows to display if the last page is not full
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredItineraries.length) : 0;

  // Calculate the itineraries to display on the current page
  const paginatedItineraries = filteredItineraries.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Grid container spacing={2} style={{ marginTop: '1rem' }}>
      <Grid item xs={6}>
        <Paper elevation={3} style={{ maxHeight: 600, overflow: 'auto', padding: '1rem' }}>
          <Box mb={2}>
            <TextField
              label="Source"
              name="source"
              value={searchParams.source}
              onChange={handleSearchChange}
              fullWidth
              margin="dense"
            />
            <TextField
              label="Destination"
              name="destination"
              value={searchParams.destination}
              onChange={handleSearchChange}
              fullWidth
              margin="dense"
            />
                  <TextField
        label="Creation Date"
        name="createdAt"
        type="date"
        value={searchDate}
        onChange={handleDateSearchChange}
        fullWidth
        margin="dense"
        InputLabelProps={{
          shrink: true,
        }}
      />

          </Box>
          <Divider light />
          <List>
            {paginatedItineraries.map((itinerary, index) => (
              <React.Fragment key={index}>
                <ListItem button onClick={() => handleItineraryClick(itinerary)}>
                  <ListItemText primary={itinerary.title} secondary={`${itinerary.source} to ${itinerary.destination}`} />
                </ListItem>
                {index < paginatedItineraries.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
          <TablePagination
            component="div"
            count={filteredItineraries.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper elevation={3} style={{ padding: '1rem' }}>
          {selectedItinerary ? (
            <Box>
              <Typography gutterBottom variant="h5" component="div">
                {selectedItinerary.title}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {selectedItinerary.generatediItinerary || 'No details available'}
              </Typography>
              {/* Render additional itinerary details here */}
            </Box>
          ) : (
            <Typography variant="subtitle1">Select an itinerary to view details.</Typography>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ItineraryList;
