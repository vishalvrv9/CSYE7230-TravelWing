import React, { useState } from 'react'; // Import useState
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ItineraryTab from './ItineraryTab';
import FlightsTab from './FlightsTab';
import HotelsTab from './HotelsTab';

import '../css/TravelPlanner.css';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function TravelPlanner() {
  // State for tracking the current tab
  const [value, setValue] = useState(0); // Initialize the state to 0 (the first tab)
  const [source, setSource] = useState('');
  const [country, setCountry] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [travelers, setTravelers] = useState('');
  const [itinerary, setItinerary] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [pace, setPace] = useState('');
  const [hotels, setHotelOffers] = useState('')
  // Function to handle tab change
  const handleChange = (event, newValue) => {
    setValue(newValue); // Update the state to the new tab value
  };

  // Component JSX
  return (
    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }} className="travel-planner">
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Itinerary" {...a11yProps(0)} />
          <Tab label="Flights" {...a11yProps(1)} />
          <Tab label="Hotels" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <ItineraryTab
            country={country} 
            setCountry={setCountry} 
            startDate={startDate} 
            setStartDate={setStartDate} 
            endDate={endDate} 
            setEndDate={setEndDate} 
            travelers={travelers} 
            setTravelers={setTravelers}
            source={source}
            setSource={setSource}
            itinerary={itinerary}
            setItinerary={setItinerary}
            isGenerating={isGenerating}
            setIsGenerating={setIsGenerating}
            pace={pace}
            setPace={setPace} 
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <FlightsTab            
            country={country} 
            setCountry={setCountry} 
            startDate={startDate} 
            setStartDate={setStartDate} 
            endDate={endDate} 
            setEndDate={setEndDate} 
            travelers={travelers} 
            setTravelers={setTravelers}
            source={source}
            setSource={setSource}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <HotelsTab             country={country} 
            setCountry={setCountry} 
            startDate={startDate} 
            setStartDate={setStartDate} 
            endDate={endDate} 
            setEndDate={setEndDate} 
            travelers={travelers} 
            setTravelers={setTravelers}
            source={source}
            setSource={setSource}
            hotels={hotels}
            setHotelOffers={setHotelOffers}
        />
      </CustomTabPanel>
    </Box>
  );
}
