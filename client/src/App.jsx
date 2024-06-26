import {Route, Routes} from "react-router-dom";
import IndexPage from "./pages/IndexPage.jsx";
import LoginPage from './pages/LoginPage.jsx';4
import RegisterPage from './pages/RegisterPage.jsx';
import Layout from './Layout.jsx';
import PlayPage from './pages/PlayPage.jsx';
import UserPage from './pages/UserPage.jsx';
import axios from "axios";
import { UserContextProvider } from './UserContext.jsx';


axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;



function App() {
  
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/user' element={<UserPage />} />
          <Route path='/play' element={<PlayPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App
