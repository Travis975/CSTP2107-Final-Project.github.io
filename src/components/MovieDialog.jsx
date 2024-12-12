import React from 'react';
import '../css/movieDialog.css';
import { 
  addMovieToFavorites, 
  addMovieToWatchlater, 
  removeMovieFromFavorites, 
  removeMovieFromWatchlater 
} from '../firebaseFunctions'; // Ensure remove functions are imported

const MovieDialog = ({
  selectedMovie,
  openDialog,
  handleMouseLeave,
  dialogPosition,
  scrollPosition,
  favorites,
  watchlater,
  setFavorites, // Passed down from parent to update state
  setWatchlater, // Passed down from parent to update state
}) => {
  if (!selectedMovie || !openDialog) return null;

  const isFavorite = favorites.some((movie) => movie.id === selectedMovie.id);
  const isWatchLater = watchlater.some((movie) => movie.id === selectedMovie.id);

  const handleAddToFavorites = async () => {
    await addMovieToFavorites(selectedMovie);
    setFavorites((prev) => [...prev, selectedMovie]); // Update local state to trigger re-render
  };

  const handleAddToWatchLater = async () => {
    await addMovieToWatchlater(selectedMovie);
    setWatchlater((prev) => [...prev, selectedMovie]); // Update local state to trigger re-render
  };

  const handleRemoveFromFavorites = async () => {
    await removeMovieFromFavorites(selectedMovie);
    setFavorites((prev) => prev.filter((movie) => movie.id !== selectedMovie.id)); // Update local state
  };

  const handleRemoveFromWatchLater = async () => {
    await removeMovieFromWatchlater(selectedMovie);
    setWatchlater((prev) => prev.filter((movie) => movie.id !== selectedMovie.id)); // Update local state
  };

  return (
    <div
      className="movie-dialog"
      style={{
        top: dialogPosition.top - scrollPosition.y + 'px',
        left: dialogPosition.left + 'px',
      }}
      onMouseLeave={handleMouseLeave}
    >
      <div className="movie-dialog-content">
        <h3>{selectedMovie.title}</h3>
        <p>{selectedMovie.overview}</p>
        <img
          src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
          alt={selectedMovie.title}
        />
        <div className="movie-dialog-buttons">
          {!isFavorite && (
            <button onClick={handleAddToFavorites}>Add to Favorites</button>
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
