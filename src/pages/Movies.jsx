import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel'; // Import Carousel
import '../css/movies.css';
import YouTube from 'react-youtube';

const popularMovieURL = `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_TMDB_API_KEY}`;
const upcomingMovieURL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_TMDB_API_KEY}`;
const topRatedMovieURL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${import.meta.env.VITE_TMDB_API_KEY}`;

const Movies = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [videos, setVideos] = useState({});

  // Fetch popular, upcoming, and top-rated movies
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
    if (popularMovies.length > 0) {
      popularMovies.forEach((movie) => {
        getVideos(movie.id);
      });
    }
    if (upcomingMovies.length > 0) {
      upcomingMovies.forEach((movie) => {
        getVideos(movie.id);
      });
    }
    if (topRatedMovies.length > 0) {
      topRatedMovies.forEach((movie) => {
        getVideos(movie.id);
      });
    }
  }, [popularMovies, upcomingMovies, topRatedMovies]);

  return (
    <div>
      <h2>Movies Page</h2>
      
      {/* Popular Movies Section with Carousel */}
      <h3>Popular Movies</h3>
      <Carousel>
        {popularMovies.map((movie) => (
          <div className="movie-card" key={movie.id}>
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
            <h3>{movie.title}</h3>
            <p>{movie.overview}</p>
          </div>
        ))}
      </Carousel>

      {/* Upcoming Movies Section with Carousel */}
      <h3>Upcoming Movies</h3>
      <Carousel>
        {upcomingMovies.map((movie) => (
          <div className="movie-card" key={movie.id}>
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
            <h3>{movie.title}</h3>
            <p>{movie.overview}</p>
          </div>
        ))}
      </Carousel>

      {/* Top Rated Movies Section with Carousel */}
      <h3>Top Rated Movies</h3>
      <Carousel>
        {topRatedMovies.map((movie) => (
          <div className="movie-card" key={movie.id}>
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
            <h3>{movie.title}</h3>
            <p>{movie.overview}</p>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Movies;
