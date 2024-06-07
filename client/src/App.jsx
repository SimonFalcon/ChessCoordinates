import './App.css'
import {Route, Routes} from "react-router-dom";
import IndexPage from "./pages/IndexPage.jsx";
import LoginPage from './pages/LoginPage.jsx';4
import RegisterPage from './pages/RegisterPage.jsx';
import Layout from './Layout.jsx';
import StatisticsPage from './pages/StatisticsPage.jsx';
import PlayPage from './pages/PlayPage.jsx';
import UserPage from './pages/UserPage.jsx';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/statistics' element={<StatisticsPage />} />
        <Route path='/user' element={<UserPage />} />
        <Route path='/play' element={<PlayPage />} />
      </Route>
    </Routes>
    
  )
}

export default App
