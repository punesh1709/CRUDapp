import logo from './logo.svg';
import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import EmpListing from './EmpListing';
import EmpCreate from './EmpCreate';
import EmpDeatails from './EmpDeatails';
import EmpEidit from './EmpEidit';
function App() {
  return (
    <div className="App">
    <h1 className='text-center'>React JS CRUD Opertations</h1>
    <BrowserRouter>
      <Routes>
       <Route path='/' element={<EmpListing/>}></Route>
       <Route path='/employee/create' element={<EmpCreate/>}></Route>
       <Route path='/employee/deatails' element={<EmpDeatails/>}></Route>
       <Route path='/employee/edit/:empid' element={<EmpEidit/>}></Route>
      </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;
