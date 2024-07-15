// import React, { useState } from "react";
// import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
// import EmpListing from './EmpListing';
// import Login from './Login';

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   return (
//     <div className="App">
//       <h1 className='text-center fw-bold text-danger'>React JS CRUD Operations</h1>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Navigate to={isLoggedIn ? "/employees" : "/login"} />} />
//           <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
//           <Route path="/employees" element={isLoggedIn ? <EmpListing /> : <Navigate to="/login" />} />
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;


import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import EmpListing from './EmpListing';
import Login from './Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App">
      <h1 className='text-center fw-bold text-danger'>React JS CRUD Operations</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={isLoggedIn ? "/employees" : "/login"} />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/employees" element={isLoggedIn ? <EmpListing /> : <EmpListing />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


