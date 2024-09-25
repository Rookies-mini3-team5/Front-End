import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./css/FeedbackPage.css"; 

function FeedbackPage() {
  const { sectionId, gptQuestionId } = useParams();
  const [feedbackData, setFeedbackData] = useState({
    strengths: "",
    weaknesses: "",
    detailedStrengths: "",
    detailedWeaknesses: "",
  });

  useEffect(() => {
    const fetchFeedbackData = async () => {
      try {
        const response = await axios.get(
          `/api/section/gpt/answer/${sectionId}/${gptQuestionId}`
        );
        setFeedbackData(response.data);
      } catch (error) {
        console.error("Error fetching feedback data:", error);
      }
    };

    fetchFeedbackData();
  }, [sectionId, gptQuestionId]);

  return (
    <div className="feedback-page-container">
 
      <Sidebar sectionId={sectionId} />

      <div className="feedback-page">
        <div className="header">
          <h2>피드백 결과</h2>
        </div>

        <div className="summary-section">
          <div className="strengths-summary">
            <div className="icon">✔️</div>
            <div className="summary-content">
              <h3>강점</h3>
              <p>{feedbackData.strengths}</p>
            </div>
          </div>
          <div className="weaknesses-summary">
            <div className="icon">⚠️</div>
            <div className="summary-content">
              <h3>개선사항</h3>
              <p>{feedbackData.weaknesses}</p>
            </div>
          </div>
        </div>

        <div className="detailed-section">
          <div className="detailed-strengths">
            <h4>강점</h4>
            <p>{feedbackData.detailedStrengths}</p>
          </div>
          <div className="detailed-weaknesses">
            <h4>개선할 부분</h4>
            <p>{feedbackData.detailedWeaknesses}</p>
          </div>
        </div>

        <button className="retry-button">다음 질문 다시 작성하기</button>
      </div>
    </div>
  );
}

export default FeedbackPage;
