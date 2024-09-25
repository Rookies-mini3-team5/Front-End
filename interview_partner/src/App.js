import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './component/Home';
import Register from './component/Register';
import { UserProvider } from './component/UserProvider';
import Login from "./component/Login";
import About from "./component/About";
import Profile from "./component/Profile";



const App = () => {
    return (
        <Router>
            <UserProvider>
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="login" element={<Login />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/profile" element={<Profile />} />


                </Routes>
            </UserProvider>
        </Router>
    );
};


export default App;
