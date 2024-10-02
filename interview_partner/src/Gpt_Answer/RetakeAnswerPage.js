// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Sidebar from "./Sidebar"; // 사이드바 컴포넌트 가져오기
// import { useParams, useLocation } from "react-router-dom"; // useParams 및 useLocation 추가
// import "./css/RetakeAnswerPage.css"; // RetakeAnswerPage 스타일 가져오기

// function RetakeAnswerPage() {
//   const { sectionId, gptQuestionId } = useParams(); // URL에서 sectionId와 gptQuestionId 추출
//   const location = useLocation(); // 이전 페이지에서 전달된 데이터를 받기 위해 사용
//   const { question } = location.state || {}; // 전달된 question 데이터를 받음

//   const [feedbackData, setFeedbackData] = useState({});
//   const [userAnswer, setUserAnswer] = useState(""); // 빈 텍스트 필드 유지
//   const [previousQuestions, setPreviousQuestions] = useState([]); // 이전 질문 관리
//   const [activeQuestions, setActiveQuestions] = useState([
//     question?.expectedQuestion,
//   ]); // 진행 중인 질문 관리

//   // 피드백 및 질문을 가져오는 useEffect
//   useEffect(() => {
//     const fetchFeedback = async () => {
//       try {
//         const token = localStorage.getItem("token"); // JWT 토큰 가져오기

//         // 피드백 가져오기
//         const feedbackResponse = await axios.get(
//           `http://localhost:8080/api/section/interview/answer/list/${gptQuestionId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         // 피드백 리스트에서 가장 최신 피드백을 가져오기
//         const feedbackList =
//           feedbackResponse.data.body.interviewAnswerList || [];

//         if (feedbackList.length > 0) {
//           // ID 기준으로 내림차순 정렬하여 최신 항목을 선택
//           const sortedFeedback = feedbackList.sort((a, b) => b.id - a.id);

//           // 가장 최근의 피드백을 선택
//           const recentFeedback = sortedFeedback[0];

//           // 가장 최근의 피드백 설정
//           setFeedbackData(recentFeedback);
//         }
//       } catch (error) {
//         console.error("Error fetching feedback data:", error);
//       }
//     };

//     fetchFeedback(); // 함수 호출
//   }, [gptQuestionId]);

//   // 답변 제출 핸들러
//   const handleSubmit = async () => {
//     try {
//       const token = localStorage.getItem("token"); // JWT 토큰 가져오기

