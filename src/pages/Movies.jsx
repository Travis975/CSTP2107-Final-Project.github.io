import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/movies.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

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

  // States for hover feature
  const [openDialog, setOpenDialog] = useState(false); 
  const [selectedMovie, setSelectedMovie] = useState(null); 
  const [dialogPosition, setDialogPosition] = useState({ top: 0, left: 0 }); 

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
    setDialogPosition({ top: rect.top + window.scrollY, left: rect.left });
    setSelectedMovie(movie);
    setOpenDialog(true);
  };

  const handleMouseLeave = () => {
    setOpenDialog(false);
    setSelectedMovie(null);
  };

  return (
    <div>
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

      {/* Movie Details Dialog */}
      {selectedMovie && (
        <Dialog
          open={openDialog}
          onClose={handleMouseLeave}
          PaperProps={{
            style: {
              position: 'absolute',
              top: dialogPosition.top,
              left: dialogPosition.left,
              margin: 0,
            },
          }}
        >
          <DialogContent onMouseLeave={() => handleMouseLeave()}>
            <Card sx={{ maxWidth: 225 }}>
              <CardMedia
                sx={{ height: 250 }}
                image={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
                title={selectedMovie.title}
              />
              <CardContent>
                <Typography paddingBottom={2} variant="h5" component="div">
                  {selectedMovie.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {selectedMovie.overview.substring(0, 150) + "..."}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Movies;
