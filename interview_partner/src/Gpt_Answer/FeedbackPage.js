import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import ClipLoader from "react-spinners/ClipLoader";
import "./css/FeedbackPage.css";

function FeedbackPage() {
  const { sectionId, gptQuestionId } = useParams();
  const location = useLocation();
  const { question } = location.state || {};
  const [recentFeedback, setRecentFeedback] = useState(null); // 최근 피드백 저장
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeedbackData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("JWT 토큰이 없습니다.");
          return;
        }

        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/section/interview/answer/list/${gptQuestionId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        // 응답 데이터 로그 출력
        console.log("Feedback response data:", response.data);

        const feedbackData = response.data.body.interviewAnswerList || [];

        if (feedbackData.length > 0) {
          // ID 기준 내림차순 정렬
          const sortedFeedback = feedbackData.sort((a, b) => b.id - a.id);

          // 가장 최근 피드백 선택
          setRecentFeedback(sortedFeedback[0]);
        }
      } catch (error) {
        console.error("Error fetching feedback data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbackData();
  }, [sectionId, gptQuestionId]);

  // '답변 다시 작성하기' 버튼 클릭 시 RetakeAnswerPage로 이동
  const handleRetryClick = () => {
    navigate(`/retake-answer/${sectionId}/${gptQuestionId}`, {
      state: { sectionId, gptQuestionId, question },
    });
  };

  return (
    <div className="feedback-page-container">
      <div className="feedback-page">
        <div className="header">
          <h2>피드백 결과</h2>
        </div>

        {loading ? (
          <div className="loading-container">
            <ClipLoader color={"#123abc"} loading={loading} size={50} />
          </div>
        ) : recentFeedback ? (
          <div className="feedback-item">
            <h3>유저 답변: {recentFeedback?.answer || "답변이 없습니다."}</h3>
            <div>
              <h4>GPT 피드백:</h4>
              {Array.isArray(recentFeedback?.feedbackList) &&
              recentFeedback?.feedbackList.length > 0 ? (
                <ul>
                  {recentFeedback.feedbackList.map((feedback, idx) => (
                    <li key={idx}>{feedback}</li>
                  ))}
                </ul>
              ) : (
                <p>피드백이 없습니다.</p>
              )}
            </div>
          </div>
        ) : (
          <p>피드백을 불러오는 중 오류가 발생했거나, 피드백이 아직 없습니다.</p>
        )}

        <button className="retry-button" onClick={handleRetryClick}>
          답변 다시 작성하기
        </button>
      </div>
    </div>
  );
}

export default FeedbackPage;
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import Sidebar from "./Sidebar";
// import ClipLoader from "react-spinners/ClipLoader";
// import "./css/FeedbackPage.css";

// function FeedbackPage() {
//   const { sectionId, gptQuestionId } = useParams();
//   const location = useLocation();
//   const { question } = location.state || {};
//   const [recentFeedback, setRecentFeedback] = useState(null); // 최근 피드백 저장
//   const [loading, setLoading] = useState(true);
//   const [userAnswer, setUserAnswer] = useState(""); // 사용자 답변 상태 추가
//   const [saving, setSaving] = useState(false); // 저장 상태
//   const [saveSuccess, setSaveSuccess] = useState(null); // 저장 성공 여부
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchFeedbackData = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         if (!token) {
//           console.error("JWT 토큰이 없습니다.");
//           return;
//         }

//         const response = await axios.get(
//           `http://localhost:8080/api/section/interview/answer/list/${gptQuestionId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         const feedbackData = response.data.body.interviewAnswerList || [];

//         if (feedbackData.length > 0) {
//           // ID 기준 내림차순 정렬
//           const sortedFeedback = feedbackData.sort((a, b) => b.id - a.id);

//           // 가장 최근 피드백 선택
//           setRecentFeedback(sortedFeedback[0]);
//         }
//       } catch (error) {
//         console.error("Error fetching feedback data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFeedbackData();
//   }, [sectionId, gptQuestionId]);

//   // '답변 다시 작성하기' 버튼 클릭 시 RetakeAnswerPage로 이동
//   const handleRetryClick = () => {
//     navigate(`/retake-answer/${sectionId}/${gptQuestionId}`, {
//       state: { sectionId, gptQuestionId, question },
//     });
//   };

//   // 답변 저장 핸들러
//   const handleSaveAnswer = async () => {
//     setSaving(true);
//     setSaveSuccess(null);

//     try {
//       const token = localStorage.getItem("token");

//       const response = await axios.post(
//         `http://localhost:8080/api/section/interview/answer`,
//         {
//           gptQuestionId: gptQuestionId,
//           answer: userAnswer,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.status === 200 || response.status === 201) {
//         setSaveSuccess(true); // 저장 성공 여부
//       } else {
//         setSaveSuccess(false);
//       }
//     } catch (error) {
//       console.error("Error saving answer:", error);
//       setSaveSuccess(false);
//     } finally {
//       setSaving(false);
//     }
//   };

//   return (
//     <div className="feedback-page-container">
//       <div className="feedback-page">
//         <div className="header">
//           <h2>피드백 결과</h2>
//         </div>

//         {loading ? (
//           <div className="loading-container">
//             <ClipLoader color={"#123abc"} loading={loading} size={50} />
//           </div>
//         ) : recentFeedback ? (
//           <div className="feedback-item">
//             <h3>유저 답변: {recentFeedback?.answer || "답변이 없습니다."}</h3>
//             <div>
//               <h4>GPT 피드백:</h4>
//               {Array.isArray(recentFeedback?.feedbackList) &&
//               recentFeedback?.feedbackList.length > 0 ? (
//                 <ul>
//                   {recentFeedback.feedbackList.map((feedback, idx) => (
//                     <li key={idx}>{feedback}</li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p>피드백이 없습니다.</p>
//               )}
//             </div>
//           </div>
//         ) : (
//           <p>피드백을 불러오는 중 오류가 발생했거나, 피드백이 아직 없습니다.</p>
//         )}

//         <div className="answer-form">
//           <h3>답변 입력하기</h3>
//           <textarea
//             value={userAnswer}
//             onChange={(e) => setUserAnswer(e.target.value)}
//             placeholder="여기에 답변을 작성하세요"
//             rows="5"
//           ></textarea>
//           <button
//             className="save-button"
//             onClick={handleSaveAnswer}
//             disabled={saving || userAnswer.trim() === ""}
//           >
//             {saving ? "저장 중..." : "답변 저장하기"}
//           </button>
//           {saveSuccess === true && <p>답변이 성공적으로 저장되었습니다!</p>}
//           {saveSuccess === false && (
//             <p>답변을 저장하는 중 오류가 발생했습니다. 다시 시도하세요.</p>
//           )}
//         </div>

//         <button className="retry-button" onClick={handleRetryClick}>
//           답변 다시 작성하기
//         </button>
//       </div>
//     </div>
//   );
// }

// export default FeedbackPage;
