import { useParams, useNavigate } from "react-router-dom"; // ← Add useNavigate
import { mockMovies } from "../assets/data";
import MovieCard from "../components/MovieCard";

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate(); // ← Create navigate function
  const movie = mockMovies.find((m) => m.id === Number(id));

  if (!movie) {
    return (
      <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center">
        <p className="text-[var(--text-primary)] text-xl">Movie not found.</p>
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
            Release Date: {movie.releaseDate || "2024"} | Runtime: 2h 10m
          </p>

          <p className="text-[var(--text-secondary)]">⭐ {movie.rating}</p>

          <div>
            <h2 className="text-xl font-semibold mt-4 mb-2">Overview</h2>
            <p className="leading-relaxed text-[var(--text-primary)]">
              {movie.overview ||
                "This is a placeholder overview for the movie. Replace it with real API data later."}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {mockMovies
            .filter((m) => m.id !== Number(id))
            .slice(0, 3)
            .map((m) => (
              <MovieCard key={m.id} {...m} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
