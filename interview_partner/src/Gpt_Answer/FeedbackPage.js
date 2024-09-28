import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom"; // useNavigate 추가
import Sidebar from "./Sidebar";
import ClipLoader from "react-spinners/ClipLoader";
import "./css/FeedbackPage.css";

function FeedbackPage() {
  const { sectionId, gptQuestionId } = useParams();
  const location = useLocation();
  const { question } = location.state || {}; // 전달된 질문 데이터를 받음
  const [feedbackList, setFeedbackList] = useState([]); // 유저 답변과 피드백 목록을 저장
  const [loading, setLoading] = useState(true); // 로딩 상태 관리
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 추가

  useEffect(() => {
    const fetchFeedbackData = async () => {
      try {
        const token = localStorage.getItem("token"); // JWT 토큰 가져오기

        if (!token) {
          console.error("JWT 토큰이 없습니다.");
          return;
        }

        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/section/interview/answer/list/${gptQuestionId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // JWT 토큰을 헤더에 포함
              "Content-Type": "application/json", // 요청 본문이 JSON 형식임을 명시
            },
          }
        );

        // API 응답 데이터에서 피드백 목록을 추출
        const feedbackData = response.data.body.interviewAnswerList;
        setFeedbackList(feedbackData);
        setLoading(false); // 로딩 상태 종료
      } catch (error) {
        console.error("Error fetching feedback data:", error);
      }
    };

    fetchFeedbackData();
  }, [sectionId, gptQuestionId]);

  // '답변 다시 작성하기' 버튼 클릭 시 RetakeAnswerPage로 이동
  const handleRetryClick = () => {
    navigate(`/retake-answer/${sectionId}/${gptQuestionId}`, {
      state: { sectionId, gptQuestionId, question }, // question 데이터도 함께 전달
    });
  };

  return (
    <div className="feedback-page-container">
      <Sidebar sectionId={sectionId} />

      <div className="feedback-page">
        <div className="header">
          <h2>피드백 결과</h2>
        </div>

        {loading ? (
          <ClipLoader color={"#123abc"} loading={loading} size={50} />
        ) : feedbackList.length > 0 ? (
          feedbackList.map((feedbackItem, index) => (
            <div key={index} className="feedback-item">
              <h3>유저 답변: {feedbackItem.answer}</h3>
              <p>GPT 피드백: {feedbackItem.feedback}</p>
            </div>
          ))
        ) : (
          <p>피드백을 불러오는 중입니다...</p>
        )}

        <button className="retry-button" onClick={handleRetryClick}>
          답변 다시 작성하기
        </button>
      </div>
    </div>
  );
}

export default FeedbackPage;
