import React from 'react';
import { motion } from 'framer-motion';
import { Box, Container, Typography } from '@mui/material';
import { Typewriter } from 'react-simple-typewriter';
import '../css/About.css';
// import 'react-simple-typewriter/dist/index.css';

const cardData = [
  {
    title: 'Inspiration',
    content: `It was amidst the bustling streets of New York City and the serene shores of New Jersey that the concept of TravelWing took flight. As an international student embarking on this trip, our founder encountered the very challenges many travelers face: the daunting task of creating an itinerary that aligns perfectly with one's unique preferences and schedule. While "Top 10 Things to Do" lists and standard tour packages offered a glimpse into possible experiences, they fell short of the personalized journey desired. Each suggested plan was a one-size-fits-all solution that didn't fit at all. Moreover, the booking process felt like piecing together a complex puzzle with scattered pieces across different websites.`
  },
  {
    title: 'Concept',
    content: `TravelWing emerged as a beacon for travelers yearning for customization. Leveraging the prowess of AI and the versatility of the OpenAI API, we present you with the ability to craft a travel plan that's as unique as your fingerprints. TravelWing isn't just a tool; it's your personal travel artisan that weaves your desires, dates, and dreams into a coherent, comprehensive itinerary.`
  },
  
];

const secondCard = [
  {
    title: 'Our Mission: Redefining Travel Experiences',
    content: `At TravelWing, we're on a mission to redefine the way you travel. We believe that every journey should be a reflection of your individuality, not a checklist of tourist traps. Our commitment to you is to provide a seamless, stress-free experience that puts the joy back into travel planning.`
  },
  {
    title: 'Our Vision: A World of Possibilities',
    content: `Our vision is to create a world where travel isn't just a destination; it's a transformative experience. We envision a future where every traveler can embark on a journey that's uniquely theirs, filled with unforgettable moments and cherished memories. With TravelWing, the world is your oyster, and the possibilities are endless.`
  },
  {
    title: 'Our Values: Innovation, Integrity, Inclusivity',
    content: `Innovation is at the heart of everything we do at TravelWing. We're constantly pushing the boundaries of what's possible to bring you the best travel experience. Integrity is our guiding principle, and we're committed to transparency, honesty, and accountability in all our interactions. Inclusivity is our promise to you; we welcome travelers from all walks of life and strive to create a safe, welcoming space for everyone.`
  },
];

const teamMembers = [
  { name: 'Sheetal', role: 'Product Manager', img: 'flight1.png' },
  { name: 'Vishal', role: 'Product Manager', img: 'flight1.png' },
  { name: 'Rajavi', role: 'Product Manager', img: 'flight1.png' },
  { name: 'Sanath', role: 'Product Manager', img: 'flight1.png' },
  { name: 'Sravanti', role: 'Product Manager', img: 'flight1.png' },
  
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
          <motion.div className="card" key={index} whileHover={{ scale: 1.05 }}>
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

      {/* Commitment Section */}
      <Box className="commitment-section">
        {/* Commitment text */}
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
