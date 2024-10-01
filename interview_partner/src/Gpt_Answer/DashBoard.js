import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/DashBoard.css'; // 스타일을 적용할 CSS 파일

const DashBoard = ({ selectedSectionName, selectedSectionId }) => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="dashboard-container">
      <h2>{selectedSectionName} 대시보드</h2>
      <div className="dashboard-buttons">
        <button onClick={() => handleNavigate(`/section/${selectedSectionId}/questions`)}>
          질문 목록 보기
        </button>
        <button onClick={() => handleNavigate(`/question-history/${selectedSectionId}`)}>
          질문 이력 확인
        </button>
        <button onClick={() => handleNavigate(`/feedback/${selectedSectionId}`)}>
          피드백 보기
        </button>
      </div>
    </div>
  );
};

export default DashBoard;
