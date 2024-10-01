import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar"; // 기존 Sidebar 그대로 사용
import "./css/RetakeAnswerPage.css"; // RetakeAnswerPage 스타일 가져오기

function RetakeAnswerPage({ sectionId, gptQuestionId }) {
  const [feedbackData, setFeedbackData] = useState({});
  const [userAnswer, setUserAnswer] = useState("");

  useEffect(() => {
    const fetchFeedbackAndQuestion = async () => {
      try {
        const feedbackResponse = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/section/gpt/answer/${sectionId}/${gptQuestionId}`
        );
        setFeedbackData(feedbackResponse.data);
        setUserAnswer(feedbackResponse.data.answer); // 이전에 사용자가 작성한 답변을 가져옴
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchFeedbackAndQuestion();
  }, [sectionId, gptQuestionId]);

  const handleSubmit = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/section/gpt/answer/${sectionId}/${gptQuestionId}`,
        {
          answer: userAnswer,
        }
      );
      alert("질문이 다시 제출되었습니다.");
    } catch (error) {
      console.error("Error submitting revised answer:", error);
    }
  };

  return (
    <div className="retake-answer-page-container">
      {/* 사이드바는 기존대로 유지 */}
      <Sidebar sectionId={sectionId} />
      <div className="retake-content">
        <h2>면접 질문 1 다시 작성해보기</h2>
        <p>
          "면접 질문 1" - 백엔드 개발 프로젝트에서 데이터베이스 성능 최적화를
          위해 어떤 방법을 사용했나요?
        </p>

        <div className="previous-feedback">
          <p>💡 이전 피드백 내용</p>
          <h3>이전 답변 내용 올 자리</h3>
        </div>

        <div className="feedback">
          <div className="strengths">
            <h3>강점</h3>
            <p>{feedbackData.strengths}</p>
          </div>
          <div className="weaknesses">
            <h3>개선할 부분</h3>
            <p>{feedbackData.weaknesses}</p>
          </div>
        </div>

        <textarea
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="피드백 받은 내용을 바탕으로 이전 답변을 다시 입력해보세요!"
          className="answer-textarea"
        />

        <button onClick={handleSubmit}>피드백 받기</button>
      </div>
    </div>
  );
}

export default RetakeAnswerPage;
