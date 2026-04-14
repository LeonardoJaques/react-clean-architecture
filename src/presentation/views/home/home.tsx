import { Header } from '../../shared/header/header';
import { SearchBar } from './components/search-bar/search-bar';
import { MovieGrid } from './components/movie-grid/movie-grid';

export const Home = () => {
  return (
    <div className="home-container">
      <Header />
      <main>
        <SearchBar />
        <MovieGrid />
      </main>
    </div>
  );
};
