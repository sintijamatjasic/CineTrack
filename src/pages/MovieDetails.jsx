import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [similarMovies, setSimilarMovies] = useState([]);
  const [similarLoading, setSimilarLoading] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${BASE_URL}/movie/${id}?api_key=${API_KEY}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch movie details");
        }

        const data = await response.json();

        const transformedMovie = {
          id: data.id,
          title: data.title,
          poster: data.poster_path
            ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
            : "https://via.placeholder.com/500x750?text=No+Poster",
          rating: data.vote_average.toFixed(1),
          releaseDate: data.release_date,
          runtime: data.runtime,
          overview: data.overview,
        };

        setMovie(transformedMovie);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  useEffect(() => {
    const fetchSimilarMovies = async () => {
      if (!movie) return;

      setSimilarLoading(true);

      try {
        const response = await fetch(
          `${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch similar movies");
        }

        const data = await response.json();

        const transformedMovies = data.results.slice(0, 3).map((m) => ({
          id: m.id,
          title: m.title,
          poster: m.poster_path
            ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
            : "https://via.placeholder.com/500x750?text=No+Poster",
          rating: m.vote_average.toFixed(1),
        }));

        setSimilarMovies(transformedMovies);
      } catch (err) {
        console.error("Error fetching similar movies:", err);
        setSimilarMovies([]);
      } finally {
        setSimilarLoading(false);
      }
    };

    fetchSimilarMovies();
  }, [movie, id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[var(--accent)]"></div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-xl mb-2">
            ⚠️ {error || "Movie not found"}
          </p>
          <button
            onClick={() => navigate(-1)}
            className="text-[var(--accent)] hover:underline"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)] px-6 py-10">
      {/* Back Button */}
      <div className="max-w-5xl mx-auto mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors group cursor-pointer"
        >
          <svg
            className="w-6 h-6 group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Movies
        </button>
      </div>

      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-10">
        {/* Poster */}
        <img
          src={movie.poster}
          alt={movie.title}
          className="rounded-xl w-full object-cover shadow-lg"
        />

        {/* Details */}
        <div className="md:col-span-2 flex flex-col gap-4">
          <h1 className="text-4xl font-bold">{movie.title}</h1>
          <p className="text-[var(--text-secondary)]">
            Release Date: {movie.releaseDate || "N/A"} | Runtime:{" "}
            {movie.runtime ? `${movie.runtime} min` : "N/A"}
          </p>

          <p className="text-[var(--text-secondary)]">⭐ {movie.rating}</p>

          <div>
            <h2 className="text-xl font-semibold mt-4 mb-2">Overview</h2>
            <p className="leading-relaxed text-[var(--text-primary)]">
              {movie.overview || "No overview available."}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mt-6 mb-2">Your Rating</h2>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  className="px-3 py-1 rounded bg-[var(--surface)] hover:bg-[var(--accent)] hover:text-white transition"
                >
                  {num}⭐
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* You Might Also Like */}
      <div className="max-w-5xl mx-auto mt-20">
        <h2 className="text-2xl font-semibold mb-6">You Might Also Like</h2>
        {similarLoading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[var(--accent)]"></div>
          </div>
        ) : similarMovies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {similarMovies.map((m) => (
              <MovieCard key={m.id} {...m} />
            ))}
          </div>
        ) : (
          <p className="text-[var(--text-secondary)]">
            No similar movies found.
          </p>
        )}
      </div>
    </div>
  );
}

export default MovieDetails;
