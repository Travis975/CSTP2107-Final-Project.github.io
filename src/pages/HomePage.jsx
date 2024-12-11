import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/homepage.css';

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const upcomingMovieURL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_TMDB_API_KEY}`;

const HomePage = () => {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const moviesToShow = 5; // Number of movies visible at once

  // Fetch upcoming movies
  const getUpcomingMovies = async () => {
    try {
      const response = await fetch(upcomingMovieURL);
      const data = await response.json();
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
              Ready to watch?   
              <Link to="/signup" className="text-white hover:underline">
                Sign Up Here
              </Link>
            
            </div>
          </div>
        </div>
      </div>

     
      {/* Upcoming Movies Section */}
      <div className="upcoming-movies-section">
        <h2 className='upcoming-header'>Upcoming Movies</h2>
        <div className="movies-row">
          <button onClick={handlePrev} className="navigate-btn">◀</button>
          <div className="movies-container">
            {upcomingMovies.slice(startIndex, startIndex + moviesToShow).map((movie, index) => (
              <div className="movie-card" key={movie.id}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="movie-poster"
                />
                <p className="movie-title">{movie.title}</p>
              </div>
            ))}
          </div>
          <button onClick={handleNext} className="navigate-btn">▶</button>
        </div>
      </div>
    
      

      <div class="reasons-section">
        <h2 className='reasons-header'>More Reasons to Join</h2>
        <div class="cards">
            <div class="card">
                <h3>Enjoy on your TV</h3>
                <p>Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.</p>  
            </div>
            <div class="card">
                <h3>Latest movies to browse</h3>
                <p>Find your new favorites easily and always have something to watch.</p>
            </div>
            <div class="card">
                <h3>Watch everywhere</h3>
                <p>Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.</p>
            </div>
        </div>
      </div>

      <div className='FAQ'>
        <h2>FAQ</h2>
      </div>
    </div>
  );
};

export default HomePage;
