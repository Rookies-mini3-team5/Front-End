import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "./css/RetakeAnswerPage.css";

function RetakeAnswerPage({
  setSelectedQuestionId,
  setSelectedExpectedQuestion,
  handleFinishInterview,
}) {
  const { sectionId, gptQuestionId } = useParams();
  const location = useLocation();
  const { question } = location.state || {};
  const navigate = useNavigate();

  const [feedbackData, setFeedbackData] = useState({});
  const [userAnswer, setUserAnswer] = useState("");

  useEffect(() => {
    if (question) {
      setSelectedQuestionId(question.questionId);
      setSelectedExpectedQuestion(question.expectedQuestion);
    }
  }, [question, setSelectedQuestionId, setSelectedExpectedQuestion]);

  const fetchFeedback = async () => {
    try {
      const token = localStorage.getItem("token");

      const feedbackResponse = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/section/interview/answer/list/${gptQuestionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const feedbackList = feedbackResponse.data.body.interviewAnswerList || [];

      if (feedbackList.length > 0) {
        const sortedFeedback = feedbackList.sort((a, b) => b.id - a.id);
        const recentFeedback = sortedFeedback[0];

        setFeedbackData(recentFeedback);
      }
    } catch (error) {
      console.error("Error fetching feedback data:", error);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, [gptQuestionId]);

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/section/interview/answer/${gptQuestionId}`,
        { answer: userAnswer },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert("답변이 성공적으로 제출되었습니다.");

      // 답변 제출 후 최신 피드백 데이터 다시 가져오기
      await fetchFeedback();
    } catch (error) {
      console.error("Error submitting revised answer:", error);
    }
  };

  const handleFinish = () => {
    const confirmed = window.confirm(
      "모의 면접을 종료합니다. 이전 기록에서 다시 확인할 수 있습니다."
    );

    if (confirmed) {
      handleFinishInterview(question?.expectedQuestion);
      navigate("/");
    }
  };

  return (
    <div className="retake-answer-page-container">
      <div className="retake-content">
        <h2 className="retake-title">면접 질문 다시 작성해보기</h2>
        <p className="retake-question">
          📝 면접 질문: {question?.question || "질문이 없습니다."}
        </p>

        <div className="previous-feedback">
          <h3 className="previous-feedback-title">
            이전 답변: {feedbackData.answer || "이전 답변이 없습니다."}
          </h3>
        </div>

        <div className="feedback">
          <h3 className="feedback-title">피드백 내용:</h3>
          {feedbackData.feedbackList && feedbackData.feedbackList.length > 0 ? (
            <ul>
              {feedbackData.feedbackList.map((feedback, index) => (
                <li key={index} className="feedback-item">
                  {feedback.split("\n").map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-feedback">피드백이 없습니다.</p>
          )}
        </div>

        <textarea
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="피드백을 반영하여 답변을 다시 작성해보세요!"
          className="answer-textarea"
        />

        <div className="button-container">
          <button className="submit-button" onClick={handleSubmit}>
            답변 제출하기
          </button>
          <button className="finish-interview-button" onClick={handleFinish}>
            모의 면접 종료
          </button>
        </div>
      </div>
    </div>
  );
}

export default RetakeAnswerPage;
