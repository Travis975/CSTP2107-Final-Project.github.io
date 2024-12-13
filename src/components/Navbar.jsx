import React, { useState, useEffect } from 'react';
import { AppBar, Box, Button, Menu, MenuItem, Toolbar, IconButton, TextField, Typography, Grid } from '@mui/material';
import { signOut } from 'firebase/auth';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import logo from '../assets/logo.png';
import userlogo from '../assets/user.png';

const Navbar = ({ favoritesRef, watchlaterRef }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [genres, setGenres] = useState({});

    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`);
                const data = await response.json();
                const genreMap = {};
                data.genres.forEach((genre) => {
                    genreMap[genre.name.toLowerCase()] = genre.id;
                });
                setGenres(genreMap);
            } catch (error) {
                console.error('Error fetching genres:', error);
            }
        };

        fetchGenres();
    }, [API_KEY]);

    const handleSignout = async () => {
        try {
            await signOut(auth);
            navigate('/');
            handleCloseDropdown();
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    const handleLogoClick = () => {
        if (
            location.pathname === '/' ||
            location.pathname === '/signin' ||
            location.pathname === '/signup' ||
            location.pathname === '/privacy-policy' ||
            location.pathname === '/terms-and-conditions' 
        ) {
            navigate('/');
        } else if (
            location.pathname === '/movies' ||
            location.pathname === '/watch-trailer' ||
            location.pathname === '/account' ||
            location.pathname === '/favourites' ||
            location.pathname === '/watchlater'
        ) {
            navigate('/movies');
        }
    };

    const handleUserLogoHover = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseDropdown = () => {
        setAnchorEl(null);
    };

    const handleNavigation = (route) => {
        navigate(route);
        handleCloseDropdown();
    };

    const handleDivNavigation = (route) => {
        navigate(`/movies#${route}`);
        setTimeout(() => {
            if (route === 'favorites' && favoritesRef) {
                favoritesRef.current.scrollIntoView({ behavior: 'smooth' });
            } else if (route === 'watchlater' && watchlaterRef) {
                watchlaterRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    };

    const handleSearchOpen = () => {
        setIsSearchOpen(true);
    };

    const handleSearchClose = () => {
        setIsSearchOpen(false);
        setSearchQuery('');
        setFilteredMovies([]);
    };

    const handleSearchChange = async (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);
    
        if (query.trim() === '') {
            setFilteredMovies([]);
            return;
        }
    
        const genreId = genres[query];
        const url = genreId
            ? `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`
            : `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`;
    
        try {
            const response = await fetch(url);
            const data = await response.json();
            
            // Filter results to only include movies with posters
            const moviesWithPosters = (data.results || []).filter((movie) => movie.poster_path);
    
            // Check for trailer availability for each movie
            const moviesWithTrailers = await Promise.all(
                moviesWithPosters.map(async (movie) => {
                    try {
                        const trailerResponse = await fetch(
                            `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}`
                        );
                        const trailerData = await trailerResponse.json();
                        return trailerData.results && trailerData.results.length > 0 ? movie : null;
                    } catch (error) {
                        console.error(`Error checking trailer for movie ${movie.id}:`, error);
                        return null;
                    }
                })
            );
    
            // Remove null values (movies without trailers)
            const filteredResults = moviesWithTrailers.filter((movie) => movie !== null);
            setFilteredMovies(filteredResults);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };
    

    const publicRoutes = ['/', '/signin', '/signup', '/privacy-policy', '/terms-and-conditions'];
    const isPublicRoute = publicRoutes.includes(location.pathname);

    return (
        <AppBar
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0 16px',
                backgroundColor: '#D3D3D3',
                height: '80px',
            }}
        >
            <Toolbar style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <Box>
                    <img
                        src={logo}
                        alt="Webflix Logo"
                        style={{
                            height: 60,
                            cursor: 'pointer',
                            marginLeft: '-15px',
                            marginTop: '35px',
                        }}
                        onClick={handleLogoClick}
                    />
                </Box>

                <Box>
                    {isPublicRoute ? (
                        <>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => navigate('/signin')}
                                style={{
                                    color: 'black',
                                    backgroundColor: 'transparent',
                                    textTransform: 'none',
                                    fontWeight: 'bold',
                                    marginRight: '10px',
                                    boxShadow: 'none',
                                }}                            >
                                Login
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => navigate('/signup')}
                                style={{
                                    color: 'black',
                                    backgroundColor: 'transparent',
                                    textTransform: 'none',
                                    fontWeight: 'bold',
                                    marginRight: '10px',
                                    boxShadow: 'none',
                                }}
                            >
                                Sign Up
                            </Button>
                        </>
                    ) : (
                        <>
                            <IconButton onClick={handleSearchOpen} style={{ position: 'relative', top: '27px', left: '-65px' }}>
                                <SearchIcon sx={{ fontSize: '42px', color: '#4262BE' }} />
                            </IconButton>
                            
                            {isSearchOpen && (
                                <Box
                                    style={{
                                        position: 'fixed',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        backgroundColor: 'rgba(0, 0, 0, 0.9)',
                                        color: 'white',
                                        zIndex: 1300,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'flex-start',
                                        padding: '20px',
                                    }}
                                >
                                    <IconButton
                                        style={{ alignSelf: 'flex-end', color: 'white' }}
                                        sx={{ position: 'relative', left: '-30px' }} 
                                        onClick={handleSearchClose}
                                    >
                                        <CloseIcon />
                                    </IconButton>

                                    <TextField
                                        autoFocus
                                        variant="outlined"
                                        placeholder="Search by title or genre..."
                                        value={searchQuery}
                                        onChange={handleSearchChange}
                                        InputProps={{
                                            style: { color: 'white', fontSize: '1.5rem' },
                                        }}
                                        style={{
                                            marginBottom: '20px',
                                            width: '80%',
                                        }}
                                    />

                                    <Box style={{ overflowY: 'auto', width: '80%' }}>
                                        {filteredMovies.length > 0 ? (
                                            <Grid container spacing={3}>
                                                {filteredMovies.map((movie) => (
                                                    <Grid item xs={6} sm={4} md={3} key={movie.id}>
                                                        <Box
                                                            style={{
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                                alignItems: 'center',
                                                                cursor: 'pointer',
                                                            }}
                                                            onClick={async () => {
                                                                try {
                                                                    const response = await fetch(
                                                                        `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}`
                                                                    );
                                                                    const data = await response.json();
                                                                    const videoId = data.results[0]?.key;
                                                            
                                                                    if (videoId) {
                                                                        handleSearchClose(); // Close the search modal
                                                                        navigate('/watch-trailer', {
                                                                            state: { videoId, movieTitle: movie.title },
                                                                        });
                                                                    } else {
                                                                        alert('Trailer not available!');
                                                                    }
                                                                } catch (error) {
                                                                    console.error('Error fetching video data:', error);
                                                                    alert('Failed to fetch trailer!');
                                                                }
                                                            }}
                                                            
                                                        >
                                                            <img
                                                                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                                                alt={movie.title}
                                                                style={{
                                                                    width: '100%',
                                                                    height: 'auto',
                                                                    borderRadius: '5px',
                                                                }}
                                                            />
                                                            <Typography variant="body2" style={{ marginTop: '10px', textAlign: 'center' }}>
                                                                {movie.title}
                                                            </Typography>
                                                        </Box>
                                                    </Grid>
                                                ))}
                                            </Grid>
                                        ) : (
                                            <Typography>No results found</Typography>
                                        )}
                                    </Box>
                                </Box>
                            )}

                            <img
                                src={userlogo}
                                alt="User Logo"
                                style={{
                                    height: 45,
                                    cursor: 'pointer',
                                    marginRight: '15px',
                                    marginTop: '-25px',
                                }}
                                onMouseEnter={handleUserLogoHover}
                            />
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleCloseDropdown}
                                MenuListProps={{
                                    onMouseLeave: handleCloseDropdown,
                                }}
                            >
                                <MenuItem onClick={() => handleNavigation('/account')}>
                                    My Account
                                </MenuItem>
                                <MenuItem onClick={() => handleDivNavigation('favorites')}>
                                    Favorite Movies
                                </MenuItem>
                                <MenuItem onClick={() => handleDivNavigation('watchlater')}>
                                    Watch Later
                                </MenuItem>
                                <MenuItem onClick={handleSignout}>Sign Out</MenuItem>
                            </Menu>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;