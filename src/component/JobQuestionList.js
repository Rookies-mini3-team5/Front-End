import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/JobQuestionList.css";

// const questions = [
//   { id: 1, title: "질문 1", description: "Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story." },
//   { id: 2, title: "질문 2", description: "Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story." },
//   { id: 3, title: "질문 3", description: "Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story." },
//   { id: 4, title: "질문 4", description: "Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story." },
//   { id: 5, title: "질문 5", description: "Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story." },
//   { id: 6, title: "질문 6", description: "Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story." },
// ];

const JobQuestionList = ({ sectionId }) => {

    // 컴포넌트가 마운트될 때 백엔드에서 질문 목록을 가져옴 - 추가
    const [questions, setQuestions] = useState([]);
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get(`/api/section/gpt/question/list/${sectionId}`);
                // API 응답에서 body.gptQuestionList 배열에 접근
                setQuestions(response.data.body.gptQuestionList);
            } catch (error) {
                console.error("질문 목록을 가져오는 중 오류 발생:", error);
            }
        };

        fetchQuestions();
    }, [sectionId]);

    return (
        <div className="JobQuestionList_container">
            <h1 className="common-title">면접 예상 질문 리스트</h1>
            <p className="common-text">예상 질문과 그에 따른 답변을 적어보세요. 추가적인 질문이 있으면 시작버튼을 눌러주세요.</p>

            <div className="questionsGrid">
                {questions.map((question) => (
                    <div key={question.id} className="questionBox">
                        <div className="questionTitle">
                            {/* <i className="infoIcon">i</i> {question.title} */}
                            <i className="infoIcon">i</i> {question.question}
                        </div>
                        {/* <p className="questionDescription">{question.description}</p> */}
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