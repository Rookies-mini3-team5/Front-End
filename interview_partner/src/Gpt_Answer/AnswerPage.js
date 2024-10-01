// 사용자가 입력한 질문에 대한 GPT의 답변 보여주는 페이지

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const AnswerPage = () => {
  const { userQuestionId } = useParams();
  const [answerData, setAnswerData] = useState(null);

  useEffect(() => {
    const fetchAnswer = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/section/user/question/one/${userQuestionId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setAnswerData(response.data.body);
      } catch (error) {
        console.error("Error fetching answer:", error);
      }
    };

    fetchAnswer();
  }, [userQuestionId]);

  return (
    <div className="answer-page">
      {answerData ? (
        <>
          <h2>질문: {answerData.question}</h2>
          <p>답변: {answerData.answer}</p>
        </>
      ) : (
        <p>답변을 불러오는 중입니다...</p>
      )}
    </div>
  );
};

export default AnswerPage;
