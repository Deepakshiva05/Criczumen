import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CricScore from './components/CricScore';
import Scorecard from './components/ScoreCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';

import './app.css';
import Home from './components/Home';
import SeriesList from './components/SeriesList';
import UpcomingMatches from './components/UpcommingMatches';
import Footer from './components/Footer';

const App = () => {
    return (
        
        <Router>
            <Navbar/>
            <Routes>
                <Route path='/' element={<Home/>}></Route>
                <Route path="/matches" element={<CricScore />} />
                <Route path="/series" element={<SeriesList/>}></Route>
                <Route path='/ucm' element={<UpcomingMatches/>}></Route>
                <Route path="/scorecard/:matchId" element={<Scorecard />} />
            </Routes>
            <Footer/>
        </Router>
    );
};

export default App;
