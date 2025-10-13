import { useState } from "react";
import MovieList from "../components/MovieList";
import FeaturedMovies from "../components/FeaturedMovies";
import { mockMovies } from "../assets/data";

function Home() {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const filteredMovies = mockMovies.filter((movie) =>
    movie.title.toLowerCase().includes(query.toLowerCase())
  );

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
                onClick={() => setQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] hover:text-[var(--accent)] text-xl focus:outline-none cursor-pointer"
                aria-label="Clear search"
              >
                &#10005;
              </button>
            )}
          </div>
        </form>
      </div>
      {/* Search Results */}
      <div className="mx-auto mt-20">
        {query ? (
          filteredMovies.length > 0 ? (
            <MovieList movies={filteredMovies} />
          ) : (
            <p className="text-center text-[var(--text-secondary)] text-lg mt-10">
              No movies found for "{query}"
            </p>
          )
        ) : (
          <FeaturedMovies />
        )}
      </div>
    </div>
  );
}

export default Home;
