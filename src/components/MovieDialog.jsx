import React from 'react';
import { useState, useEffect } from 'react';
import '../css/movieDialog.css';
import { useNavigate } from 'react-router-dom';

import { 
  addMovieToFavorites, 
  addMovieToWatchlater, 
  removeMovieFromFavorites, 
  removeMovieFromWatchlater 
} from '../firebaseFunctions';

const MovieDialog = ({
  selectedMovie,
  openDialog,
  handleMouseLeave,
  dialogPosition = { top: 0, left: 0 }, 
  scrollPosition = { y: 0 },
  favorites,
  watchlater,
  setFavorites,
  setWatchlater,
}) => {
  const [videoId, setVideoId] = useState(null); // To store the trailer video ID
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the trailer video ID when the selectedMovie changes
    if (selectedMovie) {
      const fetchTrailer = async () => {
        try {
          const response = await fetch(`https://api.themoviedb.org/3/movie/${selectedMovie.id}/videos?api_key=${import.meta.env.VITE_TMDB_API_KEY}`);
          const data = await response.json();
          const trailer = data.results.find((video) => video.site === 'YouTube');
          if (trailer) {
            setVideoId(trailer.key);
          }
        } catch (error) {
          console.error('Error fetching trailer:', error);
        }
      };
      fetchTrailer();
    }
  }, [selectedMovie]);

  if (!selectedMovie || !openDialog) return null;

  const isFavorite = favorites.some((movie) => movie.id === selectedMovie.id);
  const isWatchLater = watchlater.some((movie) => movie.id === selectedMovie.id);

  const handleAddToFavorites = async () => {
    console.log("Add to favorites triggered / movie dialog");
    
    // Check if the movie is already in favorites before proceeding to Firebase
    if (!favorites.some((movie) => movie.id === selectedMovie.id)) {
      await addMovieToFavorites(selectedMovie);
    }
  
    // Update the local state
    setFavorites((prevFavorites) => {
      if (prevFavorites.some((movie) => movie.id === selectedMovie.id)) {
        return prevFavorites; // Return the previous state if the movie already exists
      }
  
      return [...prevFavorites, selectedMovie]; // Add the movie if it doesn't exist
    });
  };
  
  
  const handleAddToWatchLater = async () => {
    await addMovieToWatchlater(selectedMovie);
    setWatchlater((prev) => {
      if (!prev.some((movie) => movie.id === selectedMovie.id)) {
        return [...prev, selectedMovie];
      }
      return prev;
    });
  };
  
  const handleRemoveFromFavorites = async () => {
    await removeMovieFromFavorites(selectedMovie);
    setFavorites((prev) => prev.filter((movie) => movie.id !== selectedMovie.id));
  };

  const handleRemoveFromWatchLater = async () => {
    await removeMovieFromWatchlater(selectedMovie);
    setWatchlater((prev) => prev.filter((movie) => movie.id !== selectedMovie.id));
  };

  const handlePosterClick = () => {
    // Only navigate if a trailer is found
    if (videoId) {
      navigate('/watch-trailer', {
        state: {
          videoId: videoId,
          movieTitle: selectedMovie.title,
        },
      });
    } else {
      console.log("No trailer found for this movie");
    }
  };

  return (
    <div
      className="movie-dialog"
      style={{
        top: `${dialogPosition.top - scrollPosition.y}px`,
        left: `${dialogPosition}px`,
      }}
      onMouseLeave={handleMouseLeave}
    >
      <div className="movie-dialog-content">
        <h3>{selectedMovie.title}</h3>
        <img
          src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
          alt={selectedMovie.title}
          onClick={handlePosterClick}
          style={{ cursor: 'pointer' }}
        />
        <div className="movie-dialog-buttons">
          {!isFavorite && (
            <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent bubbling
              handleAddToFavorites();
            }}
          >
            Add to Favorites
          </button>
          
          )}
          {isFavorite && (
            <button onClick={handleRemoveFromFavorites}>Remove from Favorites</button>
          )}
          {!isWatchLater && (
            <button onClick={handleAddToWatchLater}>Add to Watch Later</button>
          )}
          {isWatchLater && (
            <button onClick={handleRemoveFromWatchLater}>Remove from Watch Later</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDialog;
