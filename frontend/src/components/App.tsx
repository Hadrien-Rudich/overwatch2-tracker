import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header/Header';
import LogInForm from './Homepage/LogInForm';
import RegisterForm from './Homepage/RegisterForm/RegisterForm';
import HomePage from './Homepage/HomePage';
import Games from './Games/Games';
import Profiles from './Profiles/Profiles';
import Account from './Account/Account';
import Stats from './Stats/Stats';

function App() {
  return (
    <div className="text-center">
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LogInForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/games" element={<Games />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/profiles" element={<Profiles />} />
        <Route path="/account" element={<Account />} />
      </Routes>
      <ToastContainer autoClose={3000} draggable draggablePercent={60} />
    </div>
  );
}

export default App;
