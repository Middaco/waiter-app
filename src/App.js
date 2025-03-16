import './App.css';
import HomePage from './pages/HomePage';
import { BrowserRouter, Routes, Route } from 'react-router';
import TableInfoPage from './pages/TableInfoPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:id" element={<TableInfoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
