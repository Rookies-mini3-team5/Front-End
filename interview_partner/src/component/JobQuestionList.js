import React from "react";
import "./css/JobQuestionList.css"; // CSS 파일 임포트

const questions = [
  { id: 1, title: "질문 1", description: "Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story." },
  { id: 2, title: "질문 2", description: "Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story." },
  { id: 3, title: "질문 3", description: "Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story." },
  { id: 4, title: "질문 4", description: "Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story." },
  { id: 5, title: "질문 5", description: "Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story." },
  { id: 6, title: "질문 6", description: "Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story." },
];

const JobQuestionList = () => {
  return (
    <div className="JobQuestionList_container">
      <h1>면접 예상 질문 리스트</h1>
      <p>예상 질문과 그에 따른 답변을 적어보세요. 추가적인 질문이 있으면 시작버튼을 눌러주세요.</p>

      <div className="questionsGrid">
        {questions.map((question) => (
          <div key={question.id} className="questionBox">
            <div className="questionTitle">
              <i className="infoIcon">i</i> {question.title}
            </div>
            <p className="questionDescription">{question.description}</p>
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