//       await axios.post(
//         `http://localhost:8080/api/section/interview/answer/${gptQuestionId}`,
//         {
//           answer: userAnswer, // 수정된 답변을 전송
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`, // JWT 토큰 포함
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       alert("답변이 성공적으로 제출되었습니다.");
//     } catch (error) {
//       console.error("Error submitting revised answer:", error);
//     }
//   };

//   // 모의 면접 종료 처리
//   const handleFinishInterview = () => {
//     // 진행 중인 질문을 이전 질문으로 이동시키고 진행 중인 질문을 비움
//     setPreviousQuestions((prev) => [...prev, ...activeQuestions]);
//     setActiveQuestions([]);
//   };

//   return (
//     <div className="retake-answer-page-container">
//       <Sidebar
//         sectionId={sectionId}
//         activeQuestions={activeQuestions}
//         previousQuestions={previousQuestions}
//       />

//       <div className="retake-content">
//         <h2>면접 질문 다시 작성해보기</h2>

//         {/* 면접 질문 표시 */}
//         <p>📝 면접 질문: {question?.expectedQuestion}</p>

//         {/* 이전 답변 및 피드백 */}
//         <div className="previous-feedback">
//           <h3>이전 답변: {feedbackData.answer || "이전 답변이 없습니다."}</h3>
//         </div>

//         <div className="feedback">
//           <h3>피드백 내용:</h3>
//           {feedbackData.feedbackList && feedbackData.feedbackList.length > 0 ? (
//             <ul>
//               {feedbackData.feedbackList.map((feedback, index) => (
//                 <li key={index}>{feedback}</li>
//               ))}
//             </ul>
//           ) : (
//             <p>피드백이 없습니다.</p>
//           )}
//         </div>

//         {/* 유저가 다시 답변할 수 있는 텍스트 입력란 */}
//         <textarea
//           value={userAnswer}
//           onChange={(e) => setUserAnswer(e.target.value)} // 빈 텍스트 필드 유지
//           placeholder="피드백을 반영하여 답변을 다시 작성해보세요!"
//           className="answer-textarea"
//         />

//         {/* 답변 제출 버튼 */}
//         <button onClick={handleSubmit}>답변 제출하기</button>

//         {/* 모의 면접 종료 버튼 */}
//         <button
//           className="finish-interview-button"
//           onClick={handleFinishInterview}
//         >
//           모의 면접 종료
//         </button>
//       </div>
//     </div>
//   );
// }

// export default RetakeAnswerPage;

// 답변 다시 작성해보기 페이지
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams, useLocation, useNavigate } from "react-router-dom"; // useNavigate 추가
// import "./css/RetakeAnswerPage.css"; // RetakeAnswerPage 스타일 가져오기

// function RetakeAnswerPage({
//   setSelectedQuestionId,
//   setSelectedExpectedQuestion,
//   handleFinishInterview,
// }) {
//   const { sectionId, gptQuestionId } = useParams(); // URL에서 sectionId와 gptQuestionId 추출
//   const location = useLocation(); // 이전 페이지에서 전달된 데이터를 받기 위해 사용
//   const { question } = location.state || {}; // 전달된 question 데이터를 받음
//   const navigate = useNavigate(); // 홈 화면으로 이동을 위한 navigate 추가

//   const [feedbackData, setFeedbackData] = useState({});
//   const [userAnswer, setUserAnswer] = useState(""); // 빈 텍스트 필드 유지

//   useEffect(() => {
//     if (question) {
//       // 처음 페이지 로드시 현재 질문을 진행 중인 질문으로 설정
//       setSelectedQuestionId(question.questionId);
//       setSelectedExpectedQuestion(question.expectedQuestion);
//     }
//   }, [question, setSelectedQuestionId, setSelectedExpectedQuestion]);

//   // 피드백 및 질문을 가져오는 useEffect
//   useEffect(() => {
//     const fetchFeedback = async () => {
//       try {
//         const token = localStorage.getItem("token"); // JWT 토큰 가져오기

//         // 피드백 가져오기
//         const feedbackResponse = await axios.get(
//           `http://localhost:8080/api/section/interview/answer/list/${gptQuestionId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         const feedbackList =
//           feedbackResponse.data.body.interviewAnswerList || [];

//         if (feedbackList.length > 0) {
//           const sortedFeedback = feedbackList.sort((a, b) => b.id - a.id);
//           const recentFeedback = sortedFeedback[0];

//           setFeedbackData(recentFeedback);
//         }
//       } catch (error) {
//         console.error("Error fetching feedback data:", error);
//       }
//     };

//     fetchFeedback(); // 함수 호출
//   }, [gptQuestionId]);

//   const handleSubmit = async () => {
//     try {
//       const token = localStorage.getItem("token"); // JWT 토큰 가져오기

//       await axios.post(
//         `http://localhost:8080/api/section/interview/answer/${gptQuestionId}`,
//         { answer: userAnswer },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       alert("답변이 성공적으로 제출되었습니다.");
//     } catch (error) {
//       console.error("Error submitting revised answer:", error);
//     }
//   };
//   const handleFinish = () => {
//     // 모의 면접 종료 경고창 띄우기
//     const confirmed = window.confirm(
//       "모의 면접을 종료합니다. 이전 기록에서 다시 확인할 수 있습니다."
//     );

//     if (confirmed) {
//       handleFinishInterview(question?.expectedQuestion); // 이전 질문 목록으로 이동하는 로직 실행
//       navigate("/"); // 홈 화면으로 이동
//     }
//   };
//   return (
//     <div className="retake-answer-page-container">
//       <div className="retake-content">
//         <h2>면접 질문 다시 작성해보기</h2>

//         <p>📝 면접 질문: {question?.expectedQuestion}</p>

//         <div className="previous-feedback">
//           <h3>이전 답변: {feedbackData.answer || "이전 답변이 없습니다."}</h3>
//         </div>

