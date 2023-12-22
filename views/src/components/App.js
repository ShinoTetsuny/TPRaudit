// import logo from './logo.svg';
import '../style/App.css';
import Homepage from './homepage';
import Modeldetails from './modeldetails';
import Navbar from './navbar';


import {
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={< Homepage />} />
      <Route path="/model/:id" element={< Modeldetails />} />
    </Routes>
    </>

  );
}

export default App;
