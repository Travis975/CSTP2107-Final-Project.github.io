import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../css/movies.css';
import MovieDialog from '../components/MovieDialog'; 
import { collection, onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebaseConfig"; 
import Navbar from '../components/Navbar'; 

const popularMovieURL = `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_TMDB_API_KEY}`;
const upcomingMovieURL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_TMDB_API_KEY}`;
const topRatedMovieURL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${import.meta.env.VITE_TMDB_API_KEY}`;

const Movies = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [videos, setVideos] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [watchlater, setWatchlater] = useState([]);
  const [popularIndex, setPopularIndex] = useState(0);
  const [upcomingIndex, setUpcomingIndex] = useState(0);
  const [topRatedIndex, setTopRatedIndex] = useState(0);

  const [openDialog, setOpenDialog] = useState(false); 
  const [selectedMovie, setSelectedMovie] = useState(null); 
  const [dialogPosition, setDialogPosition] = useState({ top: 0, left: 0 }); 
  const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 });

  const itemsPerPage = 6;

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

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const favoritesRef = collection(db, "users", user.uid, "favorites");
      const watchlaterRef = collection(db, "users", user.uid, "watchlater");

      onSnapshot(favoritesRef, (snapshot) => {
        setFavorites(snapshot.docs.map(doc => doc.data()));
      });

      onSnapshot(watchlaterRef, (snapshot) => {
        setWatchlater(snapshot.docs.map(doc => doc.data()));
      });
    }
  }, []);

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

  const getMoviesToShow = (movies, index) => {
    const end = index + itemsPerPage;
    return movies.slice(index, end).concat(movies.slice(0, Math.max(0, end - movies.length)));
  };

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
    <div className="movie-page">
      <h2>Movies Page</h2>

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

      <h2>Your Favorites</h2>
      <div className="movies-section">
        {favorites.map((movie) => (
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
      </div>

      <h2>Your Watch Later List</h2>
      <div className="movies-section" >
        {watchlater.map((movie) => (
          <div key={movie.id} className="movie-card" onMouseEnter={() => handleMouseEnter(movie)} onMouseLeave={handleMouseLeave}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="movie-poster"
            />
            <div>{movie.title}</div>
          </div>
        ))}
      </div>

      <Navbar />
      <MovieDialog
        selectedMovie={selectedMovie}
        openDialog={openDialog}
        handleMouseLeave={handleMouseLeave}
        dialogPosition={dialogPosition}
        scrollPosition={scrollPosition}
        favorites={favorites}
        watchlater={watchlater}
        setFavorites={setFavorites}
        setWatchlater={setWatchlater}
      />
    </div>
  );
};

export default Movies;
