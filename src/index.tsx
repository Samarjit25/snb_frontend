import React from 'react';
import ReactDOM from 'react-dom/client';  
import { ClassProvider } from './ClassContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
// import Footer from './components/Footer/Footer';

import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import SchedulePage from './pages/SchedulePage';
import AddClass from './pages/AddClass';
import AboutPage from './pages/AboutPage';
import ClassDiscussion from './pages/DiscussionPage';

const Page404 = () => (
  <div>
    <h1>ERROR 404</h1>
    <p>The page you're visiting does not exist. Please double-check the URL.</p>
  </div>
);

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <ClassProvider>
    <Router>
       <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/addclass" element={<AddClass/>}/>
        <Route path="/about" element={<AboutPage/>}/>
        <Route path="*" element={<Page404/>} />
        <Route path="/class/:classCode" element={<ClassDiscussion />} />

      </Routes>
      {/* <Footer /> */}
    </Router>
    </ClassProvider>
  </React.StrictMode>
);
