import React from 'react';
import './App.css';
import Home from './pages/home/home';
import Navbar from './component/navbar/navbar';
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import Login from './pages/login/login';
import Add from './pages/add/add';
import Bergidarlar from './pages/bergidarlar/bergidarlar';
import Borchlylar from './pages/borchlylar/borchlylar';
import Arhiw from './pages/arhiw/arhiw';
import Error from './pages/error/error';
import ByPlace from './pages/byplace/byplace';
import AddPay from './pages/add/add-child-pay/add-pay';
import AddChild from './pages/add/add-child-pay/add-child';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/*" element={<Error />} />
          <Route element={
            <>
              <Navbar />
              <Outlet />
            </>
          }
          >
            <Route path="/home" element={<Home />} />
            <Route path="/add" element={<Add />} />
            <Route path="/borchlylar" element={<Borchlylar />} />
            <Route path="/bergidarlar" element={<Bergidarlar />} />
            <Route path="/arhiw" element={<Arhiw />} />
            <Route path='/byplace' element={<ByPlace />}/>
            <Route path='/add-pay' element={<AddPay />}/>
            <Route path='/add-child' element={<AddChild/>}/>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
