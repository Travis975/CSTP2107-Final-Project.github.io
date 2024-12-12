import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
// not used for now

const Carousel = ({
  movies = [], // Default to an empty array to prevent undefined errors
  favorites,
  watchlater,
  setFavorites,
  setWatchlater,
  videos,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideCount = movies.length;

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
    if (slideCount === 0) return; // Stop interval if there are no slides

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [slideCount]); // Ensure this effect re-runs when `slideCount` changes

  // Reset currentSlide if `movies` changes and becomes shorter
  useEffect(() => {
    if (currentSlide >= slideCount) {
      setCurrentSlide(0); // Reset to the first slide if out of bounds
    }
  }, [movies, slideCount, currentSlide]);

  return (
    <div className="relative w-full max-w-7xl mx-auto overflow-hidden">
      {/* Slide wrapper */}
      <div
        className="flex transition-transform duration-500"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {movies.map((movie, index) => (
          <div key={movie.id} className="min-w-full">
            <MovieCard
              movie={movie}
              favorites={favorites}
              watchlater={watchlater}
              setFavorites={setFavorites}
              setWatchlater={setWatchlater}
              videos={videos}
            />
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600 transition-all z-10"
      >
        ◀
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600 transition-all z-10"
      >
        ▶
      </button>

      {/* Progress indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {movies.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full ${
              currentSlide === index ? "bg-gray-800" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
