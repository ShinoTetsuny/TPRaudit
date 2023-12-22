// import logo from './logo.svg';
import '../style/App.css';
import Homepage from './homepage';


import {
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={< Homepage />} >
      </Route>
    </Routes>
  );
}

export default App;
