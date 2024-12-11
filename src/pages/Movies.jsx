import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel';
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
  const [popularIndex, setPopularIndex] = useState(0);
  const [upcomingIndex, setUpcomingIndex] = useState(0);
  const [topRatedIndex, setTopRatedIndex] = useState(0);

  const itemsPerPage = 6; // Number of items to show per page

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

  // 
  const getMoviesToShow = (movies, index) => {
    const end = index + itemsPerPage;
    return movies.slice(index, end).concat(movies.slice(0, Math.max(0, end - movies.length)));
  };

  return (
    <div>
      <h2>Movies Page</h2>
      
      {/* Popular Movies Section */}
      <h2>Popular Movies</h2>
      <div className="movies-section">
        <button onClick={prevPopular}>◀</button>
        {getMoviesToShow(popularMovies, popularIndex).map((movie) => (
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
          </div>
        ))}
        <button onClick={nextPopular}>▶</button>
      </div>

      {/* Upcoming Movies Section */}
      <h2>Upcoming Movies</h2>
      <div className="movies-section">
        <button onClick={prevUpcoming}>◀</button>
        {getMoviesToShow(upcomingMovies, upcomingIndex).map((movie) => (
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
          </div>
        ))}
        <button onClick={nextUpcoming}>▶</button>
      </div>

      {/* Top Rated Movies Section */}
      <h2>Top Rated Movies</h2>
      <div className="movies-section">
        <button onClick={prevTopRated}>◀</button>
        {getMoviesToShow(topRatedMovies, topRatedIndex).map((movie) => (
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
          </div>
        ))}
        <button onClick={nextTopRated}>▶</button>
      </div>
    </div>
  );
};

export default Movies;
