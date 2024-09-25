import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./component/Home";
import Register from "./component/Register";
import { UserProvider } from "./component/UserProvider";
import Login from "./component/Login";
import QuestionAnswerPage from "./Gpt_Answer/QuestionAnswerPage";
import Sidebar from "./Gpt_Answer/Sidebar";
import FeedbackPage from "./Gpt_Answer/FeedbackPage";
import RetakeAnswerPage from "./Gpt_Answer/RetakeAnswerPage";

import "@fortawesome/fontawesome-free/css/all.min.css"; // 설치 필요

const App = () => {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route
            path="/question-answer/:sectionId"
            element={<QuestionAnswerPage />}
          />
          <Route
            path="/feedback/:sectionId/:gptQuestionId"
            element={<FeedbackPage />}
          />
          <Route
            path="/retake-answer/:sectionId/:gptQuestionId"
            element={<RetakeAnswerPage />}
          />
        </Routes>
      </UserProvider>
    </Router>
  );
};

export default App;
