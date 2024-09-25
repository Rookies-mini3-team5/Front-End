// 피드백 화면

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FeedbackPage({ sectionId, gptQuestionId }) {
  const [feedbackData, setFeedbackData] = useState({});

  // API 호출하여 피드백 가져오기
  useEffect(() => {
    const fetchFeedbackData = async () => {
      try {
        const response = await axios.get(`/api/section/gpt/answer/${sectionId}/${gptQuestionId}`);
        setFeedbackData(response.data);
      } catch (error) {
        console.error("Error fetching feedback data:", error);
      }
    };

    fetchFeedbackData();
  }, [sectionId, gptQuestionId]);

  return (
    <div className="feedback-page">
      <h2>피드백 결과</h2>
      <div className="feedback-section">
        <div className="strengths">
          <h3>강점</h3>
          <p>{feedbackData.strengths}</p>
        </div>
        <div className="weaknesses">
          <h3>개선사항</h3>
          <p>{feedbackData.weaknesses}</p>
        </div>
      </div>

      <button>다음 질문 다시 작성하기</button>
    </div>
  );
}

export default FeedbackPage;
