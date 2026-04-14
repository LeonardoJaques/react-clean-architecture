import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './presentation/views/home/home';
import { MovieDetail } from './presentation/views/movie-detail/movie-detail';
import { MyList } from './presentation/views/my-list/my-list';

export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:type/:id" element={<MovieDetail />} />
        <Route path="/my-list" element={<MyList />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
};
