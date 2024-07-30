// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RestaurantList from './components/RestaurantList';
import RestaurantDetail from './components/RestaurantDetail';
import './index.css';

function App() {
  return (
    <Router>
      <header>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<RestaurantList />} />
          <Route path="/restaurants/:id" element={<RestaurantDetail />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
