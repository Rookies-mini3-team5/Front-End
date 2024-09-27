// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import Sidebar from "./Sidebar";
// import "./css/FeedbackPage.css";

// function FeedbackPage() {
//   const { sectionId, gptQuestionId } = useParams();
//   const [feedbackData, setFeedbackData] = useState({
//     strengths: "",
//     weaknesses: "",
//     detailedStrengths: "",
//     detailedWeaknesses: "",
//   });

//   useEffect(() => {
//     const fetchFeedbackData = async () => {
//       try {
//         const token = localStorage.getItem("token"); // JWT 토큰 가져오기

//         if (!token) {
//           console.error("JWT 토큰이 없습니다.");
//           return;
//         }

//         const response = await axios.get(
//           `http://localhost:8080/api/section/interview/answer/list/${gptQuestionId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`, // JWT 토큰을 헤더에 포함
//               "Content-Type": "application/json", // 요청 본문이 JSON 형식임을 명시
//             },
//           }
//         );

//         setFeedbackData(response.data);
//       } catch (error) {
//         console.error("Error fetching feedback data:", error);
//       }
//     };

//     fetchFeedbackData();
//   }, [sectionId, gptQuestionId]);

//   return (
//     <div className="feedback-page-container">
//       <Sidebar sectionId={sectionId} />

//       <div className="feedback-page">
//         <div className="header">
//           <h2>피드백 결과</h2>
//         </div>

//         <div className="summary-section">
//           <div className="strengths-summary">
//             <div className="icon">✔️</div>
//             <div className="summary-content">
//               <h3>강점</h3>
//               <p>{feedbackData.strengths}</p>
//             </div>
//           </div>
//           <div className="weaknesses-summary">
//             <div className="icon">⚠️</div>
//             <div className="summary-content">
//               <h3>개선사항</h3>
//               <p>{feedbackData.weaknesses}</p>
//             </div>
//           </div>
//         </div>

//         <div className="detailed-section">
//           <div className="detailed-strengths">
//             <h4>강점</h4>
//             <p>{feedbackData.detailedStrengths}</p>
//           </div>
//           <div className="detailed-weaknesses">
//             <h4>개선할 부분</h4>
//             <p>{feedbackData.detailedWeaknesses}</p>
//           </div>
//         </div>

//         <button className="retry-button">다음 질문 다시 작성하기</button>
//       </div>
//     </div>
//   );
// }

// export default FeedbackPage;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./css/FeedbackPage.css";

function FeedbackPage() {
  const { sectionId, gptQuestionId } = useParams();
  const [feedbackList, setFeedbackList] = useState([]); // 유저 답변과 피드백 목록을 저장

  useEffect(() => {
    const fetchFeedbackData = async () => {
      try {
        const token = localStorage.getItem("token"); // JWT 토큰 가져오기

        if (!token) {
          console.error("JWT 토큰이 없습니다.");
          return;
        }

        const response = await axios.get(
          `http://localhost:8080/api/section/interview/answer/list/${gptQuestionId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // JWT 토큰을 헤더에 포함
              "Content-Type": "application/json", // 요청 본문이 JSON 형식임을 명시
            },
          }
        );

        // API 응답 데이터에서 피드백 목록을 추출
        const feedbackData = response.data.body.interviewAnswerList;
        setFeedbackList(feedbackData);
      } catch (error) {
        console.error("Error fetching feedback data:", error);
      }
    };

    fetchFeedbackData();
  }, [sectionId, gptQuestionId]);

  return (
    <div className="feedback-page-container">
      <Sidebar sectionId={sectionId} />

      <div className="feedback-page">
        <div className="header">
          <h2>피드백 결과</h2>
        </div>

        {feedbackList.length > 0 ? (
          feedbackList.map((feedbackItem, index) => (
            <div key={index} className="feedback-item">
              <h3>유저 답변: {feedbackItem.answer}</h3>
              <p>GPT 피드백: {feedbackItem.feedback}</p>
            </div>
          ))
        ) : (
          <p>피드백을 불러오는 중입니다...</p>
        )}

        <button className="retry-button"> 질문 다시 작성하기</button>
      </div>
    </div>
  );
}

export default FeedbackPage;
