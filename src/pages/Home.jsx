import { useState, useEffect } from "react"; // ADD useEffect
import MovieList from "../components/MovieList";
import FeaturedMovies from "../components/FeaturedMovies";
import { Wand } from "lucide-react";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

function Home() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [featuredLoading, setFeaturedLoading] = useState(false);

  useEffect(() => {
    const fetchFeaturedMovies = async () => {
      setFeaturedLoading(true);
      try {
        const response = await fetch(
          `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch featured movies");
        }

        const data = await response.json();

        const transformedMovies = data.results.slice(0, 5).map((movie) => ({
          id: movie.id,
          title: movie.title,
          poster: movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "https://via.placeholder.com/500x750?text=No+Poster",
          rating: movie.vote_average.toFixed(1),
        }));

        setFeaturedMovies(transformedMovies);
      } catch (err) {
        console.error("Error fetching featured movies:", err);
      } finally {
        setFeaturedLoading(false);
      }
    };

    fetchFeaturedMovies();
  }, []);

  useEffect(() => {
    if (query.trim()) {
      searchMovies(query);
    } else {
      setHasSearched(false);
      setMovies([]);
    }
  }, [query]);

  // Search Movies
  const searchMovies = async (searchQuery) => {
    if (!searchQuery.trim()) {
      setHasSearched(false);
      setMovies([]);
      return;
    }

    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const response = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
          searchQuery
        )}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }

      const data = await response.json();

      const transformedMovies = data.results.map((movie) => ({
        id: movie.id,
        title: movie.title,
        poster: movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : "https://via.placeholder.com/500x750?text=No+Poster",
        rating: movie.vote_average ? movie.vote_average.toFixed(1) : "N/A",
      }));
      setMovies(transformedMovies);
    } catch (err) {
      setError(err.message);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchMovies(query);
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)] px-6 py-20">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-hover)] bg-clip-text text-transparent">
          Find Your Next Movie
        </h1>

        {/* Search Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center"
        >
          <div className="relative flex-1 max-w-2xl">
            <input
              type="text"
              placeholder="Search for movies..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-6 py-4 text-lg bg-[var(--surface)] border-2 border-[var(--divider)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--accent)] focus:shadow-lg focus:shadow-[var(--accent)]/20 transition-all duration-400"
            />
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setHasSearched(false);
                  setMovies([]);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] hover:text-[var(--accent)] text-xl focus:outline-none cursor-pointer"
                aria-label="Clear search"
              >
                &#10005;
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="mx-auto mt-20">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[var(--accent)]"></div>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-500 text-lg mb-2">⚠️ {error}</p>
            <p className="text-[var(--text-secondary)]">
              Please try again later
            </p>
          </div>
        ) : hasSearched ? (
          movies.length > 0 ? (
            <MovieList movies={movies} />
          ) : (
            <p className="text-center text-[var(--text-secondary)] text-lg mt-10">
              No movies found for "{query}"
            </p>
          )
        ) : (
          <FeaturedMovies movies={featuredMovies} loading={featuredLoading} />
        )}
      </div>
    </div>
  );
}

export default Home;
