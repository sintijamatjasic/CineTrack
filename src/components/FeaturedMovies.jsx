import { mockMovies } from "../assets/data";
import MovieCard from "./MovieCard";

function FeaturedMovies() {
  const shuffled = [...mockMovies].sort(() => 0.5 - Math.random());
  const featured = shuffled.slice(0, 5);

  return (
    <div className="bg-[var(--surface)] mt-20 pt-10 rounded-xl border-1 border-[var(--text-secondary)]">
      <h2 className="text-3xl font-bold mb-10 text-center bg-gradient-to-t from-[var(--text-primary)] to-[var(--accent)] bg-clip-text text-transparent">
        Featured Movies
      </h2>
      <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 mt-14 mb-14 px-4 sm:px-8">
        {featured.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            poster={movie.poster}
            rating={movie.rating}
          />
        ))}
      </div>
    </div>
  );
}

export default FeaturedMovies;
