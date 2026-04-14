import { useAppSelector } from '../../../../../store/hooks';
import { MovieCard } from '../movie-card/movie-card';
import './movie-grid.css';

export const MovieGrid = () => {
  const { items, loading, error } = useAppSelector((state) => state.movies);

  if (loading) {
    return <div className="grid-message">Loading...</div>;
  }

  if (error) {
    return <div className="grid-message error">{error}</div>;
  }

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="movie-grid-container">
      <div className="movie-grid">
        {items.map((movie) => (
          <MovieCard key={`${movie.media_type}-${movie.id}`} movie={movie} />
        ))}
      </div>
    </div>
  );
};
