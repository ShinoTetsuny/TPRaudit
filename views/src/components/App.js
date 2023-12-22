import '../style/App.css';
import EngineDetails from './admin/[id]/engine';
import ModelDetails from './admin/[id]/model';
import OptionDetails from './admin/[id]/option';
import DashBoard from './admin/dashboard';
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
      <Route path="/admin" element={<DashBoard />} />
      <Route path="/admin/:id/engine" element={<EngineDetails />} />
      <Route path="/admin/:id/model" element={<ModelDetails />} />
      <Route path="/admin/:id/option" element={<OptionDetails/>} />
    </Routes>
    </>
  );
}

export default App;
