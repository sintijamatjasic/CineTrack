import { Link } from "react-router-dom";

function MovieCard({ id, title, poster, rating }) {
  return (
    <Link
      to={`/movie/${id}`}
      className="bg-[var(--surface)] rounded-xl overflow-hidden hover:scale-105 transition-transform"
    >
      <img src={poster} alt={title} className="w-full h-80 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-[var(--text-primary)]">
          {title}
        </h3>
        <p className="text-[var(--text-secondary)]">⭐ {rating}</p>
      </div>
    </Link>
  );
}

export default MovieCard;
