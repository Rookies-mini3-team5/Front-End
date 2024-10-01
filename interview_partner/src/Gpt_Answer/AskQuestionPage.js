import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./css/AskQuestionPage.css"; // 스타일 파일 추가

const AskQuestionPage = () => {
  const { sectionId } = useParams();
  const [question, setQuestion] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/section/user/question/${sectionId}`,
        { question: question.trim() },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.result.resultCode === 201 && response.data.body) {
        const userQuestionId = response.data.body.id;
        alert("질문이 성공적으로 제출되었습니다.");
        navigate(`/answer/${userQuestionId}`);
      } else {
        alert("질문 제출에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error submitting question:", error);
      alert("질문 제출 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="ask-question-container">
      <h2>모의 질문 입력</h2>
      <p className="description-text">
        직접 답변받고 싶은 모의 면접 질문을 입력해, AI 코치에게 모의 면접 질문에
        대한 답변을 받으세요!
      </p>
      <form onSubmit={handleSubmit} className="ask-question-form">
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="답변 받고 싶은 모의 면접 질문을 입력하세요!"
          required
        />
        <button type="submit">제출</button>
      </form>
    </div>
  );
};

export default AskQuestionPage;
