// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import DotLoader from "react-spinners/DotLoader"; // ClipLoader 대신 DotLoader 추가
// import "./css/QuestionAnswerPage.css";

// function QuestionAnswerPage({
//   setSelectedQuestionId,
//   setSelectedExpectedQuestion,
// }) {
//   const location = useLocation(); // JobQuestionList에서 전달된 질문과 sectionId 받기
//   const { question, sectionId } = location.state || {};

//   const [userAnswer, setUserAnswer] = useState("");
//   const [loading, setLoading] = useState(false); // 로딩 상태 추가
//   const [answerGuideList, setAnswerGuideList] = useState([]); // 답변 가이드 리스트 추가
//   const navigate = useNavigate(); // 페이지 이동을 위한 navigate 추가

//   useEffect(() => {
//     // 질문이 있으면 상위 컴포넌트에 질문 ID와 내용 전달
//     if (question) {
//       setSelectedQuestionId(question.questionId);
//       setSelectedExpectedQuestion(question.expectedQuestion);
//     }

//     if (question?.answerGuide) {
//       if (Array.isArray(question.answerGuide)) {
//         setAnswerGuideList(question.answerGuide);
//       } else if (typeof question.answerGuide === "string") {
//         const guides = question.answerGuide
//           .split("/")
//           .map((guide) => guide.trim())
//           .filter((guide) => guide.length > 0);
//         setAnswerGuideList(guides);
//       }
//     }
//   }, [question, setSelectedQuestionId, setSelectedExpectedQuestion]);

//   const handleSubmit = async () => {
//     if (!question?.questionId) {
//       console.error("questionId가 존재하지 않습니다.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         console.error("JWT 토큰이 없습니다.");
//         setLoading(false);
//         return;
//       }

