import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";
import DotLoader from "react-spinners/DotLoader"; // ClipLoader 대신 DotLoader 추가
import "./css/QuestionAnswerPage.css";

function QuestionAnswerPage() {
  const location = useLocation(); // JobQuestionList에서 전달된 질문과 sectionId 받기
  const { question, sectionId } = location.state || {};

  const [userAnswer, setUserAnswer] = useState("");
  const [loading, setLoading] = useState(false); // 로딩 상태 추가
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 추가

  // 답변 제출 핸들러
  const handleSubmit = async () => {
    // 디버깅용 로그 추가
    console.log("사용자가 입력한 답변:", userAnswer);
    console.log("question 객체:", question); // question 객체가 제대로 전달되었는지 확인
    console.log("questionId:", question?.questionId); // questionId 값이 있는지 확인

    if (!question?.questionId) {
      console.error("questionId가 존재하지 않습니다.");
      return;
    }

    setLoading(true); // 로딩 상태 활성화

    try {
      const token = localStorage.getItem("token"); // JWT 토큰 가져오기

      if (!token) {
        console.error("JWT 토큰이 없습니다.");
        setLoading(false); // 에러 발생 시 로딩 중단
        return;
      }

      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/section/interview/answer/${question.questionId}`, // 경로에 questionId 값 삽입
        {
          answer: userAnswer, // 요청 본문에 사용자 답변 포함
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // JWT 토큰을 헤더에 포함
            "Content-Type": "application/json", // 요청 본문이 JSON 형식임을 명시
          },
        }
      );

      // 성공적으로 응답이 돌아온 경우
      if (response.data.result.resultCode === 201) {
        navigate(`/feedback/${sectionId}/${question.questionId}`, {
          state: { sectionId, question },
        });
      } else {
        console.error(
          "응답에서 오류가 발생했습니다:",
          response.data.result.resultMessage
        );
      }
    } catch (error) {
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error status:", error.response.status);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error in request setup:", error.message);
      }
    } finally {
      setLoading(false); // 응답 완료 시 로딩 상태 종료
    }
  };

  return (
    <div className="question-answer-container">
      <Sidebar sectionId={sectionId} />
      <div className="question-answer-content">
        {loading ? ( // 로딩 중일 때 로더 표시
          <div className="loadingContainer">
            <DotLoader color={"#123abc"} loading={loading} size={80} />
            <p className="loadingText">
              응답을 제출 중입니다... 피드백을 생성 하고 있습니다...
            </p>
          </div>
        ) : (
          <>
            <h2>{question?.expectedQuestion}</h2>
            <div className="answer-guide">
              <p>💡 답변 가이드</p>
              <p>이 질문에 답변할 때 다음 사항을 고려하세요:</p>
              <ul>
                {question?.answerGuide?.split("\n").map((guide, index) => (
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

            <button onClick={handleSubmit} disabled={loading}>
              {loading ? "제출 중..." : "응답 제출"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default QuestionAnswerPage;
