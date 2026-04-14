import { useTranslation } from 'react-i18next';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { removeFromMyList } from '../../../store/slices/myListSlice';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../shared/header/header';
import { Button } from '../../shared/button/button';
import './my-list.css';

export const MyList = () => {
  const { t } = useTranslation();
  const items = useAppSelector((state) => state.myList.items);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleRemove = (e: React.MouseEvent, id: number, media_type: string) => {
    e.stopPropagation();
    dispatch(removeFromMyList({ id, media_type }));
  };

  const handleCardClick = (id: number, media_type: string) => {
    navigate(`/details/${media_type}/${id}`);
  };

  return (
    <div className="my-list-container">
      <Header />
      <main className="my-list-main">
        <h1 className="my-list-title">{t('header.my_list')}</h1>

        {items.length === 0 ? (
          <div className="my-list-empty">
            <p>{t('my_list.empty')}</p>
          </div>
        ) : (
          <div className="my-list-grid">
            {items.map((movie) => {
              const posterUrl = movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : 'https://via.placeholder.com/500x750?text=No+Poster';

              return (
                <div
                  key={`${movie.media_type}-${movie.id}`}
                  className="my-list-card"
                  onClick={() => handleCardClick(movie.id, movie.media_type)}
                >
                  <img src={posterUrl} alt={movie.title} className="my-list-poster" />
                  <div className="my-list-info">
                    <h3 className="my-list-movie-title">{movie.title}</h3>
                    <Button
                      variant="liked"
                      className="remove-btn"
                      onClick={(e) => handleRemove(e, movie.id, movie.media_type)}
                    >
                      {t('movie_card.unlike')}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};
