import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import Home from "./component/Home";
import Register from "./component/Register";
import { UserProvider } from "./component/UserProvider";
import Login from "./component/Login";
import QuestionAnswerPage from "./Gpt_Answer/QuestionAnswerPage";
import Sidebar from "./Gpt_Answer/Sidebar";
import FeedbackPage from "./Gpt_Answer/FeedbackPage";
import RetakeAnswerPage from "./Gpt_Answer/RetakeAnswerPage";
import JobSelection from "./component/JobSelection";
import JobResume from "./component/JobResume";
import JobQuestionList from "./component/JobQuestionList";

import "@fortawesome/fontawesome-free/css/all.min.css"; // 설치 필요

// // Home 컴포넌트: 직무선택 버튼을 포함
// function HomePage() {
//   const navigate = useNavigate();

//   const handleJobSelection = () => {
//     navigate("/jobselect");
//   };
//   const handleJobResume = () => {
//     navigate("/jobresume");
//   };
//   const handleJobQuestionList = () => {
//     navigate("/jobquestionlist");
//   };

//   return (
//     <header className="App-header">
//       <button
//         onClick={handleJobSelection}
//         style={{ padding: "10px 20px", fontSize: "16px" }}
//       >
//         직무선택
//       </button>
//       <button
//         onClick={handleJobResume}
//         style={{ padding: "10px 20px", fontSize: "16px" }}
//       >
//         직무이력
//       </button>
//       <button
//         onClick={handleJobQuestionList}
//         style={{ padding: "10px 20px", fontSize: "16px" }}
//       >
//         직무질문리스트
//       </button>
//     </header>
//   );
// }

// App 컴포넌트 병합
const App = () => {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/jobselect" element={<JobSelection />} />
          <Route path="/jobresume" element={<JobResume />} />
          <Route path="/jobquestionlist" element={<JobQuestionList />} />
          {/* <Route
            path="/question-answer/:sectionId"
            element={<QuestionAnswerPage />}
          /> */}
          <Route path="/question-answer" element={<QuestionAnswerPage />} />

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
