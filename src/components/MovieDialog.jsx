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
    if (!favorites.some((movie) => movie.id === selectedMovie.id)) {
      await addMovieToFavorites(selectedMovie);
      setFavorites((prev) => [...prev, selectedMovie]);
    }
  };
  
  const handleAddToWatchLater = async () => {
    if (!watchlater.some((movie) => movie.id === selectedMovie.id)) {
      await addMovieToWatchlater(selectedMovie);
      setWatchlater((prev) => [...prev, selectedMovie]);
    }
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
