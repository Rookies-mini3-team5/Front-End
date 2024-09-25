// 질문 답변 화면

import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import "./css/QuestionAnswerPage.css";

function QuestionAnswerPage({ sectionId }) {
  const [questionData, setQuestionData] = useState({});
  const [userAnswer, setUserAnswer] = useState("");

  // API 호출하여 질문과 답변 가이드 가져오기
  useEffect(() => {
    const fetchQuestionData = async () => {
      try {
        const response = await axios.get(
          `/api/section/gpt/question/${sectionId}`
        );
        setQuestionData(response.data);
      } catch (error) {
        console.error("Error fetching question data:", error);
      }
    };

    fetchQuestionData();
  }, [sectionId]);

  // 답변 제출 핸들러
  const handleSubmit = async () => {
    try {
      await axios.post(
        `/api/section/gpt/answer/${sectionId}/${questionData.id}`,
        {
          answer: userAnswer,
        }
      );
      alert("답변이 성공적으로 제출되었습니다.");
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };

  return (
    <div className="question-answer-container">
      <Sidebar sectionId={sectionId} />
      <div className="question-answer-content">
        <p>질문이 들어올 자리</p>
        <h2>{questionData.question}</h2>
        <div className="answer-guide">
          <p>💡 답변 가이드</p>
          <p>이 질문에 답변할 때 다음 사항을 고려하세요:</p>
          <p>✅ 답변 가이드 불러오기</p>

          <ul>
            {questionData.answerGuide?.split("\n").map((guide, index) => (
              <li key={index}>{guide}</li>
            ))}
          </ul>
        </div>

        <textarea
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="답변을 입력하세요!"
          className="answer-textarea"
        />

        <button onClick={handleSubmit}>응답 제출</button>
      </div>
    </div>
  );
}

export default QuestionAnswerPage;
