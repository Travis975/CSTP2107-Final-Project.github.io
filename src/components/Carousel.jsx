import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton, Box, Typography, Button } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "../css/carousel.css"; // Normal CSS file for additional styles

const Carousel = ({ movies = [] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
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
    if (slideCount === 0) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [slideCount]);

  if (slideCount === 0) {
    return <Typography>No movies available.</Typography>;
  }

  return (
    <Box className="carousel-container">
      {/* Background Image for Current Slide */}
      <Box
        className="carousel-slide-background"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movies[currentSlide]?.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          position: "relative",
        }}
      >
        {/* Movie Details Overlay */}
        <Box
          className="carousel-overlay"
          style={{
            position: "absolute",
            bottom: "10%",
            left: "5%",
            color: "#fff",
            textShadow: "0 2px 4px rgba(0, 0, 0, 0.8)",
            maxWidth: "50%",
          }}
        >
          <Typography variant="h3" gutterBottom>
            {movies[currentSlide]?.title}
          </Typography>
          <Box display="flex" alignItems="center" gap={2}>
            <Typography variant="body1">{movies[currentSlide]?.vote_average.toFixed(1)} ⭐</Typography>
            <Typography variant="body1">{new Date(movies[currentSlide]?.release_date).getFullYear()}</Typography>
          </Box>
          <Typography variant="body1" gutterBottom>
            {(movies[currentSlide]?.overview.slice(0, 160) + "...") || "No description available."}
          </Typography>
          <Button
            variant="contained"
            color="success"
            onClick={() =>
              navigate("/watch-trailer", {
                state: {
                  videoId: movies[currentSlide]?.videos?.[0]?.key || null,
                  movieTitle: movies[currentSlide]?.title,
                },
              })
            }
          >
            Watch Now
          </Button>
        </Box>
      </Box>

      {/* Navigation Buttons */}
      <IconButton
        onClick={prevSlide}
        className="carousel-button prev-button"
        aria-label="Previous Slide"
        style={{
          position: "absolute",
          top: "50%",
          left: "2%",
          zIndex: 10,
          color: "#fff",
        }}
      >
        <ArrowBackIosIcon />
      </IconButton>
      <IconButton
        onClick={nextSlide}
        className="carousel-button next-button"
        aria-label="Next Slide"
        style={{
          position: "absolute",
          top: "50%",
          right: "2%",
          zIndex: 10,
          color: "#fff",
        }}
      >
        <ArrowForwardIosIcon />
      </IconButton>

      {/* Progress Indicators */}
      <Box
        className="carousel-indicators"
        style={{
          position: "absolute",
          bottom: "2%",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "0.5rem",
        }}
      >
        {movies.map((_, index) => (
          <Box
            key={index}
            style={{
              height: "10px",
              width: "10px",
              borderRadius: "50%",
              backgroundColor: currentSlide === index ? "#fff" : "#aaa",
              transition: "background-color 0.3s",
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Carousel;
