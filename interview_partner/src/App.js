// import React, { useState } from "react";
// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   useNavigate,
// } from "react-router-dom";
// import "./App.css";
// import Home from "./component/Home";
// import About from "./component/About";
// import Profile from "./component/Profile";
// import Register from "./component/Register";
// import { UserProvider } from "./component/UserProvider";
// import Login from "./component/Login";
// import QuestionAnswerPage from "./Gpt_Answer/QuestionAnswerPage";
// import Sidebar from "./Gpt_Answer/Sidebar";
// import FeedbackPage from "./Gpt_Answer/FeedbackPage";
// import RetakeAnswerPage from "./Gpt_Answer/RetakeAnswerPage";
// import JobSelection from "./component/JobSelection";
// import JobResume from "./component/JobResume";
// import JobQuestionList from "./component/JobQuestionList";

// import "@fortawesome/fontawesome-free/css/all.min.css"; // 설치 필요

// // // Home 컴포넌트: 직무선택 버튼을 포함
// // function HomePage() {
// //   const navigate = useNavigate();

// //   const handleJobSelection = () => {
// //     navigate("/jobselect");
// //   };
// //   const handleJobResume = () => {
// //     navigate("/jobresume");
// //   };
// //   const handleJobQuestionList = () => {
// //     navigate("/jobquestionlist");
// //   };

// //   return (
// //     <header className="App-header">
// //       <button
// //         onClick={handleJobSelection}
// //         style={{ padding: "10px 20px", fontSize: "16px" }}
// //       >
// //         직무선택
// //       </button>
// //       <button
// //         onClick={handleJobResume}
// //         style={{ padding: "10px 20px", fontSize: "16px" }}
// //       >
// //         직무이력
// //       </button>
// //       <button
// //         onClick={handleJobQuestionList}
// //         style={{ padding: "10px 20px", fontSize: "16px" }}
// //       >
// //         직무질문리스트
// //       </button>
// //     </header>
// //   );
// // }

// // App 컴포넌트 병합
// const App = () => {
//   const [selectedJobName, setSelectedJobName] = useState(null);
//   const [selectedOccupationalName, setSelectedOccupationalName] =
//     useState(null);
//   const [sectionId, setSectionId] = useState(null);
//   const [activeChat, setActiveChat] = useState(null);
//   return (
//     <Router>
//       <UserProvider>
//         <Sidebar
//           selectedJobName={selectedJobName}
//           selectedOccupationalName={selectedOccupationalName}
//           sectionId={sectionId}
//           activeChat={activeChat}
//         />
//         <Routes>
//           <Route path="/register" element={<Register />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/" element={<Home />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/profile" element={<Profile />} />
//           {/* <Route path="/jobselect" element={<JobSelection />} /> */}
//           <Route
//             path="/jobselect"
//             element={
//               <JobSelection
//                 setSelectedJobName={setSelectedJobName}
//                 setSelectedOccupationalName={setSelectedOccupationalName}
//                 setSectionId={setSectionId}
//               />
//             }
//           />
//           <Route path="/jobresume" element={<JobResume />} />
//           <Route
//             path="/jobquestionlist"
//             element={<JobQuestionList setActiveChat={setActiveChat} />}
//           />
//           {/* <Route
//             path="/question-answer/:sectionId"
//             element={<QuestionAnswerPage />}
//           /> */}
//           <Route
//             path="/question-answer"
//             element={
//               <QuestionAnswerPage
//                 activeChat={activeChat}
//                 setActiveChat={setActiveChat}
//               />
//             }
//           />

//           <Route
//             path="/feedback/:sectionId/:gptQuestionId"
//             element={<FeedbackPage />}
//           />
//           <Route
//             path="/retake-answer/:sectionId/:gptQuestionId"
//             element={<RetakeAnswerPage />}
//           />
//         </Routes>
//       </UserProvider>
//     </Router>
//   );
// };

// export default App;

// 서정 테스트
// import React, { useState } from "react";
// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   useLocation,
// } from "react-router-dom";
// import "./App.css";
// import Register from "./component/Register";
// import { UserProvider } from "./component/UserProvider";
// import Login from "./component/Login";
// import QuestionAnswerPage from "./Gpt_Answer/QuestionAnswerPage";
// import Sidebar from "./Gpt_Answer/Sidebar";
// import FeedbackPage from "./Gpt_Answer/FeedbackPage";
// import RetakeAnswerPage from "./Gpt_Answer/RetakeAnswerPage";
// import JobSelection from "./component/JobSelection";
// import JobResume from "./component/JobResume";
// import JobQuestionList from "./component/JobQuestionList";
// import Home from "./component/Home";
// import About from "./component/About";
// import Profile from "./component/Profile";

