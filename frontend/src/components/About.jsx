import React from 'react';
import { motion } from 'framer-motion';
import { Box, Container, Typography } from '@mui/material';
import { Typewriter } from 'react-simple-typewriter';
import '../css/About.css';
// import 'react-simple-typewriter/dist/index.css';

const cardData = [
  {
    title: 'Inspiration',
    content: `It was amidst the bustling streets of New York City and the serene shores of New Jersey that the concept of TravelWing took flight. As an international student embarking on this trip, our one of the team-members encountered the very challenges many travelers face: the daunting task of creating an itinerary that aligns perfectly with one's unique preferences and schedule. While "Top 10 Things to Do" lists and standard tour packages offered a glimpse into possible experiences, they fell short of the personalized journey desired. Each suggested plan was a one-size-fits-all solution that didn't fit at all. Moreover, the booking process felt like piecing together a complex puzzle with scattered pieces across different websites.`
  },
  {
    title: 'Concept',
    content: `TravelWing emerged as a beacon for travelers yearning for customization. Leveraging the power of the OpenAI API, we present you with the ability to craft a travel plan that's as unique as your fingerprints. TravelWing goes beyond being a mere tool; it's your personal travel guide, seamlessly blending your preferences, dates, and aspirations into a cohesive and thorough itinerary.`
  },
  
];

const secondCard = [
  {
    title: 'Itinerary Planning',
    content: `With TravelWing, planning your itinerary is as simple as filling out a prompt. Tell us what you seek, and our AI will retrieve information to curate a travel plan that resonates with your wishes. For our members, these plans aren't just ephemeral; save them for future reference or have them sent to you in a neatly packaged PDF via email.` 
  },
  {
    title: 'Flight Booking',
    content: `Input your preferences, and our integration with the Amadeus API provides you with up-to-date flight details. When you're ready to take to the skies, a seamless transition to Skyscanner awaits to secure your booking.`
  },
  {
    title: 'Hotel Reservations',
    content: `Find your home away from home by entering your lodging preferences. TravelWing partners with renowned platforms to ensure that the hotel you book is not just a stay but an experience to cherish.`
  },
];

const commitmentCard = [
  {
    title: 'Personalization',
    content: `TravelWing is more than a platform; it's a promise — a promise to deliver a travel planning and booking experience that is as delightful as it is efficient. It's about transforming the oft-tedious pre-travel arrangements into an exhilarating prelude to your adventure. With TravelWing, your travel planning becomes an integral part of the adventure — a prelude filled with anticipation and excitement.`
  }
];

const teamMembers = [
  { name: 'Vishal', role: 'Software Developer', img: 'Vishal.png' },
  { name: 'Sheetal', role: 'Software Developer', img: 'Sheetal.png' },
  { name: 'Sravanti', role: 'Software Developer', img: 'Sravanti.png' },
  { name: 'Rajavi', role: 'Software Developer', img: 'Rajavi.png' },
  { name: 'Sanath', role: 'Software Developer', img: 'Sanath.png' },
  
];


const AboutPage = () => {
  return (
    <div className="about-page">
      <Box className="typewriter-heading">
        <Typewriter
          words={['TravelWing']}
          loop={true}
          cursor
          cursorStyle='_'
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1000}
        />
      </Box>
      
      <Box>
        {/* Your about page content */}
      </Box>

      <Box className="card-container">
        {cardData.map((card, index) => (
          <motion.div className="main-card" key={index} whileHover={{ scale: 1.05 }}>
            <Typography className="card-title">{card.title}</Typography>
            <Typography className="card-text">{card.content}</Typography>
          </motion.div>
        ))}
      </Box>

      
      {/* Adding a title for the Team Introduction section */}
      <Box className="section-title">
        <Typography variant="h4" style={{ textAlign: 'center', margin: '20px 0' }}>Our Features</Typography>
      </Box>
      
      <Box className="second-card-container">
        {secondCard.map((card, index) => (
          <motion.div className="card" key={index} whileHover={{ scale: 1.05 }}>
            <Typography className="card-title">{card.title}</Typography>
            <Typography className="card-text">{card.content}</Typography>
          </motion.div>
        ))}
      </Box>

      {/* Adding a title for the Our Commitment section */}
      <Box className="section-title">
        <Typography variant="h4" style={{ textAlign: 'center', margin: '20px 0' }}>Our Commitment</Typography>
      </Box>

      <Box className="commitment-card-container">
        {commitmentCard.map((card, index) => (
          <motion.div className="commitment-card" key={index} whileHover={{ scale: 1.05 }}>
            <Typography className="card-title">{card.title}</Typography>
            <Typography className="card-text">{card.content}</Typography>
          </motion.div>
        ))}
      </Box>

      {/* Adding a title for the Team Introduction section */}
      <Box className="section-title">
        <Typography variant="h4" style={{ textAlign: 'center', margin: '20px 0' }}>Team Introduction</Typography>
      </Box>


      {/* Team Members Section */}
      <Box className="team-section">
        {teamMembers.map((member, index) => (
          <Box key={index} className="team-member">
            <img src={member.img} alt={member.name} className="team-member-image" />
            <Typography variant="h5">{member.name}</Typography>
            <Typography>{member.role}</Typography>
          </Box>
        ))}
      </Box>

      

      <Box className="typewriter-heading">
        <Typewriter
          words={['Embark on your next journey with TravelWing..']}
          loop={true}
          cursor
          cursorStyle='!'
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1000}
        />
      </Box>

    </div>
  );
};

export default AboutPage;
