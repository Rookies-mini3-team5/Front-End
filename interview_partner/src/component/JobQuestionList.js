import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./css/JobQuestionList.css";

const JobQuestionList = ({ setActiveChat, updateSidebar, sectionName }) => {
  const location = useLocation();
  const { questions: initialQuestions, sectionId } = location.state || {};
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [questions, setQuestions] = useState(initialQuestions || []);
  const [currentSectionName, setCurrentSectionName] = useState(
    sectionName || "섹션 이름 없음"
  );

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
        console.log("Fetched Questions Data:", data.body.gptQuestionList);

        setQuestions(data.body.gptQuestionList);
      } catch (error) {
        console.error("질문 목록을 가져오는 중 오류 발생:", error);
      }
    };

    if (questions.length === 0) {
      fetchQuestions();
    }
    // 섹션 ID가 변경될 때마다 사이드바 업데이트
    updateSidebar(sectionId, sectionName, currentSectionName); // Update with section name
    console.log("Updating sidebar with sectionId:", sectionId, sectionName);
  }, [sectionId, questions, updateSidebar, sectionName, currentSectionName]);

  const navigate = useNavigate();

  const handleQuestionSelect = (question) => {
    setSelectedQuestion(question);
    setActiveChat(question); // 선택한 질문을 부모 컴포넌트에 전달
  };

  const handleStartClick = () => {
    if (selectedQuestion && sectionId) {
      console.log("선택된 질문:", selectedQuestion);
      console.log("섹션 ID:", sectionId);
      updateSidebar(sectionId, sectionName, currentSectionName); // Update with section name

      navigate("/question-answer", {
        state: {
          question: {
            questionId: selectedQuestion.questionId,
            expectedQuestion: selectedQuestion.expectedQuestion,
            answerGuide: selectedQuestion.answerGuide || [],
          },
          sectionId: sectionId,
          sectionName: sectionName,
        },
        replace: true,
        source: "jobQuestionList",
      });
    } else {
      alert("질문을 선택해주세요.");
    }
  };

  return (
    <div className="JobQuestionList_container">
      <h1 className="common-title">면접 예상 질문 리스트</h1>
      <p className="common-text">질문을 선택한 뒤 시작 버튼을 눌러 답변을 적어보세요.</p>

      <div className="questionsGrid">
        {questions.map((question) => (
          <div
            key={question.questionId}
            className={`questionBox ${
              selectedQuestion === question ? "selected" : ""
              }`}
            onClick={() => handleQuestionSelect(question)}
          >
            <div className="questionTitle">{question.expectedQuestion}</div>
            <p className="questionDescription">{question.answerGuide.join(" ")}</p>
          </div>
        ))}
      </div>

      <button className="startButton" onClick={handleStartClick}>
        시작
      </button>
    </div>
  );
};

export default JobQuestionList;
