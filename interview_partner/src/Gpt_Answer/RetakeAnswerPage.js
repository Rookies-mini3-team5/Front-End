import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import "./css/RetakeAnswerPage.css"; // RetakeAnswerPage 스타일 가져오기
import { useParams, useLocation } from "react-router-dom"; // useParams 및 useLocation 추가

function RetakeAnswerPage() {
  const { sectionId, gptQuestionId } = useParams(); // URL에서 sectionId와 gptQuestionId 추출
  const location = useLocation(); // 이전 페이지에서 전달된 데이터를 받기 위해 사용
  const { question } = location.state || {}; // 전달된 question 데이터를 받음

  const [feedbackData, setFeedbackData] = useState({});
  const [userAnswer, setUserAnswer] = useState("");

  // 피드백 및 질문을 가져오는 useEffect
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const token = localStorage.getItem("token"); // JWT 토큰 가져오기

        // 피드백 가져오기
        const feedbackResponse = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/section/gpt/answer/${sectionId}/${gptQuestionId}`
        );

        // 첫 번째 피드백 항목 사용
        const feedback = feedbackResponse.data.body.interviewAnswerList[0];
        setFeedbackData(feedback);
        setUserAnswer(feedback.answer); // 이전에 사용자가 작성한 답변 설정
      } catch (error) {
        console.error("Error fetching feedback data:", error);
      }
    };

    fetchFeedback(); // 함수 호출
  }, [sectionId, gptQuestionId]);

  // 답변 제출 핸들러
  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token"); // JWT 토큰 가져오기

      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/section/gpt/answer/${sectionId}/${gptQuestionId}`,
        {
          answer: userAnswer,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // JWT 토큰 포함
            "Content-Type": "application/json",
          },
        }
      );
      alert("답변이 성공적으로 제출되었습니다.");
    } catch (error) {
      console.error("Error submitting revised answer:", error);
    }
  };

  return (
    <div className="retake-answer-page-container">
      <Sidebar sectionId={sectionId} />
      <div className="retake-content">
        <h2>면접 질문 다시 작성해보기</h2>

        {/* 면접 질문 표시 */}
        <p>📝 면접 질문: {question?.expectedQuestion}</p>

        <p>💡 이전 답변 및 피드백</p>

        <div className="previous-feedback">
          <h3>이전 답변: {feedbackData.answer}</h3>
        </div>

        {/* 피드백 내용 표시 */}
        <div className="feedback">
          <div className="strengths">
            <h3>피드백 내용</h3>
            <p>{feedbackData.feedback}</p>
          </div>
        </div>

        {/* 유저가 다시 답변할 수 있는 텍스트 입력란 */}
        <textarea
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="피드백을 반영하여 답변을 다시 작성해보세요!"
          className="answer-textarea"
        />

        {/* 제출 버튼 */}
        <button onClick={handleSubmit}>피드백 받기</button>
      </div>
    </div>
  );
}

export default RetakeAnswerPage;
