// import logo from './logo.svg';
import '../style/App.css';
import Homepage from './homepage';
import Modeldetails from './modeldetails';


import {
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={< Homepage />} />
      <Route path="/model/:id" element={< Modeldetails />} />
      
    </Routes>
  );
}

export default App;
