import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Menu from './Menu';
import Users from './Users';

const Tareas = () => <div>Tareas</div>;

function App() {

  return (
    <BrowserRouter>
      <Menu />
      <Routes>
        <Route path='/' element={<Users/>}/>
        <Route path='/Task' element={<Tareas/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;