import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "./css/AnswerListPage.css";

const AnswerListPage = () => {
  const { gptQuestionId } = useParams(); // URL에서 question ID 받아옴
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [guide, setGuide] = useState([]);
  const [questionText, setQuestionText] = useState(""); // 질문 텍스트 상태 추가
  const navigate = useNavigate();
  const location = useLocation();
  const { question } = location.state || {};

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/section/interview/answer/list/${gptQuestionId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        setAnswers(response.data.body.interviewAnswerList || []);
      } catch (err) {
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const fetchGuideAndQuestion = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_SECTION_API_URL}/gpt/question/${gptQuestionId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const questionData = response.data.body;
        setQuestionText(questionData.question); // 질문 텍스트 설정
        const answerGuide = questionData.answerGuide;
        setGuide(Array.isArray(answerGuide) ? answerGuide : []);
      } catch (error) {
        console.error("Error fetching guide or question:", error);
      }
    };

    // 만약 location.state로부터 질문 정보가 없다면 API를 통해 가져옴
    if (!question) {
      fetchGuideAndQuestion();
    } else {
      setQuestionText(question.question || "질문 없음");
      setGuide(Array.isArray(question.answerGuide) ? question.answerGuide : []);
    }

    fetchAnswers();
  }, [gptQuestionId, question]);

  const handleRetakeAnswer = () => {
    // 첫 번째 답변으로 다시 답변하기 버튼을 눌렀을 때 이동
    const firstAnswer = answers.length > 0 ? answers[0] : null;

    if (firstAnswer) {
      navigate(`/question-answer/${gptQuestionId}`, {
        state: {
          question: firstAnswer.question, // 질문 데이터
          sectionId: firstAnswer.sectionId, // 섹션 ID
          sectionName: firstAnswer.sectionName, // 섹션 이름
          answerGuide: firstAnswer.answerGuide, // 가이드 추가
        },
      });
    }
  };

  if (loading) {
    return <p>로딩 중...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="answer-list-container">
      <div className="answer-list-wrapper">
        {questionText && (
          <div>
            <h2>질문: {questionText}</h2>
          </div>
        )}

        {guide.length > 0 && (
          <div className="guide">
            <h3>💡 답변 가이드</h3>
            <div className="guide-box">
              <ul>
                {guide.map((item, index) => (
                  <li key={index}>
                    <span className="checkmark">✔️</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {answers.length > 0 ? (
          <ul>
            {answers.map((answer, index) => (
              <li key={answer.id}>
                <p>
                  유저 답변 {index + 1}: {answer.answer}
                </p>
                <p>피드백:</p>
                <div className="feedback-box">
                  <ul>
                    {answer.feedbackList.map((feedback, idx) => (
                      <li key={idx}>{feedback}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>답변이 없습니다.</p>
        )}

        {/* 다시 답변하기 버튼을 맨 하단에 배치 */}
        {answers.length > 0 && (
          <div className="retake-answer-wrapper">
            <button
              onClick={handleRetakeAnswer}
              className="retake-answer-button"
            >
              다시 답변하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnswerListPage;