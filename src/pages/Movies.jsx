import React, { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import MovieCard from "../components/MovieCard";
import Navbar from "../components/Navbar";
import Carousel from "../components/Carousel";
import "../css/movies.css";

const Movies = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [videos, setVideos] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [watchlater, setWatchlater] = useState([]);
  const [upcomingIndex, setUpcomingIndex] = useState(0);
  const [topRatedIndex, setTopRatedIndex] = useState(0);
  const [favoriteIndex, setFavoriteIndex] = useState(0);
  const [watchLaterIndex, setWatchLaterIndex] = useState(0);

  const itemsPerPage = 5;

  const fetchMovies = async (url, setMovies) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    fetchMovies(
      `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_TMDB_API_KEY}`,
      setPopularMovies
    );
    fetchMovies(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_TMDB_API_KEY}`,
      setUpcomingMovies
    );
    fetchMovies(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${import.meta.env.VITE_TMDB_API_KEY}`,
      setTopRatedMovies
    );
  }, []);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const favoritesRef = collection(db, "users", user.uid, "favorites");
      const watchlaterRef = collection(db, "users", user.uid, "watchlater");

      onSnapshot(favoritesRef, (snapshot) => {
        setFavorites(snapshot.docs.map((doc) => doc.data()));
      });

      onSnapshot(watchlaterRef, (snapshot) => {
        setWatchlater(snapshot.docs.map((doc) => doc.data()));
      });
    }
  }, []);

  const scroll = (movies, setIndex, direction) => {
    const totalMovies = movies.length;
    if (direction === "next") {
      setIndex((prev) => (prev + itemsPerPage) % totalMovies);
    } else {
      setIndex((prev) => (prev - itemsPerPage + totalMovies) % totalMovies);
    }
  };

  const renderSection = (title, movies, index, setIndex) => (
    <div>
      <h2>{title}</h2>
      <div className="movies-section">
        <button onClick={() => scroll(movies, setIndex, "prev")}>◀</button>
        {movies
          .slice(index, index + itemsPerPage)
          .concat(movies.slice(0, Math.max(0, index + itemsPerPage - movies.length)))
          .map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              favorites={favorites}
              watchlater={watchlater}
              setFavorites={setFavorites}
              setWatchlater={setWatchlater}
              videos={videos}
            />
          ))}
        <button onClick={() => scroll(movies, setIndex, "next")}>▶</button>
      </div>
    </div>
  );

  return (
    <div className="movie-page">
      <Carousel
        movies={popularMovies}
        favorites={favorites}
        watchlater={watchlater}
        setFavorites={setFavorites}
        setWatchlater={setWatchlater}
        videos={videos}
      />
      {renderSection("Upcoming Movies", upcomingMovies, upcomingIndex, setUpcomingIndex)}
      {renderSection("Top Rated Movies", topRatedMovies, topRatedIndex, setTopRatedIndex)}
      {renderSection("Favorites", favorites, favoriteIndex, setFavoriteIndex)}
      {renderSection("Watch Later", watchlater, watchLaterIndex, setWatchLaterIndex)}
      <Navbar />
    </div>
  );
};

export default Movies;
