import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';

const popularMovieURL = `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_TMDB_API_KEY}`;
const upcomingMovieURL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_TMDB_API_KEY}`;
const topRatedMovieURL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${import.meta.env.VITE_TMDB_API_KEY}`;



const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [videos, setVideos] = useState({}); // To store video data for each movie

  // Fetch popular movies
  const getMovies = async () => {
    try {
      const response = await fetch(popularMovieURL);
      const responseJSON = await response.json();
      setMovies(responseJSON.results);
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
    if (movies.length > 0) {
      movies.forEach((movie) => {
        getVideos(movie.id);
      });
    }
  }, [movies]);

  return (
    <div>
      <h2>Movies Page</h2>
      <p>
        Show all movies here by the 3 categories on TMDB: Popular, Upcoming, and
        Top Rated. Add sorting and filtering options.
      </p>

      <div>
        {movies.map((movie) => (
          <div className="movies" key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <p>{movie.title}</p>
            {videos[movie.id] && videos[movie.id][0] ? (
              <YouTube videoId={videos[movie.id][0].key} />
            ) : (
              <p>No video available</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;
