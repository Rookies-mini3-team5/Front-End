import React from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import './App.css';
import JobSelection from './component/JobSelection';
import JobResume from './component/JobResume';
import JobQuestionList from './component/JobQuestionList';

// Home 컴포넌트: 직무선택 버튼을 포함
function Home() {
  const navigate = useNavigate();

  const handleJobSelection = () => {
    navigate("/jobselect");
  };
  const handleJobResume = () => {
    navigate("/jobresume");
  };
  const handleJobQuestionList = () => {
    navigate("/jobquestionlist");
  };

  return (
    <header className="App-header">
      <button onClick={handleJobSelection} style={{ padding: '10px 20px', fontSize: '16px' }}>
        직무선택
      </button>
      <button onClick={handleJobResume} style={{ padding: '10px 20px', fontSize: '16px' }}>
        직무이력
      </button>
      <button onClick={handleJobQuestionList} style={{ padding: '10px 20px', fontSize: '16px' }}>
        직무질문리스트
      </button>
    </header>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/jobselect" element={<JobSelection />} />
          <Route path="/jobresume" element={<JobResume />} />
          <Route path="/jobquestionlist" element={<JobQuestionList />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;