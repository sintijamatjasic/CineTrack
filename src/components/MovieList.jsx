import MovieCard from "./MovieCard";

function MovieList({ movies }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 mt-14">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          id={movie.id}
          title={movie.title}
          poster={movie.poster}
          rating={movie.rating}
        />
      ))}
    </div>
  );
}

export default MovieList;
