import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "../css/moviecard.css";
import MovieDialog from "./MovieDialog"; // Importing MovieDialog

const MovieCard = ({
  movie,
  onMouseEnter,
  onMouseLeave,
  favorites = [],
  watchlater = [],
  setFavorites,
  setWatchlater,
  videos = {},
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogPosition, setDialogPosition] = useState({ top: 0, left: 0 });
  const cardRef = useRef(null);

  if (!movie || !movie.id || !movie.poster_path) {
    console.error("Invalid movie data passed to MovieCard.");
    return null;
  }

  const handleMouseEnter = (event) => {
    onMouseEnter && onMouseEnter(movie, event);
    const rect = cardRef.current.getBoundingClientRect();
    setDialogPosition({ top: rect.top + window.scrollY, left: rect.left + window.scrollX });
    setOpenDialog(true);
  };

  const handleMouseLeave = () => {
    onMouseLeave && onMouseLeave();
    setOpenDialog(false);
  };

  return (
    <div
      className="movie-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={cardRef}
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

      <MovieDialog
        selectedMovie={movie}
        openDialog={openDialog}
        handleMouseLeave={handleMouseLeave}
        dialogPosition={dialogPosition}
        favorites={favorites}
        watchlater={watchlater}
        setFavorites={setFavorites}
        setWatchlater={setWatchlater}
      />
    </div>
  );
};

export default MovieCard;