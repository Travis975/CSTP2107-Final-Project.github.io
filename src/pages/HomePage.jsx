import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/homepage.css';

const upcomingMovieURL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_TMDB_API_KEY}`;

const HomePage = () => {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [upcomingIndex, setUpcomingIndex] = useState(0);
  const itemsPerPage = 5; // Number of items to show per page

  // Fetch upcoming movies
  const getUpcomingMovies = async () => {
    try {
      const response = await fetch(upcomingMovieURL);
      const data = await response.json();
      setUpcomingMovies(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUpcomingMovies();
  }, []);

  const nextUpcoming = () => {
    setUpcomingIndex((prev) => (prev + itemsPerPage) % upcomingMovies.length);
  };

  const prevUpcoming = () => {
    setUpcomingIndex((prev) => (prev - itemsPerPage + upcomingMovies.length) % upcomingMovies.length);
  };

  return (
    <div className="home-page">
      {/* Background Image Section */}
      <div className="background-image">
        <div className="content">
          <h1 className="heading">Welcome to Webflix</h1>
          <p className="description">Make an account to browse our collection of films!</p>

          {/* Footer Links */}
          <div className="mt-16 border-t border-gray-800 pt-8 text-center lg:text-left">
            <div className="text-base font-semibold text-gray-400">
              <Link to="/signup" className="text-white hover:underline">
                Sign Up Here
              </Link>{' '}
              |{' '}
              <Link to="/terms-and-conditions" className="text-white hover:underline">
                Terms and Conditions
              </Link>{' '}
              |{' '}
              <Link to="/privacy-policy" className="text-white hover:underline">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Movies Section */}
      <div className="upcoming-movies-section">
        <h2>Upcoming Movies</h2>
        <div className="movies-row">
          <button onClick={prevUpcoming} className="navigate-btn">◀</button>
          {upcomingMovies.slice(upcomingIndex, upcomingIndex + itemsPerPage).map((movie) => (
            <div className="movie-card" key={movie.id}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="movie-poster"
              />
            </div>
          ))}
          <button onClick={nextUpcoming} className="navigate-btn">▶</button>
        </div>
      </div>

      <div>
        <h2>Reasons To Join</h2>
      </div>

      <div>
        <h2>FAQ</h2>
      </div>
    </div>
  );
};

export default HomePage;
