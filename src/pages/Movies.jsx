import React, { useState, useEffect, useRef } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import MovieCard from "../components/MovieCard";
import Carousel from "../components/Carousel";
import "../css/movies.css";
import Navbar from '../components/Navbar'; 


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
  const [favoriteIndex, setFavoriteIndex] = useState(0);
  const [watchLaterIndex, setWatchLaterIndex] = useState(0);

  const BannerMovies = popularMovies.slice(1,6);

  const itemsPerPage = 5;

  const fetchMovies = async (url, setMovies) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      const moviesWithVideos = await Promise.all(
        data.results.map(async (movie) => {
          try {
            const videoResponse = await fetch(
              `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
            );
            const videoData = await videoResponse.json();
            return { ...movie, videos: videoData.results };
          } catch (videoError) {
            console.error(`Error fetching videos for movie ID ${movie.id}:`, videoError);
            return { ...movie, videos: [] };
          }
        })
      );
  
      setMovies(moviesWithVideos);
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
  
      const unsubscribe = onSnapshot(favoritesRef, (snapshot) => {
        const uniqueFavorites = snapshot.docs
          .map((doc) => doc.data())
          .reduce((acc, movie) => {
            if (!acc.some((m) => m.id === movie.id)) {
              acc.push(movie);
            }
            return acc;
          }, []);
        setFavorites(uniqueFavorites);
      });
  
      return () => unsubscribe();
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
          .map((movie, idx) => (
            <MovieCard
              key={`${movie.id}-${idx}`} // Ensure unique keys
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

  const renderSection2 = (title, movies, index, setIndex) => (
    <div>
      <h2>{title}</h2>
      {movies.length === 0 ? (
        <h4>Please add movies to show them here!</h4>
      ) : (
        <div className="movies-section">
          <button onClick={() => scroll(movies, setIndex, "prev")}>◀</button>
          {movies
            .slice(index, index + itemsPerPage)
            .map((movie, idx) => (
              
              <MovieCard
                key={`${movie.id}-${idx}`} // Ensure unique keys
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
      )}
    </div>
  );

  const favoritesRef = useRef(null);
  const watchlaterRef = useRef(null);

  

  return (
    <div className="movie-page">

      <Navbar favoritesRef={favoritesRef} watchlaterRef={watchlaterRef} />

      <Carousel
        movies={BannerMovies}
        favorites={favorites}
        watchlater={watchlater}
        setFavorites={setFavorites}
        setWatchlater={setWatchlater}
        videos={videos}
      />
      {renderSection("Popular Movies", popularMovies, popularIndex, setPopularIndex)}
      {renderSection("Upcoming Movies", upcomingMovies, upcomingIndex, setUpcomingIndex)}
      {renderSection("Top Rated Movies", topRatedMovies, topRatedIndex, setTopRatedIndex)}
      <div ref={favoritesRef}>
        {renderSection2("Favorites", favorites, favoriteIndex, setFavoriteIndex)}
      </div>
      <div ref={watchlaterRef}>
        {renderSection2("Watch Later", watchlater, watchLaterIndex, setWatchLaterIndex)}
      </div>

    </div>


    
  );
};

export default Movies;