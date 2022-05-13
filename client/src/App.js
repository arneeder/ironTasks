import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Main from './pages/Main/Main';
import ProjectsDetail from './pages/ProjectsDetail/ProjectsDetail';
import ProjectDetail from './pages/ProjectDetail/ProjectDetail';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/main' element={<Main />} />
        <Route path='/ProjectsDetail' element={<ProjectsDetail />} />
        <Route path='/ProjectDetail/:id' element={<ProjectDetail />} />
      </Routes>
    </div>
  );
}

export default App;
