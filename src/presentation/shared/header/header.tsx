import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { fetchMovies } from '../../../store/slices/moviesSlice';
import './header.css';

export const Header = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const { lastQuery, lastType } = useAppSelector((state) => state.movies);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    // Re-fetch movies in the new language if there was an active search
    if (lastQuery) {
      dispatch(fetchMovies({ query: lastQuery, type: lastType }));
    }
  };

  return (
    <header className="app-header">
      <div className="logo-section">
        <div className="logo">
          <span className="logo-icon">🍿</span>
          <span className="logo-text">Watch Later</span>
        </div>

        <div className="language-toggles">
          <button
            className={`flag-btn ${i18n.language === 'en-US' ? 'active' : ''}`}
            onClick={() => changeLanguage('en-US')}
            title="English"
          >
            🇺🇸
          </button>
          <button
            className={`flag-btn ${i18n.language === 'pt-BR' ? 'active' : ''}`}
            onClick={() => changeLanguage('pt-BR')}
            title="Português"
          >
            🇧🇷
          </button>
        </div>
      </div>

      <nav className="orange-nav">
        <ul>
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? 'active-link' : ''}>
              {t('header.home')}
            </NavLink>
          </li>
          <li>
            <NavLink to="/my-list" className={({ isActive }) => isActive ? 'active-link' : ''}>
              {t('header.my_list')}
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
