import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

import Login from './pages/Login';
import MainFeed from './pages/MainFeed';
import PostDetail from './pages/PostDetail';
import UploadPost from './pages/UploadPost';
import Profile from './pages/Profile';
import BottomNavbar from './components/BottomNavbar/BottomNavbar'; 

import './App.css';

/* Այս կաղապարը ապահովում է, որ Outlet-ում բացվող էջերը 
  (MainFeed, Profile և այլն) իրենց տակ ունենան BottomNavbar:
*/
const MainLayout = () => {
  return (
    <div style={{ paddingBottom: '70px' }}> {/* Որպեսզի Navbar-ը չփակի էջի կոնտենտը */}
      <Outlet />
      <BottomNavbar />
    </div>
  );
};

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          
          {/* ԱՆՎԱՎԵՐԱՑՎԱԾ ԳՈՏԻ. Մուտքի էջ (Առանց նավիգացիայի) */}
          <Route path="/login" element={<Login />} />
          
          {/* ՎԱՎԵՐԱՑՎԱԾ ԳՈՏԻ. Մնացած բոլոր էջերը՝ փաթեթավորված MainLayout-ով */}
          <Route element={<MainLayout />}>
            {/* Գլխավոր էջ (լրահոս) */}
            <Route path="/" element={<MainFeed />} />
            
            {/* Օգտատիրոջ պրոֆիլը */}
            <Route path="/profile" element={<Profile />} />
            
            {/* Նոր գրառում (post) ավելացնելու էջ */}
            <Route path="/upload" element={<UploadPost />} />
            
            {/* Առանձին գրառման էջ (դինամիկ ճանապարհ՝ id-ով) */}
            <Route path="/post/:id" element={<PostDetail />} />
          </Route>

        </Routes>
      </div>
    </Router>
  );
}

export default App;