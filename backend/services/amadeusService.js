const axios = require('axios');
require('dotenv').config();

const getAccessToken = async () => {
  try {
    const response = await axios({
      method: 'post',
      url: 'https://test.api.amadeus.com/v1/security/oauth2/token',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: `grant_type=client_credentials&client_id=${process.env.AMADEUS_CLIENT_ID}&client_secret=${process.env.AMADEUS_CLIENT_SECRET}`,
    });
    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching access token:', error);
    throw error;
  }
};

const searchHotelsByCity = async (cityCode) => {
  const accessToken = await getAccessToken();
  try {
    const response = await axios({
      method: 'get',
      url: `https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?cityCode=${cityCode}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching hotels by city:', error);
    throw error;
  }
};

const searchFlights = async (
  originLocationCode,
  destinationLocationCode,
  departureDate,
  adults
) => {
  const accessToken = await getAccessToken();

  console.log({
    method: 'get',
    url: `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${originLocationCode}&destinationLocationCode=${destinationLocationCode}&departureDate=${departureDate}&adults=${adults}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  try {
    const response = await axios({
      method: 'get',
      url: `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${originLocationCode}&destinationLocationCode=${destinationLocationCode}&departureDate=${departureDate}&adults=${adults}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching flights:', error);
    throw error;
  }
};

module.exports = {
  searchHotelsByCity,
  searchFlights,
};
