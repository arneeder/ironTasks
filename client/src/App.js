import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Main from './pages/Main'
import ProjectsDetail from './pages/ProjectsDetail';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/main' element={<Main />} />
        <Route path='/projectsDetail' element={<ProjectsDetail />} />
      </Routes>
    </div>
  );
}

export default App;
