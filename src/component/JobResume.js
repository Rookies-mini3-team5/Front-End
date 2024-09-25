import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // React Router의 useNavigate 임포트
import './css/JobResume.css'; // CSS 파일 임포트

const JobResume = () => {
  const [answers, setAnswers] = useState({
    strength: "",
    skills: "",
    improvement: "",
  });

  const navigate = useNavigate(); // 페이지 전환을 위한 useNavigate 훅 사용

  // 입력 필드 변경 핸들러 (100자 제한)
  const handleChange = (e) => {
    const { name, value } = e.target;

    // 100자 제한
    if (value.length <= 100) {
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [name]: value,
      }));
    }
  };

  // "다음" 버튼을 눌렀을 때 실행되는 함수
  const handleNextClick = () => {
    navigate("/jobquestionlist");
    console.log("작성된 답변 ->", answers);
  };

  return (
    <div className="JobResume_container">
      <h1>이력 및 강조할 점</h1>
      <p>질문에 대한 간단한 답변을 적어주세요. 없으면 넘어가도 돼요.</p>

      <div className="questionContainer">
        <div className="questionNumber">1</div>
        <div className="questionText">당신의 강점이 무엇인가요?</div>
        <textarea
          name="strength"
          value={answers.strength}
          onChange={handleChange}
          className="answerInput"
          placeholder="여기에 당신의 강점을 적어주세요."
        />
        <div className="charCount">{answers.strength.length}/100</div> {/* 입력된 문자 수 표시 */}
      </div>

      <div className="questionContainer">
        <div className="questionNumber">2</div>
        <div className="questionText">해당 직무에서 가장 자신 있는 기술 또는 능력은 무엇인가요?</div>
        <textarea
          name="skills"
          value={answers.skills}
          onChange={handleChange}
          className="answerInput"
          placeholder="여기에 기술 또는 능력을 적어주세요."
        />
        <div className="charCount">{answers.skills.length}/100</div>
      </div>

      <div className="questionContainer">
        <div className="questionNumber">3</div>
        <div className="questionText">개선하고 싶은 부분이 있나요?</div>
        <textarea
          name="improvement"
          value={answers.improvement}
          onChange={handleChange}
          className="answerInput"
          placeholder="여기에 개선하고 싶은 부분을 적어주세요."
        />
        <div className="charCount">{answers.improvement.length}/100</div>
      </div>

      {/* 아래 고정된 버튼 */}
      <div className="fixedBottom">
        <button onClick={handleNextClick} className="nextButton">
          다음
        </button>
      </div>
    </div>
  );
};

export default JobResume;