//       const response = await axios.post(
//         http://localhost:8080/api/section/interview/answer/${question.questionId},
//         {
//           answer: userAnswer,
//         },
//         {
//           headers: {
//             Authorization: Bearer ${token},
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.data.result.resultCode === 201) {
//         navigate(/feedback/${sectionId}/${question.questionId}, {
//           state: { sectionId, question },
//         });
//       } else {
//         console.error(
//           "응답에서 오류가 발생했습니다:",
//           response.data.result.resultMessage
//         );
//       }
//     } catch (error) {
//       if (error.response) {
//         console.error("Error response data:", error.response.data);
//         console.error("Error status:", error.response.status);
//       } else if (error.request) {
//         console.error("No response received:", error.request);
//       } else {
//         console.error("Error in request setup:", error.message);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="question-answer-content">
//       {loading ? (
//         <div className="loadingContainer">
//           <DotLoader color={"#123abc"} loading={loading} size={80} />
//           <p className="loadingText">
//             응답을 제출 중입니다... 피드백을 생성하고 있습니다...
//           </p>
//         </div>
//       ) : (
//         <>
//           <h2>{question?.expectedQuestion}</h2>
//           <div className="answer-guide">
//             <p>
//               💡 <strong>답변 가이드:</strong>
//             </p>
//             <p>이 질문에 답변할 때 다음 사항을 고려하세요:</p>

//             <ul>
//               {answerGuideList.length > 0 ? (
//                 answerGuideList.map((guide, index) => (
//                   <li key={index}>
//                     <span role="img" aria-label="check">
//                       ✅
//                     </span>
//                     {"  "}
//                     {guide}
//                   </li>
//                 ))
//               ) : (
//                 <li>답변 가이드가 없습니다.</li>
//               )}
//             </ul>
//           </div>

//           <textarea
//             value={userAnswer}
//             onChange={(e) => setUserAnswer(e.target.value)}
//             placeholder="답변을 입력하세요!"
//             className="answer-textarea"
//           />

//           <button onClick={handleSubmit} disabled={loading}>
//             {loading ? "제출 중..." : "응답 제출"}
//           </button>
//         </>
//       )}
//     </div>
//   );
// }

// export default QuestionAnswerPage;

// 질문 id 못찾아옴
// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import DotLoader from "react-spinners/DotLoader";
// import "./css/QuestionAnswerPage.css";

// function QuestionAnswerPage() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { question } = location.state || {}; // 전달된 질문 데이터

//   const [userAnswer, setUserAnswer] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [answerGuideList, setAnswerGuideList] = useState([]);

//   useEffect(() => {
//     console.log("Received question data:", question);
//     console.log("Expected question:", question?.expectedQuestion);

//     if (Array.isArray(question?.answerGuide)) {
//       // answerGuide가 배열일 때 그대로 사용
//       setAnswerGuideList(question.answerGuide);
//     } else {
//       // 예상치 못한 데이터 유형에 대비
//       console.error(
//         "Unexpected type for answerGuide:",
//         typeof question.answerGuide
//       );
//       setAnswerGuideList([]); // 기본적으로 빈 배열 설정
//     }
//   }, [question]);

//   const handleSubmit = async () => {
//     if (!question?.questionId) { // question.id 대신 question.questionId 사용
//       console.error("Question ID is missing.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         console.error("JWT token is missing.");
//         setLoading(false);
//         return;
//       }

//       const response = await axios.post(
//         `http://localhost:8080/api/section/interview/answer/${question.id}`,
//         { answer: userAnswer },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.data.result.resultCode === 201) {
//         navigate(`/feedback/${question.sectionId}/${question.id}`, {
//           state: { sectionId: question.sectionId, question },
//         });
//       } else {
//         console.error("Error:", response.data.result.resultMessage);
//       }
//     } catch (error) {
//       console.error("Error submitting answer:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="question-answer-content">
//       {loading ? (
//         <div className="loadingContainer">
//           <DotLoader color={"#123abc"} loading={loading} size={80} />
//           <p className="loadingText">
//             응답을 제출 중입니다... 피드백을 생성하고 있습니다...
//           </p>
//         </div>
//       ) : (
//         <>
//           <h2>{question?.question || "No question available"}</h2>

//           <div className="answer-guide">
//             <p>
//               💡 <strong>답변 가이드:</strong>
//             </p>
//             <ul>
//               {answerGuideList.length > 0 ? (
//                 answerGuideList.map((guide, index) => (
//                   <li key={index}>
//                     <span role="img" aria-label="check">
//                       ✅
//                     </span>
//                     {"  "}
//                     {guide}
//                   </li>
//                 ))
//               ) : (
//                 <li>답변 가이드가 없습니다.</li>
//               )}
//             </ul>
//           </div>
//           <textarea
//             value={userAnswer}
//             onChange={(e) => setUserAnswer(e.target.value)}
//             placeholder="Enter your answer here!"
//             className="answer-textarea"
//           />
//           <button onClick={handleSubmit} disabled={loading}>
//             {loading ? "제출 중..." : "응답 제출"}
//           </button>
//         </>
//       )}
//     </div>
//   );
// }

// export default QuestionAnswerPage;

// 잘 되는거
// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import DotLoader from "react-spinners/DotLoader";
// import "./css/QuestionAnswerPage.css";

// function QuestionAnswerPage() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { question } = location.state || {};

//   const [userAnswer, setUserAnswer] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [answerGuideList, setAnswerGuideList] = useState([]);

//   useEffect(() => {
//     if (Array.isArray(question?.answerGuide)) {
//       setAnswerGuideList(question.answerGuide);
//     } else {
//       console.error(
//         "Unexpected type for answerGuide:",
//         typeof question.answerGuide
//       );
//       setAnswerGuideList([]);
//     }
//   }, [question]);

//   const handleSubmit = async () => {
//     if (!question?.questionId) {
//       console.error("Question ID is missing.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         console.error("JWT token is missing.");
//         setLoading(false);
//         return;
//       }

//       const response = await axios.post(
//         `http://localhost:8080/api/section/interview/answer/${question.questionId}`,
//         { answer: userAnswer },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.data.result.resultCode === 201) {
//         navigate(`/feedback/${question.sectionId}/${question.questionId}`, {
//           state: { sectionId: question.sectionId, question },
//         });
//       } else {
//         console.error("Error:", response.data.result.resultMessage);
//       }
//     } catch (error) {
//       console.error("Error submitting answer:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="question-answer-content">
//       {loading ? (
//         <div className="loadingContainer">
//           <DotLoader color={"#123abc"} loading={loading} size={80} />
//           <p className="loadingText">
//             응답을 제출 중입니다... 피드백을 생성하고 있습니다...
//           </p>
//         </div>
//       ) : (
//         <>
//           <h2>{question?.expectedQuestion || "No question available"}</h2>

//           <div className="answer-guide">
//             <p>
//               💡 <strong>답변 가이드:</strong>
//             </p>
//             <ul>
//               {answerGuideList.length > 0 ? (
//                 answerGuideList.map((guide, index) => (
//                   <li key={index}>
//                     <span role="img" aria-label="check">
//                       ✅
//                     </span>
//                     {"  "}
//                     {guide}
//                   </li>
//                 ))
//               ) : (
//                 <li>답변 가이드가 없습니다.</li>
//               )}
//             </ul>
//           </div>
//           <textarea
//             value={userAnswer}
//             onChange={(e) => setUserAnswer(e.target.value)}
//             placeholder="Enter your answer here!"
//             className="answer-textarea"
//           />
//           <button onClick={handleSubmit} disabled={loading}>
//             {loading ? "제출 중..." : "응답 제출"}
//           </button>
//         </>
//       )}
//     </div>
//   );
// }

// export default QuestionAnswerPage;
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import DotLoader from "react-spinners/DotLoader";
import "./css/QuestionAnswerPage.css";

function QuestionAnswerPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { question, sectionId, sectionName } = location.state || {};

  const [userAnswer, setUserAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [answerGuideList, setAnswerGuideList] = useState([]);

  useEffect(() => {
    // 디버깅 로그 추가
    console.log("Received state data from JobQuestionList:");
    console.log("Question object:", question);
    console.log("Section ID:", sectionId);
    console.log("Section Name:", sectionName);

    if (question) {
      // console.log("전체 구조 Received question data:", question); // 전체 구조 확인
      // 질문 데이터가 존재하는지 확인하고 가이드 설정
      if (Array.isArray(question.answerGuide)) {
        setAnswerGuideList(question.answerGuide);
      } else {
        console.error(
          "Unexpected type for answerGuide:",
          typeof question.answerGuide
        );
        setAnswerGuideList([]);
      }
    } else {
      console.error("No question data received.");
    }
    console.log("Received question data:", location.state);
    console.log("Question object:", question);
  }, [location.state, question]);

  const handleSubmit = async () => {
    if (!question?.id) {
      // question.questionId 대신 question.id로 수정

      console.error("Question ID is missing.");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("JWT token is missing.");
        setLoading(false);
        return;
      }

      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/section/interview/answer/${question.id}`, // question.id로 수정
        { answer: userAnswer },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.result.resultCode === 201) {
        navigate(`/feedback/${question.sectionId}/${question.id}`, {
          state: { sectionId: question.sectionId, question },
        });
      } else {
        console.error("Error:", response.data.result.resultMessage);
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="question-answer-content">
      {loading ? (
        <div className="loadingContainer">
          <DotLoader color={"#123abc"} loading={loading} size={80} />
          <p className="loadingText">
            응답을 제출 중입니다... 피드백을 생성하고 있습니다...
          </p>
        </div>
      ) : (
        <>
          <h2>
            {question?.question
              ? question.question // 사이드바에서 불러온 질문
              : question?.expectedQuestion
              ? question.expectedQuestion // JobQuestionList에서 불러온 질문
              : "질문이 없습니다."}
          </h2>

          <div className="answer-guide">
            <p>
              💡 <strong>답변 가이드:</strong>
            </p>
            <ul>
              {answerGuideList.length > 0 ? (
                answerGuideList.map((guide, index) => (
                  <li key={index}>
                    <span role="img" aria-label="check">
                      ✅
                    </span>
                    {"  "}
                    {guide}
                  </li>
                ))
              ) : (
                <li>답변 가이드가 없습니다.</li>
              )}
            </ul>
          </div>
          <textarea
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="답변을 입력하세요!"
            className="answer-textarea"
          />
          <button onClick={handleSubmit} disabled={loading}>
            {loading ? "제출 중..." : "응답 제출"}
          </button>
        </>
      )}
    </div>
  );
}

export default QuestionAnswerPage;
