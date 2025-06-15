import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { getPopularMovies } from './services/tmdb'
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail"
import { useParams } from 'react-router-dom';
import SearchResults from './pages/SearchResults';
import SearchBar from "./components/SearchBar";
import Favorites from './pages/Favorites';
import NavBar from './components/Navbar';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';




function App() {

  return (
    <Router>

      <ToastContainer position="top-right" autoClose={5000} />
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path='/search' element={<SearchResults/>}></Route>
        <Route path='/favorites' element={<Favorites></Favorites>}></Route>
      </Routes>
    </Router>
  );
}

export default App
