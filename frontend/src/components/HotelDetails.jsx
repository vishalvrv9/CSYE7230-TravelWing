import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const HotelTable = ({ hotels }) => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Hotel Name</TableCell>
            <TableCell>Chain Code</TableCell>
            <TableCell>IATA Code</TableCell>
            <TableCell>Hotel ID</TableCell>
            <TableCell>Latitude</TableCell>
            <TableCell>Longitude</TableCell>
            <TableCell>Country Code</TableCell>
            <TableCell>Last Update</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {hotels.slice(0, 10).map((hotel, idx) => (
            <TableRow key={idx}>
              <TableCell>{hotel.name}</TableCell>
              <TableCell>{hotel.chainCode}</TableCell>
              <TableCell>{hotel.iataCode}</TableCell>
              <TableCell>{hotel.hotelId}</TableCell>
              <TableCell>{hotel.geoCode.latitude}</TableCell>
              <TableCell>{hotel.geoCode.longitude}</TableCell>
              <TableCell>{hotel.address.countryCode}</TableCell>
              <TableCell>{hotel.lastUpdate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
);

export default HotelTable;

