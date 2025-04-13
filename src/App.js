import './App.css';
import HomePage from './pages/HomePage';
import { BrowserRouter, Routes, Route } from 'react-router';
import TableInfoPage from './pages/TableInfoPage';
import { Outlet } from 'react-router';
import { useState, useEffect, useCallback } from 'react';

function App() {
  const [tables, setTables] = useState([]);

  const fetchTables = useCallback(() => {
    fetch('/api/tables')
      .then(response => response.json())
      .then(data => setTables(data.tables))
    // eslint-disable-next-line 
    }, [])
  
  useEffect(() => {
    fetchTables();
  }, [fetchTables]);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Outlet context={{tables, setTables}} />}>
          <Route index element={<HomePage />} />
          <Route path=":id" element={<TableInfoPage />} />
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
