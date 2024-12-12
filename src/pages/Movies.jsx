import React, { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import "../css/movies.css";

const Movies = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [watchlater, setWatchlater] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [upcomingIndex, setUpcomingIndex] = useState(0);
  const [topRatedIndex, setTopRatedIndex] = useState(0);
  const [popularIndex, setPopularIndex] = useState(0);  // New state for Popular Movies

  const itemsPerPage = 6;
  const slideCount = popularMovies.length;

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

  const nextSlide = () => {
    if (slideCount > 0) {
      setCurrentSlide((prev) => (prev + 1) % slideCount);
    }
  };

  const prevSlide = () => {
    if (slideCount > 0) {
      setCurrentSlide((prev) => (prev - 1 + slideCount) % slideCount);
    }
  };

  useEffect(() => {
    if (slideCount === 0) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [slideCount]);

  return (
    <div className="movie-page">
      {/* Popular Movies */}
      <div>
        <h2>Popular Movies</h2>
        <div className="movies-section-movie-page">
          <button onClick={() => scroll(popularMovies, setPopularIndex, "prev")}>◀</button>
          {popularMovies
            .slice(popularIndex, popularIndex + itemsPerPage)
            .concat(
              popularMovies.slice(0, Math.max(0, popularIndex + itemsPerPage - popularMovies.length))
            )
            .map((movie) => (
              <div key={movie.id} className="movie-box">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="movie-poster"
                />
                <div className="movie-title">{movie.title}</div>
                <div className="hover-actions">
                  {!favorites.some((fav) => fav.id === movie.id) ? (
                    <button
                      onClick={() => {
                        setFavorites((prev) => [...prev, movie]);
                      }}
                    >
                      Add to Favorites
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setFavorites((prev) => prev.filter((fav) => fav.id !== movie.id));
                      }}
                    >
                      Remove from Favorites
                    </button>
                  )}
                  {!watchlater.some((later) => later.id === movie.id) ? (
                    <button
                      onClick={() => {
                        setWatchlater((prev) => [...prev, movie]);
                      }}
                    >
                      Add to Watch Later
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setWatchlater((prev) => prev.filter((later) => later.id !== movie.id));
                      }}
                    >
                      Remove from Watch Later
                    </button>
                  )}
                </div>
              </div>
            ))}
          <button onClick={() => scroll(popularMovies, setPopularIndex, "next")}>▶</button>
        </div>
      </div>

      {/* Upcoming Movies */}
      <div>
        <h2>Upcoming Movies</h2>
        <div className="movies-section-movie-page">
          <button onClick={() => scroll(upcomingMovies, setUpcomingIndex, "prev")}>◀</button>
          {upcomingMovies
            .slice(upcomingIndex, upcomingIndex + itemsPerPage)
            .concat(
              upcomingMovies.slice(0, Math.max(0, upcomingIndex + itemsPerPage - upcomingMovies.length))
            )
            .map((movie) => (
              <div key={movie.id} className="movie-box">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="movie-poster"
                />
                <div className="movie-title">{movie.title}</div>
                <div className="hover-actions">
                  {!favorites.some((fav) => fav.id === movie.id) ? (
                    <button
                      onClick={() => {
                        setFavorites((prev) => [...prev, movie]);
                      }}
                    >
                      Add to Favorites
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setFavorites((prev) => prev.filter((fav) => fav.id !== movie.id));
                      }}
                    >
                      Remove from Favorites
                    </button>
                  )}
                  {!watchlater.some((later) => later.id === movie.id) ? (
                    <button
                      onClick={() => {
                        setWatchlater((prev) => [...prev, movie]);
                      }}
                    >
                      Add to Watch Later
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setWatchlater((prev) => prev.filter((later) => later.id !== movie.id));
                      }}
                    >
                      Remove from Watch Later
                    </button>
                  )}
                </div>
              </div>
            ))}
          <button onClick={() => scroll(upcomingMovies, setUpcomingIndex, "next")}>▶</button>
        </div>
      </div>

      {/* Top Rated Movies */}
      <div>
        <h2>Top Rated Movies</h2>
        <div className="movies-section-movie-page">
          <button onClick={() => scroll(topRatedMovies, setTopRatedIndex, "prev")}>◀</button>
          {topRatedMovies
            .slice(topRatedIndex, topRatedIndex + itemsPerPage)
            .concat(
              topRatedMovies.slice(0, Math.max(0, topRatedIndex + itemsPerPage - topRatedMovies.length))
            )
            .map((movie) => (
              <div key={movie.id} className="movie-box">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="movie-poster"
                />
                <div className="movie-title">{movie.title}</div>
                <div className="hover-actions">
                  {!favorites.some((fav) => fav.id === movie.id) ? (
                    <button
                      onClick={() => {
                        setFavorites((prev) => [...prev, movie]);
                      }}
                    >
                      Add to Favorites
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setFavorites((prev) => prev.filter((fav) => fav.id !== movie.id));
                      }}
                    >
                      Remove from Favorites
                    </button>
                  )}
                  {!watchlater.some((later) => later.id === movie.id) ? (
                    <button
                      onClick={() => {
                        setWatchlater((prev) => [...prev, movie]);
                      }}
                    >
                      Add to Watch Later
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setWatchlater((prev) => prev.filter((later) => later.id !== movie.id));
                      }}
                    >
                      Remove from Watch Later
                    </button>
                  )}
                </div>
              </div>
            ))}
          <button onClick={() => scroll(topRatedMovies, setTopRatedIndex, "next")}>▶</button>
        </div>
      </div>
    </div>
  );
};

export default Movies;
