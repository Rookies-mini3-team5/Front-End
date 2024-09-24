import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './component/Home';
import Register from './component/Register';
import { UserProvider } from './component/UserProvider';


const App = () => {
    return (
        <Router>
            <UserProvider>
                <Routes>
                    <Route path="/" element={<Register />} />
                    <Route path="/home" element={<Home />} />
                </Routes>
            </UserProvider>
        </Router>
    );
};


export default App;
