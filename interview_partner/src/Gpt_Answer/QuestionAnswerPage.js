import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import DotLoader from "react-spinners/DotLoader";
import "./css/QuestionAnswerPage.css";

function QuestionAnswerPage() {
  // Sidebar 상태 전달
  const location = useLocation();
  const navigate = useNavigate();
  const { questionId } = useParams();

  const [userAnswer, setUserAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [answerGuideList, setAnswerGuideList] = useState([]);
  const [questionText, setQuestionText] = useState("");
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    if (location.state?.question) {
      setQuestion(location.state.question);
      setQuestionText(location.state.question.question);
      if (location.state.answerGuide) {
        setAnswerGuideList(location.state.answerGuide);
      } else {
        fetchGuideAndQuestion();
      }
    } else {
      fetchGuideAndQuestion();
    }
  }, [questionId, location.state]);

  const fetchGuideAndQuestion = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_SECTION_API_URL}/gpt/question/${questionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const questionData = response.data.body;
      setQuestion(questionData);
      setQuestionText(questionData.question);
      setAnswerGuideList(
        Array.isArray(questionData.answerGuide) ? questionData.answerGuide : []
      );
    } catch (error) {
      console.error("Error fetching guide or question:", error);
    }
  };

  const handleSubmit = async () => {
    if (!questionId) {
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_SECTION_API_URL}/interview/answer/${questionId}`,
        { answer: userAnswer },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.result.resultCode === 201) {
        navigate(`/feedback/${question.sectionId}/${question.id}`, {
          state: { sectionId: question.sectionId, question },
        });
      } else {
        console.error("Error:", response.data.result.resultMessage);
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="question-answer-content">
      {loading ? (
        <div className="loadingContainer">
          <DotLoader color={"#123abc"} loading={loading} size={80} />
          <p className="loadingText">
            응답을 제출 중입니다... 피드백을 생성하고 있습니다...
          </p>
        </div>
      ) : (
        <>
          <h2>{questionText || "질문이 없습니다."}</h2>
          <div className="answer-guide">
            <p>
              💡 <strong>답변 가이드</strong>
            </p>
            <ul>
              {answerGuideList.length > 0 ? (
                answerGuideList.map((guide, index) => (
                  <li key={index}>
                    <span role="img" aria-label="check">
                      ✅
                    </span>{" "}
                    {guide}
                  </li>
                ))
              ) : (
                <li>답변 가이드가 없습니다.</li>
              )}
            </ul>
          </div>
          <textarea
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="답변을 입력하세요!"
            className="answer-textarea"
          />
          <button
            className="submit-button"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "제출 중..." : "응답 제출"}
          </button>
        </>
      )}
    </div>
  );
}

export default QuestionAnswerPage;
