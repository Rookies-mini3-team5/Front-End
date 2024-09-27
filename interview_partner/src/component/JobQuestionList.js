import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./css/JobQuestionList.css";

const JobQuestionList = () => {
    const location = useLocation(); // JobResume에서 전달된 질문 리스트와 sectionId 받기
    const { questions: initialQuestions, sectionId } = location.state || {}; // questions와 sectionId 추출

    // 컴포넌트가 마운트될 때 백엔드에서 질문 목록을 가져옴 - 추가
    const [questions, setQuestions] = useState(initialQuestions || []); // 초기값으로 JobResume에서 받은 질문 사용

    useEffect(() => {
        if (!sectionId) {
            console.error("섹션 ID가 없습니다.");
            return;
        }

        // 서버로부터 질문을 다시 가져옴 (만약 questions가 없을 경우)
        const fetchQuestions = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/section/gpt/question/list/${sectionId}`);
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

    return (
        <div className="JobQuestionList_container">
            <h1 className="common-title">면접 예상 질문 리스트</h1>
            <p className="common-text">예상 질문과 그에 따른 답변을 적어보세요. 추가적인 질문이 있으면 시작버튼을 눌러주세요.</p>

            <div className="questionsGrid">
                {questions.map((question) => (
                    <div key={question.questionId} className="questionBox">
                        <div className="questionTitle">
                            {question.expectedQuestion}
                        </div>
                        <p className="questionDescription">{question.answerGuide}</p>
                    </div>
                ))}
            </div>

            {/* 아래 고정된 버튼 */}
            <div className="fixedBottom">
                <button className="startButton">
                    시작
                </button>
            </div>
        </div>
    );
};

export default JobQuestionList;