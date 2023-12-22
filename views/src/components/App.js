import '../style/App.css';
import '../style/accounting.css';
import '../style/navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './navbar';
import EngineDetails from './admin/[id]/engine';
import ModelDetails from './admin/[id]/model';
import OptionDetails from './admin/[id]/option';
import DashBoard from './admin/dashboard';
import Homepage from './homepage';
import Modeldetails from './modeldetails';
import Accounting from './accouting';
import Purchases from './purchases';
// import { Button, Modal, Form } from 'react-bootstrap';

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
      <Route path="/" element={< Homepage />} />
      <Route path="/model/:id" element={< Modeldetails />} />
      <Route path="/purchase/:id" element={< Purchases />} />
      <Route path="/accounting" element={< Accounting />} />
    </Routes>
    </>
  );
}

export default App;
