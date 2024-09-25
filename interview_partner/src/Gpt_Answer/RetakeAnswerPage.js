// 피드백 후 다시 답변 작성 화면

import React, { useState, useEffect } from "react";
import axios from "axios";

function RetakeAnswerPage({ sectionId, gptQuestionId }) {
  const [feedbackData, setFeedbackData] = useState({});
  const [userAnswer, setUserAnswer] = useState("");

  // API 호출하여 피드백과 질문 데이터를 가져오기
  useEffect(() => {
    const fetchFeedbackAndQuestion = async () => {
      try {
        // 이전에 작성한 답변과 피드백 데이터를 불러옴
        const feedbackResponse = await axios.get(
          `/api/section/gpt/answer/${sectionId}/${gptQuestionId}`
        );
        setFeedbackData(feedbackResponse.data);
        setUserAnswer(feedbackResponse.data.answer); // 이전에 사용자가 작성한 답변을 가져옴

        // 질문 데이터를 불러옴 (필요 시)
        const questionResponse = await axios.get(
          `/api/section/gpt/question/${sectionId}`
        );
        // 만약 질문 데이터도 사용해야 한다면 추가 처리 가능
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchFeedbackAndQuestion();
  }, [sectionId, gptQuestionId]);

  const handleSubmit = async () => {
    try {
      await axios.post(
        `/api/section/gpt/answer/${sectionId}/${gptQuestionId}`,
        {
          answer: userAnswer,
        }
      );
      alert("질문이 다시 제출되었습니다.");
    } catch (error) {
      console.error("Error submitting revised answer:", error);
    }
  };

  return (
    <div className="retake-answer-page">
      <h2>피드백 후 다시 작성하기</h2>
      <div className="feedback">
        <div className="strengths">
          <h3>강점</h3>
          <p>{feedbackData.strengths}</p>
        </div>
        <div className="weaknesses">
          <h3>개선사항</h3>
          <p>{feedbackData.weaknesses}</p>
        </div>
      </div>

      <textarea
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        placeholder="답변을 다시 입력하세요!"
        className="answer-textarea"
      />

      <button onClick={handleSubmit}>피드백 받기</button>
    </div>
  );
}

export default RetakeAnswerPage;
