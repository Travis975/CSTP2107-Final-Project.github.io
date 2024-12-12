import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/movies.css';
import MovieDialog from '../components/MovieDialog'; // Import the MovieDialog component

import { collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const popularMovieURL = `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_TMDB_API_KEY}`;
const upcomingMovieURL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_TMDB_API_KEY}`;
const topRatedMovieURL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${import.meta.env.VITE_TMDB_API_KEY}`;

const Movies = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [videos, setVideos] = useState({});

  // states for scrolling through movies
  const [popularIndex, setPopularIndex] = useState(0);
  const [upcomingIndex, setUpcomingIndex] = useState(0);
  const [topRatedIndex, setTopRatedIndex] = useState(0);

  // States for hover feature
  const [openDialog, setOpenDialog] = useState(false); 
  const [selectedMovie, setSelectedMovie] = useState(null); 
  const [dialogPosition, setDialogPosition] = useState({ top: 0, left: 0 }); 
  const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 });

  const favoriteMovieCollection = collection(db, "favorite");

  const itemsPerPage = 6; // Number of items to show per page

  // Fetch movies
  const getMovies = async () => {
    try {
      const popularResponse = await fetch(popularMovieURL);
      const popularData = await popularResponse.json();
      setPopularMovies(popularData.results);

      const upcomingResponse = await fetch(upcomingMovieURL);
      const upcomingData = await upcomingResponse.json();
      setUpcomingMovies(upcomingData.results);

      const topRatedResponse = await fetch(topRatedMovieURL);
      const topRatedData = await topRatedResponse.json();
      setTopRatedMovies(topRatedData.results);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch videos for a specific movie
  const getVideos = async (movieId) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`
      );
      const responseJSON = await response.json();
      setVideos((prevVideos) => ({
        ...prevVideos,
        [movieId]: responseJSON.results,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  useEffect(() => {
    popularMovies.forEach((movie) => getVideos(movie.id));
    upcomingMovies.forEach((movie) => getVideos(movie.id));
    topRatedMovies.forEach((movie) => getVideos(movie.id));
  }, [popularMovies, upcomingMovies, topRatedMovies]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition({ x: window.scrollX, y: window.scrollY });
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Navigation functions
  const nextPopular = () => {
    setPopularIndex((prev) => (prev + itemsPerPage) % popularMovies.length);
  };

  const prevPopular = () => {
    setPopularIndex((prev) => (prev - itemsPerPage + popularMovies.length) % popularMovies.length);
  };

  const nextUpcoming = () => {
    setUpcomingIndex((prev) => (prev + itemsPerPage) % upcomingMovies.length);
  };

  const prevUpcoming = () => {
    setUpcomingIndex((prev) => (prev - itemsPerPage + upcomingMovies.length) % upcomingMovies.length);
  };

  const nextTopRated = () => {
    setTopRatedIndex((prev) => (prev + itemsPerPage) % topRatedMovies.length);
  };

  const prevTopRated = () => {
    setTopRatedIndex((prev) => (prev - itemsPerPage + topRatedMovies.length) % topRatedMovies.length);
  };

  // Movies to show
  const getMoviesToShow = (movies, index) => {
    const end = index + itemsPerPage;
    return movies.slice(index, end).concat(movies.slice(0, Math.max(0, end - movies.length)));
  };

  // Show dialog with movie details
  const handleMouseEnter = (movie, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setDialogPosition({ top: rect.top + window.scrollY, left: rect.left + window.scrollX });
    setSelectedMovie(movie);
    setOpenDialog(true);
  };

  const handleMouseLeave = () => {
    setOpenDialog(false);
    setSelectedMovie(null);
  };

  return (
    <div className='movie-page'>
      <h2>Movies Page</h2>

      {/* Popular Movies Section */}
      <h2>Popular Movies</h2>
      <div className="movies-section">
        <button onClick={prevPopular}>◀</button>
        {getMoviesToShow(popularMovies, popularIndex).map((movie) => (
          <div
            className="movie-card"
            key={movie.id}
            onMouseEnter={(event) => handleMouseEnter(movie, event)}
          >
            <Link
              to="/watch-trailer"
              state={{
                videoId: videos[movie.id] && videos[movie.id][0]?.key,
                movieTitle: movie.title,
              }}
            >
              <div className="image-container">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="movie-poster"
                />
              </div>
            </Link>
          </div>
        ))}
        <button onClick={nextPopular}>▶</button>
      </div>

      {/* Upcoming Movies Section */}
      <h2>Upcoming Movies</h2>
      <div className="movies-section">
        <button onClick={prevUpcoming}>◀</button>
        {getMoviesToShow(upcomingMovies, upcomingIndex).map((movie) => (
          <div
            className="movie-card"
            key={movie.id}
            onMouseEnter={(event) => handleMouseEnter(movie, event)}
          >
            <Link
              to="/watch-trailer"
              state={{
                videoId: videos[movie.id] && videos[movie.id][0]?.key,
                movieTitle: movie.title,
              }}
            >
              <div className="image-container">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="movie-poster"
                />
              </div>
            </Link>
          </div>
        ))}
        <button onClick={nextUpcoming}>▶</button>
      </div>

      {/* Top Rated Movies Section */}
      <h2>Top Rated Movies</h2>
      <div className="movies-section">
        <button onClick={prevTopRated}>◀</button>
        {getMoviesToShow(topRatedMovies, topRatedIndex).map((movie) => (
          <div
            className="movie-card"
            key={movie.id}
            onMouseEnter={(event) => handleMouseEnter(movie, event)}
          >
            <Link
              to="/watch-trailer"
              state={{
                videoId: videos[movie.id] && videos[movie.id][0]?.key,
                movieTitle: movie.title,
              }}
            >
              <div className="image-container">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="movie-poster"
                />
              </div>
            </Link>
          </div>
        ))}
        <button onClick={nextTopRated}>▶</button>
      </div>

      {/* Favorite Movies Section */}
      <h2>Favorite Movies</h2>
      <div className="movies-section">
      </div>

      <h2>Watchlist</h2>
      <div className="movies-section">
      </div>


      {/* Hover Feature*/}
      <MovieDialog
        selectedMovie={selectedMovie}
        openDialog={openDialog}
        handleMouseLeave={handleMouseLeave}
        dialogPosition={dialogPosition}
        scrollPosition={scrollPosition}
      />
    </div>
  );
};

export default Movies;