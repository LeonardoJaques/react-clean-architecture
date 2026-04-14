import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../../../../store/hooks';
import { fetchMovies } from '../../../../../store/slices/moviesSlice';
import { Button } from '../../../../shared/button/button';
import './search-bar.css';

export const SearchBar = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  
  const [query, setQuery] = useState('');
  const [type, setType] = useState<'movie' | 'tv' | 'episode'>('movie');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      dispatch(fetchMovies({ query, type }));
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSearch}>
      <input 
        type="text" 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t('search.placeholder')}
        className="search-input"
      />
      <select 
        value={type} 
        onChange={(e) => setType(e.target.value as any)}
        className="search-select"
      >
        <option value="movie" disabled hidden>{t('search.dropdown_default')}</option>
        <option value="movie">{t('search.dropdown_movies')}</option>
        <option value="tv">{t('search.dropdown_series')}</option>
        <option value="episode">{t('search.dropdown_episodes')}</option>
      </select>
      <Button type="submit" variant="primary">
        {t('search.button')}
      </Button>
    </form>
  );
};
