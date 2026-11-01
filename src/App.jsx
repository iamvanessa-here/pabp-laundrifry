import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Layout from './components/Layout/Layout';
import Ringkasan from './pages/Ringkasan/Ringkasan';
import Pesanan from './pages/Pesanan/Pesanan';
import Pelanggan from './pages/Pelanggan/Pelanggan';

function App() {
  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            <Layout>
              <Ringkasan />
            </Layout>
          } 
        />
        <Route 
          path="/pesanan" 
          element={
            <Layout>
              <Pesanan />
            </Layout>
          } 
        />
        <Route 
          path="/pelanggan" 
          element={
            <Layout>
              <Pelanggan />
            </Layout>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;