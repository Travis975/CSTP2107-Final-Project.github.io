import React from 'react';
import '../css/movieDialog.css';
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
