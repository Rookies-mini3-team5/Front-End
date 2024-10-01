import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./css/AnswerPage.css"; // CSS 파일 추가

const AnswerPage = () => {
  const { userQuestionId } = useParams();
  const [answerData, setAnswerData] = useState(null);

  useEffect(() => {
    const fetchAnswer = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/section/user/question/one/${userQuestionId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setAnswerData(response.data.body);
      } catch (error) {
        console.error("Error fetching answer:", error);
      }
    };

    fetchAnswer();
  }, [userQuestionId]);

  return (
    <div className="answer-page">
      {answerData ? (
        <>
          <h2 className="question">질문: {answerData.question}</h2>
          <div className="answer-box">
            <p className="answer-label">AI 면접 코치의 답변 🧐</p>
            <p className="answer-text">{answerData.answer}</p>
          </div>
        </>
      ) : (
        <p className="loading-text">답변을 불러오는 중입니다...</p>
      )}
    </div>
  );
};

export default AnswerPage;
