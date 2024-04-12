import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";

const FlightTable = ({ flights }) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        {/* Table headers go here */}
        <TableRow>
          {/* Replace these with your desired headers */}
          <TableCell>Flight Number(s)</TableCell>
          <TableCell>Route</TableCell>
          <TableCell>Departure - Arrival Time</TableCell>
          <TableCell>Duration</TableCell>
          <TableCell>Price</TableCell>
          <TableCell>Cabin</TableCell>
          <TableCell>Checked Bags</TableCell>
          <TableCell>Flight Link</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {flights.map((flight, idx) => (
          <TableRow key={idx}>
            <TableCell>
              {flight.itineraries[0].segments
                .map((segment) => segment.number)
                .join(", ")}
            </TableCell>
            <TableCell>
              {flight.itineraries[0].segments[0].departure.iataCode}{" "}
              {
                flight.itineraries[0].segments[
                  flight.itineraries[0].segments.length - 1
                ].arrival.iataCode
              }
            </TableCell>
            <TableCell>
              {flight.itineraries[0].segments[0].departure.at}{" "}
              {
                flight.itineraries[0].segments[
                  flight.itineraries[0].segments.length - 1
                ].arrival.at
              }
            </TableCell>
            <TableCell>{flight.itineraries[0].duration}</TableCell>
            <TableCell>
              {flight.price.total} {flight.price.currency}
            </TableCell>
            <TableCell>
              {flight.travelerPricings[0].fareDetailsBySegment[0].cabin}
            </TableCell>
            <TableCell>
              {
                flight.travelerPricings[0].fareDetailsBySegment[0]
                  .includedCheckedBags.quantity
              }
            </TableCell>
            {/* <TableCell><Link href = {`https://www.skyscanner.com/transport/flights/${flight.itineraries[0].segments[0].departure.iataCode}/${flight.itineraries[0].segments[flight.itineraries[0].segments.length - 1].arrival.iataCode}/240426/240528/?adultsv2=1&cabinclass=economy&childrenv2=&inboundaltsenabled=false&outboundaltsenabled=false&preferdirects=false&ref=home&rtn=1&sortby=BEST`}>Flight Link</Link></TableCell> */}
            <TableCell>
              <Link
                href={`https://www.skyscanner.com/transport/flights/${
                  flight.itineraries[0].segments[0].departure.iataCode
                }/${
                  flight.itineraries[0].segments[
                    flight.itineraries[0].segments.length - 1
                  ].arrival.iataCode
                }/${new Date(flight.itineraries[0].segments[0].departure.at)
                  .toISOString()
                  .slice(2, 10)
                  .replace(/-/g, "")}/${new Date(
                  flight.itineraries[0].segments[
                    flight.itineraries[0].segments.length - 1
                  ].arrival.at
                )
                  .toISOString()
                  .slice(2, 10)
                  .replace(
                    /-/g,
                    ""
                  )}/?adultsv2=1&cabinclass=economy&childrenv2=&inboundaltsenabled=false&outboundaltsenabled=false&preferdirects=false&ref=home&rtn=1&sortby=BEST`}
              >
               Book Flight Tickets 
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default FlightTable;
