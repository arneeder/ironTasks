import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Main from './pages/Main'
import ProjectsDetail from './pages/ProjectsDetail';
import ProjectDetail from './pages/ProjectDetail';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/main' element={<Main />} />
        <Route path='/projectsDetail' element={<ProjectsDetail />} />
        <Route path='/projectDetail/:id' element={<ProjectDetail />} />
      </Routes>
    </div>
  );
}

export default App;
