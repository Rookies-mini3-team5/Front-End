import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './component/Home';
import Register from './component/Register';
import { UserProvider } from './component/UserProvider';
import Login from "./component/Login";


const App = () => {
    return (
        <Router>
            <UserProvider>
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="login" element={<Login />} />
                    <Route path="/" element={<Home />} />
                </Routes>
            </UserProvider>
        </Router>
    );
};


export default App;
