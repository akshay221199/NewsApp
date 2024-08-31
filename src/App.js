import './App.css';
import React from 'react';
import Navbar from './components/Navbar';
import Newses from './components/Newses';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

const App = () => {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Newses  country="in" category="sports" />} />
          <Route path="/technology" element={<Newses  country="in" category="technology" />} />
          <Route path="/business" element={<Newses  country="in" category="business" />} />
          <Route path="/entertainment" element={<Newses  country="in" category="entertainment" />} />
          <Route path="/health" element={<Newses  country="in" category="health" />} />
          <Route path="/science" element={<Newses country="in" category="science" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
