import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
 
import logo from './logo.svg';
import './App.css';
import Crud from "./Crud";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Crud" element={<Crud />} />
        
      </Routes>
    </Router>
  );
}

export default App;
