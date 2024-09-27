import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import './css/JobResume.css';

const JobResume = () => {
    const [answers, setAnswers] = useState({
        resume: "",
        emphasize: "",
    });

    const navigate = useNavigate(); // 페이지 전환을 위한 useNavigate 훅 사용
    const location = useLocation(); // JobSelection에서 전달된 sectionId 받기
    const { sectionId } = location.state || {}; // location.state에서 sectionId 추출

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
    //   const handleNextClick = () => {
    //     navigate("/jobquestionlist");
    //     console.log("작성된 답변 ->", answers);
    //   };

    // "다음" 버튼을 눌렀을 때 실행되는 함수 - 추가
    const handleNextClick = () => {
        const token = localStorage.getItem("token");  // JWT 토큰 가져오기
        if (!sectionId) {
            console.error("섹션 ID가 없습니다."); // sectionId가 없으면 오류 메시지 출력
            return;
        }
    
        // 백엔드로 POST 요청을 보냄 (sectionId 포함)
        fetch(`http://localhost:8080/api/section/${sectionId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`, // JWT 토큰을 Authorization 헤더에 포함
            },
            body: JSON.stringify(answers), // answers 객체를 JSON 문자열로 변환하여 전송
        })
        .then((response) => response.json()) // 응답을 JSON으로 변환
        .then((data) => {
            if (data.result && data.result.resultCode === 200) {
                // JobQuestionList로 예상 질문 리스트와 함께 이동
                const questions = data.body;  // 응답의 body 배열을 questions로 전달
                navigate("/jobquestionlist", { state: { questions, sectionId } });
            } else {
                console.error("서버 응답에서 오류가 발생했습니다:", data.result.resultMessage);
            }
        })
        .catch((error) => {
            console.error("에러가 발생했습니다.", error);
        });
    };

    return (
        <div className="JobResume_container">
            <h1 className="common-title">이력 및 강조할 점</h1>
            <p className="common-text">질문에 대한 간단한 답변을 적어주세요. 없으면 넘어가도 돼요.</p>

            <div className="questionContainer">
                <div className="questionNumber">1</div>
                <div className="questionText">해당 직무에서 가장 자신 있는 기술 또는 능력은 무엇인가요?</div>
                <textarea
                    name="resume"
                    value={answers.resume}
                    onChange={handleChange}
                    className="answerInput"
                    placeholder="여기에 기술 또는 능력을 적어주세요."
                />
                <div className="charCount">{answers.resume.length}/100</div> {/* 입력된 문자 수 표시 */}
            </div>

            <div className="questionContainer">
                <div className="questionNumber">2</div>
                <div className="questionText">당신의 강점이 무엇인가요?</div>
                <textarea
                    name="emphasize"
                    value={answers.emphasize}
                    onChange={handleChange}
                    className="answerInput"
                    placeholder="여기에 당신의 강점을 적어주세요."
                />
                <div className="charCount">{answers.emphasize.length}/100</div> {/* 입력된 문자 수 표시 */}
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