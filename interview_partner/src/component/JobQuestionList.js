import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./css/JobQuestionList.css";

const JobQuestionList = () => {
  const location = useLocation(); // JobResume에서 전달된 질문 리스트와 sectionId 받기
  const { questions: initialQuestions, sectionId } = location.state || {};
  const [selectedQuestion, setSelectedQuestion] = useState(null); // 선택한 질문 상태 추가
  const [questions, setQuestions] = useState(initialQuestions || []);

  useEffect(() => {
    if (!sectionId) {
      console.error("섹션 ID가 없습니다.");
      return;
    }

    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_SECTION_API_URL}/gpt/question/list/${sectionId}`
        );
        const data = await response.json();
        setQuestions(data.body.gptQuestionList); // gptQuestionList 배열에 접근
      } catch (error) {
        console.error("질문 목록을 가져오는 중 오류 발생:", error);
      }
    };

    if (questions.length === 0) {
      fetchQuestions();
    }
  }, [sectionId, questions]);

  const navigate = useNavigate();

  // 질문 선택 핸들러
  const handleQuestionSelect = (question) => {
    setSelectedQuestion(question); // 선택한 질문 설정
  };

  // 시작 버튼 클릭 시 이동
  const handleStartClick = () => {
    if (selectedQuestion) {
      console.log("선택된 질문:", selectedQuestion); // 선택된 질문이 올바른지 확인
      navigate("/question-answer", {
        state: {
          question: selectedQuestion, // 선택한 질문을 전달
          sectionId: sectionId,
        },
      });
    } else {
      alert("질문을 선택해주세요.");
    }
  };

  return (
    <div className="JobQuestionList_container">
      <h1 className="common-title">면접 예상 질문 리스트</h1>
      <p className="common-text">예상 질문과 그에 따른 답변을 적어보세요.</p>

      <div className="questionsGrid">
        {questions.map((question) => (
          <div
            key={question.questionId} // questionId를 key로 설정
            className={`questionBox ${
              selectedQuestion === question ? "selected" : ""
            }`}
            onClick={() => handleQuestionSelect(question)} // 클릭 시 질문 선택
          >
            <div className="questionTitle">{question.expectedQuestion}</div>
            <p className="questionDescription">{question.answerGuide}</p>
          </div>
        ))}
      </div>

      {/* 아래 고정된 버튼 */}
      <div className="fixedBottom">
        <button className="startButton" onClick={handleStartClick}>
          시작
        </button>
      </div>
    </div>
  );
};

export default JobQuestionList;