//         <div className="feedback">
//           <h3>피드백 내용:</h3>
//           {feedbackData.feedbackList && feedbackData.feedbackList.length > 0 ? (
//             <ul>
//               {feedbackData.feedbackList.map((feedback, index) => (
//                 <li key={index}>{feedback}</li>
//               ))}
//             </ul>
//           ) : (
//             <p>피드백이 없습니다.</p>
//           )}
//         </div>

//         <textarea
//           value={userAnswer}
//           onChange={(e) => setUserAnswer(e.target.value)} // 빈 텍스트 필드 유지
//           placeholder="피드백을 반영하여 답변을 다시 작성해보세요!"
//           className="answer-textarea"
//         />

//         <button onClick={handleSubmit}>답변 제출하기</button>

//         {/* 모의 면접 종료 버튼 */}
//         <button
//           className="finish-interview-button"
//           onClick={handleFinish} // 전달받은 함수 호출
//         >
//           모의 면접 종료
//         </button>
//       </div>
//     </div>
//   );
// }

// export default RetakeAnswerPage;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "./css/RetakeAnswerPage.css";

function RetakeAnswerPage({
  setSelectedQuestionId,
  setSelectedExpectedQuestion,
  handleFinishInterview,
}) {
  const { sectionId, gptQuestionId } = useParams();
  const location = useLocation();
  const { question } = location.state || {};
  const navigate = useNavigate();

  const [feedbackData, setFeedbackData] = useState({});
  const [userAnswer, setUserAnswer] = useState("");

  useEffect(() => {
    if (question) {
      setSelectedQuestionId(question.questionId);
      setSelectedExpectedQuestion(question.expectedQuestion);
    }
  }, [question, setSelectedQuestionId, setSelectedExpectedQuestion]);

  // 피드백 및 질문을 가져오는 함수
  const fetchFeedback = async () => {
    try {
      const token = localStorage.getItem("token");

      const feedbackResponse = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/section/interview/answer/list/${gptQuestionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const feedbackList = feedbackResponse.data.body.interviewAnswerList || [];

      if (feedbackList.length > 0) {
        const sortedFeedback = feedbackList.sort((a, b) => b.id - a.id);
        const recentFeedback = sortedFeedback[0];

        setFeedbackData(recentFeedback);
      }
    } catch (error) {
      console.error("Error fetching feedback data:", error);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, [gptQuestionId]);

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/section/interview/answer/${gptQuestionId}`,
        { answer: userAnswer },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert("답변이 성공적으로 제출되었습니다.");

      // 답변 제출 후 최신 피드백 데이터 다시 가져오기
      await fetchFeedback();
    } catch (error) {
      console.error("Error submitting revised answer:", error);
    }
  };

  const handleFinish = () => {
    const confirmed = window.confirm(
      "모의 면접을 종료합니다. 이전 기록에서 다시 확인할 수 있습니다."
    );

    if (confirmed) {
      handleFinishInterview(question?.expectedQuestion);
      navigate("/");
    }
  };

  return (
    <div className="retake-answer-page-container">
      <div className="retake-content">
        <h2>면접 질문 다시 작성해보기</h2>

        {/* <p>📝 면접 질문: {question?.expectedQuestion}</p> */}
        <p>📝 면접 질문: {question?.question || "질문이 없습니다."}</p>

        <div className="previous-feedback">
          <h3>이전 답변: {feedbackData.answer || "이전 답변이 없습니다."}</h3>
        </div>

        <div className="feedback">
          <h3>피드백 내용:</h3>
          {feedbackData.feedbackList && feedbackData.feedbackList.length > 0 ? (
            <ul>
              {feedbackData.feedbackList.map((feedback, index) => (
                <li key={index}>
                  {feedback.split("\n").map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </li>
              ))}
            </ul>
          ) : (
            <p>피드백이 없습니다.</p>
          )}
        </div>

        <textarea
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="피드백을 반영하여 답변을 다시 작성해보세요!"
          className="answer-textarea"
        />

        <div className="button-container">
          <button onClick={handleSubmit}>답변 제출하기</button>
          <button className="finish-interview-button" onClick={handleFinish}>
            모의 면접 종료
          </button>
        </div>
      </div>
    </div>
  );
}

export default RetakeAnswerPage;
