
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Register from './Components/Register';
import Login from './Components/Login';
import Whiteboard from './Components/Whiteboard';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/board" element={<Whiteboard />}></Route>

      </Routes>
    </div>
  );
}

export default App;
