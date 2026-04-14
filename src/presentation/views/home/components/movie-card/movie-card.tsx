import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import type { MediaItem } from '../../../../../ifrastructure/movies/movie.types';
import { Button } from '../../../../shared/button/button';
import { useAppDispatch, useAppSelector } from '../../../../../store/hooks';
import { addToMyList, removeFromMyList } from '../../../../../store/slices/myListSlice';
import './movie-card.css';

interface MovieCardProps {
  movie: MediaItem;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isLiked = useAppSelector((state) =>
    state.myList.items.some((item) => item.id === movie.id && item.media_type === movie.media_type)
  );

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLiked) {
      dispatch(removeFromMyList({ id: movie.id, media_type: movie.media_type }));
    } else {
      dispatch(addToMyList(movie));
    }
  };

  const handleCardClick = () => {
    navigate(`/details/${movie.media_type}/${movie.id}`);
  };

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Poster';

  return (
    <div className="movie-card" onClick={handleCardClick}>
      <img src={posterUrl} alt={movie.title} className="movie-poster" />
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <Button
          variant={isLiked ? 'liked' : 'primary'}
          onClick={handleLike}
          className="like-btn"
        >
          {isLiked ? t('movie_card.unlike') : t('movie_card.like')}
        </Button>
      </div>
    </div>
  );
};
