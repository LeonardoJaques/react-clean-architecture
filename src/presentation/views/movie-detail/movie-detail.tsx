import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { moviesService } from '../../../ifrastructure/movies/movies.service';
import type { MediaDetails } from '../../../ifrastructure/movies/movie.types';
import { Header } from '../../shared/header/header';
import { Button } from '../../shared/button/button';
import './movie-detail.css';

export const MovieDetail = () => {
  const { id, type } = useParams<{ id: string; type: 'movie' | 'tv' }>();
  const [details, setDetails] = useState<MediaDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchDetails = async () => {
      if (id && type) {
        try {
          const data = await moviesService.getDetails(Number(id), type);
          setDetails(data);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchDetails();
  }, [id, type]);

  if (loading) return <div>Loading...</div>;
  if (!details) return <div>Data not found</div>;

  const posterUrl = details.poster_path 
    ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Poster';

  return (
    <div className="movie-detail-container">
      <Header />
      <main className="detail-main">
        <div className="detail-actions">
           <Button variant="secondary" onClick={() => navigate(-1)}>
             &larr; {t('details.back')}
           </Button>
        </div>
        <div className="detail-content">
          <img src={posterUrl} alt={details.title} className="detail-poster" />
          <div className="detail-info">
            <h1>{details.title}</h1>
            <p><strong>{t('details.release_date')}:</strong> {details.release_date}</p>
            <p><strong>{t('details.rating')}:</strong> {details.vote_average.toFixed(1)} / 10</p>
            <p><strong>{t('details.overview')}:</strong></p>
            <p className="overview">{details.overview}</p>
          </div>
        </div>
      </main>
    </div>
  );
};
