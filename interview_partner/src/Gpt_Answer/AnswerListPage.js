import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "./css/AnswerListPage.css";

const AnswerListPage = () => {
  const { gptQuestionId } = useParams();
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [guide, setGuide] = useState([]);
  const [questionText, setQuestionText] = useState("");
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
        setQuestionText(questionData.question);
        const answerGuide = questionData.answerGuide;
        setGuide(Array.isArray(answerGuide) ? answerGuide : []);
      } catch (error) {
        console.error("Error fetching guide or question:", error);
      }
    };

    if (!question) {
      fetchGuideAndQuestion();
    } else {
      setQuestionText(question.question || "질문 없음");
      setGuide(Array.isArray(question.answerGuide) ? question.answerGuide : []);
    }

    fetchAnswers();
  }, [gptQuestionId, question]);

  const handleRetakeAnswer = () => {
    const firstAnswer = answers.length > 0 ? answers[0] : null;

    if (firstAnswer) {
      navigate(`/question-answer/${gptQuestionId}`, {
        state: {
          question: firstAnswer.question,
          sectionId: firstAnswer.sectionId,
          sectionName: firstAnswer.sectionName,
          answerGuide: firstAnswer.answerGuide,
        },
      });
    }
  };

  if (loading) {
    return <p className="loading-text">로딩 중...</p>;
  }

  if (error) {
    return <p className="error-text">{error}</p>;
  }

  return (
    <div className="answer-list-container">
      <div className="answer-list-wrapper">
        {questionText && (
          <div>
            <h2 className="question-title">질문: {questionText}</h2>
          </div>
        )}

        {guide.length > 0 && (
          <div className="guide">
            <h3 className="guide-title">💡 답변 가이드</h3>
            <div className="guide-box">
              <ul className="guide-list">
                {guide.map((item, index) => (
                  <li key={index} className="guide-list-item">
                    <span className="checkmark">✔️</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {answers.length > 0 ? (
          <ul className="answer-list">
            {answers.map((answer, index) => (
              <li key={answer.id} className="answer-item">
                <p className="user-answer">
                  유저 답변 {index + 1}: {answer.answer}
                </p>
                <p className="feedback-title">피드백:</p>
                <div className="feedback-box">
                  <ul className="feedback-list">
                    {answer.feedbackList.map((feedback, idx) => (
                      <li key={idx} className="feedback-item">
                        {feedback}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-answers-text">답변이 없습니다.</p>
        )}

        {answers.length > 0 && (
          <div className="button-group3">
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