// // // 테스트
// import UserSectionsPage from "./Gpt_Answer/UserSectionsPage"; // UserQuestionsPage 컴포넌트 가져오기
// import AnswerListPage from "./Gpt_Answer/AnswerListPage"; // 위에서 만든 컴포넌트
// import SectionList from "./Gpt_Answer/SectionList"; // 섹션의 질문 목록이나 세부 정보를 보여줄 컴포넌트
// import GptQuestionList from "./Gpt_Answer/GptQuestionList"; // GptQuestionList 컴포넌트 가져오기

// import "@fortawesome/fontawesome-free/css/all.min.css"; // 설치 필요

// const AppContent = () => {
//   const [selectedJobName, setSelectedJobName] = useState(null);
//   const [selectedOccupationalName, setSelectedOccupationalName] =
//     useState(null);
//   const [sectionId, setSectionId] = useState(null);
//   const [activeChat, setActiveChat] = useState(null);

//   const location = useLocation(); // useLocation은 이제 Router 내부에서 사용됨

//   return (
//     <UserProvider>
//       {/* 특정 페이지에서 Sidebar 숨기기 */}
//       {location.pathname !== "/" &&
//         location.pathname !== "/login" &&
//         location.pathname !== "/register" && (
//           <Sidebar
//             selectedJobName={selectedJobName}
//             selectedOccupationalName={selectedOccupationalName}
//             sectionId={sectionId}
//             activeChat={activeChat}

//           />
//         )}
//       <Routes>
//         <Route path="/register" element={<Register />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/profile" element={<Profile />} />
//         <Route
//           path="/jobselect"
//           element={
//             <JobSelection
//               setSelectedJobName={setSelectedJobName}
//               setSelectedOccupationalName={setSelectedOccupationalName}
//               setSectionId={setSectionId}
//             />
//           }
//         />
//         <Route path="/jobresume" element={<JobResume />} />
//         <Route
//           path="/jobquestionlist"
//           element={<JobQuestionList setActiveChat={setActiveChat} />}
//         />
//         <Route
//           path="/question-answer"
//           element={
//             <QuestionAnswerPage
//               activeChat={activeChat}
//               setActiveChat={setActiveChat}
//             />
//           }
//         />
//         <Route
//           path="/feedback/:sectionId/:gptQuestionId"
//           element={<FeedbackPage />}
//         />
//         <Route
//           path="/retake-answer/:sectionId/:gptQuestionId"
//           element={<RetakeAnswerPage />}
//         />
//          <Route path="/user/questions" element={<UserSectionsPage />} />
//          <Route path="/answer/:gptQuestionId" element={<AnswerListPage />} />
//          <Route path="/selection" element={<SectionList />} />{" "}
//          <Route
//            path="/section/:sectionId/questions"
//            element={<GptQuestionList />}
//          />
//       </Routes>
//     </UserProvider>
//   );
// };

// const App = () => {
//   return (
//     <Router>
//       <AppContent />
//     </Router>
//   );
// };

// export default App;

import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import "./App.css";
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
import Home from "./component/Home";
import About from "./component/About";
import Profile from "./component/Profile";

// 테스트
import AnswerListPage from "./Gpt_Answer/AnswerListPage"; // 위에서 만든 컴포넌트
import SectionList from "./Gpt_Answer/SectionList"; // 섹션의 질문 목록이나 세부 정보를 보여줄 컴포넌트
import GptQuestionList from "./Gpt_Answer/GptQuestionList"; // GptQuestionList 컴포넌트 가져오기
import EditSection from "./Gpt_Answer/EditSection"; // 수정 페이지 추가
import AskQuestionPage from "./Gpt_Answer/AskQuestionPage";
import AnswerPage from "./Gpt_Answer/AnswerPage";
import QuestionHistoryPage from "./Gpt_Answer/QuestionHistoryPage";

import "@fortawesome/fontawesome-free/css/all.min.css";

const AppContent = () => {
  const [selectedJobName, setSelectedJobName] = useState(null);
  const [selectedOccupationalName, setSelectedOccupationalName] =
    useState(null);
  const [selectedSectionName, setSelectedSectionName] = useState(null); // Add this line

  const [sectionId, setSectionId] = useState(null);
  const [activeChat, setActiveChat] = useState(null);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const [selectedExpectedQuestion, setSelectedExpectedQuestion] =
    useState(null);
  const [previousQuestions, setPreviousQuestions] = useState([]);
  const location = useLocation();

  // 경로가 변경될 때마다 사이드바를 업데이트하기 위한 useEffect
  useEffect(() => {
    // 특정 경로에서는 사이드바 상태 업데이트 방지
    const preventSidebarUpdatePaths = [
      // "/gpt-answer",
      // "/answer",
      "/feedback",
      "/retake-answer",
      // "/sidebar/:sectionId",
    ];
    const shouldPreventSidebarUpdate = preventSidebarUpdatePaths.some((path) =>
      location.pathname.startsWith(path)
    );

    if (shouldPreventSidebarUpdate) {
      return;
    }
    // 경로에 따라 섹션 ID를 설정하거나 업데이트할 로직을 여기에 추가
    if (location.pathname.includes("/jobselect")) {
      // 예시: JobResume 경로일 때 섹션 ID 업데이트
      const newSectionId = location.state?.sectionId || null;
      const newSectionName = location.state?.sectionName || null; // 새로 추가된 부분

      setSectionId(newSectionId);
      setSelectedSectionName(newSectionName); // 섹션 이름도 함께 설정
    }

    // 필요에 따라 경로별로 다른 상태 변경 로직을 추가
  }, [location.pathname]);

  const handleFinishInterview = (finishedQuestion) => {
    if (finishedQuestion) {
      setPreviousQuestions((prev) => [...prev, finishedQuestion]);
      setSelectedQuestionId(null);
      setSelectedExpectedQuestion(null);
    }
  };
  const updateSidebar = (newSectionId, newSectionName) => {
    setSectionId(newSectionId); // 새로운 섹션 ID로 상태 업데이트
    setSelectedSectionName(newSectionName); // Set the new section name
    console.log("Sidebar updated with:", newSectionId, newSectionName);
  };

  return (
    <UserProvider>
      {location.pathname !== "/" &&
        !location.pathname.startsWith("/login") &&
        !location.pathname.startsWith("/register") &&
        !location.pathname.startsWith("/jobselect") &&
        !location.pathname.startsWith("/jobresume") && 
        !location.pathname.startsWith("/profile") && 
        !location.pathname.startsWith("/about") &&
        !location.pathname.startsWith("/jobquestionlist") &&  (
          <Sidebar
          
            sectionId={sectionId}
            questionId={selectedQuestionId}
            expectedQuestion={selectedExpectedQuestion}
            previousQuestions={previousQuestions}
          />
        )}
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/jobselect"
          element={
            <JobSelection
              setSelectedJobName={setSelectedJobName}
              setSelectedOccupationalName={setSelectedOccupationalName}
              setSectionId={setSectionId}
              updateSidebar={updateSidebar} // 명시적으로 전달
            />
          }
        />
        <Route path="/jobresume" element={<JobResume />} />
        <Route
          path="/jobquestionlist"
          element={
            <JobQuestionList
              setActiveChat={setActiveChat}
              updateSidebar={updateSidebar} // 명시적으로 전달
            />
          }
        />
        <Route
          path="/question-answer/:questionId"
          element={
            <QuestionAnswerPage
              activeChat={activeChat}
              setActiveChat={setActiveChat}
              setSelectedQuestionId={setSelectedQuestionId}
              setSelectedExpectedQuestion={setSelectedExpectedQuestion}
            />
          }
        />
        <Route
          path="/feedback/:sectionId/:gptQuestionId"
          element={<FeedbackPage />}
        />
        <Route
          path="/retake-answer/:sectionId/:gptQuestionId"
          element={
            <RetakeAnswerPage
              setSelectedQuestionId={setSelectedQuestionId}
              setSelectedExpectedQuestion={setSelectedExpectedQuestion}
              handleFinishInterview={handleFinishInterview}
            />
          }
        />
        {/* 테스트 페이지 */}
        <Route path="/gpt-answer/:gptQuestionId" element={<AnswerListPage />} />
        <Route path="/selection" element={<SectionList />} />{" "}
        {/* 섹션 선택 컴포넌트 */}
        <Route
          path="/section/:sectionId/questions"
          element={<GptQuestionList />}
        />
        <Route path="/edit-section/:sectionId" element={<EditSection />} />
        <Route path="/ask-question/:sectionId" element={<AskQuestionPage />} />
        <Route path="/answer/:userQuestionId" element={<AnswerPage />} />
        {/* 질문 내역 보기 경로 추가 */}
        <Route
          path="/question-history/:sectionId"
          element={<QuestionHistoryPage />}
        />
      </Routes>
    </UserProvider>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
