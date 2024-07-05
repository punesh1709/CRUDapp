


import './App.css';
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import EmpListing from './EmpListing';
import EmpDeatails from './EmpDeatails';
import EmpEidit from './EmpEidit';

function App() {
  return (
    <div className="App">
      <h1 className='text-center fw-bold text-danger'>React JS CRUD Operatations</h1>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<EmpListing />}></Route>
          <Route path='/employee/detail/:empid' element={<EmpDeatails />}></Route>
          <Route path='/employee/edit/:empid' element={<EmpEidit />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
