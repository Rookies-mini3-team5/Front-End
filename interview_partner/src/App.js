import React from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import './App.css';
import JobSelection from './component/JobSelection';
import JobResume from './component/JobResume';
import JobQuestionList from './component/JobQuestionList';
import Register from './component/Register';
import Login from "./component/Login";
import About from "./component/About";
import Profile from "./component/Profile";
import { UserProvider } from './component/UserProvider';
import Home from './component/Home';



function App() {
    return (
        <Router>
            <UserProvider>
                <div className="App">
                    <Routes>
                        <Route path="/jobselect" element={<JobSelection />} />
                        <Route path="/jobresume" element={<JobResume />} />
                        <Route path="/jobquestionlist" element={<JobQuestionList />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/" element={<Home />} />
                    </Routes>
                </div>
            </UserProvider>
        </Router>
    );
}

export default App;