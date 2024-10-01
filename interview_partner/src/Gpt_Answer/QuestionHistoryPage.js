// 사용자가 gpt 에게 직접 질문했던 history 확인하는 페이지
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./css/QuestionHistoryPage.css"; // 스타일 파일 추가

const QuestionHistoryPage = () => {
  const { sectionId } = useParams();
  const [questionHistory, setQuestionHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestionHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:8080/api/section/user/question/list/${sectionId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setQuestionHistory(response.data.body.userQuestionList);
      } catch (err) {
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestionHistory();
  }, [sectionId]);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="question-history-container">
      <h2>내가 물어봤던 모의 면접 질문 내역</h2>
      {questionHistory.length > 0 ? (
        <div className="question-list">
          {questionHistory.map((question) => (
            <div className="question-card" key={question.id}>
              <div className="question-card-header">
                <h3>내 질문</h3>
                <p>{question.question || "질문이 없습니다."}</p>
              </div>
              <div className="question-card-body">
                <h4>답변</h4>
                <p>{question.answer || "답변이 없습니다."}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>질문 내역이 없습니다.</p>
      )}
    </div>
  );
};

export default QuestionHistoryPage;
