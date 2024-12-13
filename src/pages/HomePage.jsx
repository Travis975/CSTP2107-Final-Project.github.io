import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/homepage.css';
import Footer from '../components/Footer';

import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';


const upcomingMovieURL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_TMDB_API_KEY}`;

// FAQ Data
const FAQs = [
  {
    question: "What is Webflix?",
    answer: `Webflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices. You can watch as much as you want, whenever you want. There's always something new to discover and new TV shows and movies are added every week!`,
  },
  {
    question: "How much does Webflix cost?",
    answer: "Webflix is completely free and always will be, no card required on sign up.",
  },
  {
    question: "Where can I watch?",
    answer: "You can watch anywhere, anytime, on an unlimited number of devices. Sign in with your Webflix account to watch instantly on the web or on devices like Smart TVs, smartphones, tablets, streaming media players, and game consoles.",
  },
];

const HomePage = () => {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const moviesToShow = 5; // Number of movies visible at once

  // Fetch upcoming movies
  const getUpcomingMovies = async () => {
    try {
      const response = await fetch(upcomingMovieURL);
      const data = await response.json();
      console.log(data);
      setUpcomingMovies(data.results.slice(0, 10)); // Top 10 movies
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUpcomingMovies();
  }, []);

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % upcomingMovies.length);
  };

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 + upcomingMovies.length) % upcomingMovies.length);
  };

  return (
    <div className="home-page">
      {/* Background Image Section */}
      <div className="background-image">
        <div className="content">
          <h1 className="heading">Welcome to Webflix!</h1>
          <p className="description">Limited movies, TV shows, and more</p>
          <h4 className='sub-heading'>Sign up free. Cancel anytime.</h4>

          {/* Page Link */}
          <div className="mt-16 border-t border-gray-800 pt-8 text-center lg:text-left">
            
            <div className="text-base font-semibold text-gray-400">
              Ready to watch? {' '}   
              <Link to="/signup" className="text-white hover:underline">
                Sign Up Here
              </Link>
            
            </div>
          </div>
        </div>
      </div>

     
      {/* Upcoming Movies Section */}
      <div className="upcoming-movies-homepage">
        <h2 className='upcoming-header-homepage'>Upcoming Movies</h2>
        <div className="movies-row-homepage">
          <button onClick={handlePrev} className="navigate-btn-homepage">◀</button>
          <div className="movies-container-homepage">
            {upcomingMovies.slice(startIndex, startIndex + moviesToShow).map((movie, index) => (
              <div className="movie-data-homepage" key={movie.id}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="movie-poster-homepage"
                />
                <p className="movie-title-homepage">{movie.title}</p>
                
                {/* Movie Details on Hover */}
                <div className="movie-details-homepage">
                  <p className="movie-release-date-homepage">Average Rating: {movie.vote_average.toFixed(2)} / 10</p>
                  <p className="movie-description-homepage">{movie.overview}</p>
                </div>
              </div>
            ))}
          </div>
          <button onClick={handleNext} className="navigate-btn-homepage">▶</button>
        </div>
      </div>

    
      
      {/* Reasons to Join Section */}
      <div className="reasons-section">
        <h2 className='reasons-header'>More Reasons to Join</h2>
        <div className="cards">
            <div className="card">
                <h3>Enjoy on your TV</h3>
                <p>Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.</p>  
            </div>
            <div className="card">
                <h3>Latest movies to browse</h3>
                <p>Find your new favorites easily and always have something to watch.</p>
            </div>
            <div className="card">
                <h3>Watch everywhere</h3>
                <p>Stream limited movies and TV shows on your phone, tablet, laptop, and TV.</p>
            </div>
        </div>
      </div>

            {/* FAQ Section */}
      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className='faq-cards'>
          {FAQs.map((faq, index) => (
            <Accordion 
              key={index} 
              className="faq-accordion"
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
                className='faq-card'
              >
                <Typography>{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
