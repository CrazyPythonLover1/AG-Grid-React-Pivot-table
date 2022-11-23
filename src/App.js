import { useEffect } from 'react';
import {BrowserRouter, Routes, HashRouter as Router, Route, NavLink} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import jsonData from './assets/BGMAIN.json'

import FormView from './views/FormView';
import HomeView from './views/HomeView';
import PivotTableView from './views/PivotTableView'
import PivotChartView from './views/PivotChart'
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

function App() {
  

  return (
    <BrowserRouter>
    <Routes> 
      <Route path="/" element={<HomeView />} />
      <Route path="/form" element={<FormView />} />
      <Route path="/pivot-table" element={<PivotTableView />} />
      <Route path="/ag-grid-pivot-table" element={<PivotChartView />} />
    </Routes>
  </BrowserRouter>

  // <div>
  //   <FormView />
  // </div>
  );
}

export default App;
