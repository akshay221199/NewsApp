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
          <Route path="/" element={<Newses pageSize="5" country="in" category="sports" />} />
          <Route path="/technology" element={<Newses pageSize="5" country="in" category="technology" />} />
          <Route path="/business" element={<Newses pageSize="5" country="in" category="business" />} />
          <Route path="/entertainment" element={<Newses pageSize="5" country="in" category="entertainment" />} />
          <Route path="/health" element={<Newses pageSize="5" country="in" category="health" />} />
          <Route path="/science" element={<Newses pageSize="5" country="in" category="science" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
