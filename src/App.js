import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { GlobalStorage } from './context/GlobalContext';
import Header from './components//Header/Header';
import Films from './pages/Films/Films';
import DetailFilm from './pages/DetailFilm/DetailFilm';
import NotFound from './pages/NotFound/NotFound';

const App = () => {
  return (
    <GlobalStorage>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/trendfilms" element={<Films />} />
          <Route path="/trendfilms/film/:id" element={<DetailFilm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </GlobalStorage>
  );
};

export default App;
