// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import DotLoader from "react-spinners/DotLoader";
// import "./css/QuestionAnswerPage.css";

// function QuestionAnswerPage() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { questionId } = useParams(); // URL에서 questionId 가져오기

//   const [userAnswer, setUserAnswer] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [answerGuideList, setAnswerGuideList] = useState([]);
//   const [question, setQuestion] = useState(null); // 질문 상태 추가
//   const [questionText, setQuestionText] = useState(""); // 질문 텍스트 상태 추가

//   useEffect(() => {
//     console.log("location.state:", location.state); // location에서 전달된 데이터 확인

//     // API를 통해 질문과 가이드를 불러오는 함수
//     const fetchGuideAndQuestion = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get(
//           `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_SECTION_API_URL}/gpt/question/${questionId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         const questionData = response.data.body;
//         setQuestionText(questionData.question); // 질문 텍스트 설정
//         const answerGuide = questionData.answerGuide;

//         setAnswerGuideList(
//           Array.isArray(questionData.answerGuide)
//             ? questionData.answerGuide
//             : []
//         );
//         console.log("Fetched question data from API:", questionData); // API에서 불러온 질문 확인
//       } catch (error) {
//         console.error("Error fetching guide or question:", error);
//       }
//     };

//     // location.state에 질문 정보가 있는지 확인
//     if (location.state?.question) {
//       setQuestion(location.state.question);
//       setAnswerGuideList(
//         Array.isArray(location.state.question.answerGuide)
//           ? location.state.question.answerGuide
//           : []
//       );
//       console.log(
//         "Question data from location.state:",
//         location.state.question
//       ); // location.state에서 전달된 질문 확인
//     } else {
//       // location.state에 데이터가 없을 경우 API 호출
//       fetchGuideAndQuestion();
//     }
//   }, [questionId, location.state]);

//   const handleSubmit = async () => {
//     if (!question?.id) {
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
//       // 답변 제출 API 호출
//       const response = await axios.post(
//         `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_SECTION_API_URL}/interview/answer/${question.id}`,

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
//           {/* question 데이터가 존재하는지 확인하고 출력 */}
//           <h2>
//             {question?.expectedQuestion ||
//               question?.question ||
//               "질문이 없습니다."}
//           </h2>
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

//2번
// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import DotLoader from "react-spinners/DotLoader";
// import "./css/QuestionAnswerPage.css";

// function QuestionAnswerPage() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { questionId } = useParams(); // URL에서 questionId 받아오기

//   const [userAnswer, setUserAnswer] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [answerGuideList, setAnswerGuideList] = useState([]);
//   const [question, setQuestion] = useState(null); // 질문 상태 추가
//   const [questionText, setQuestionText] = useState(""); // 질문 텍스트 상태 추가

//   useEffect(() => {
//     console.log("location.state:", location.state); // location에서 전달된 데이터 확인

//     // location.state에 질문 정보가 있는지 확인
//     if (location.state?.question) {
//       setQuestion(location.state.question);
//       setQuestionText(location.state.question.question || ""); // 질문 텍스트 설정
//       setAnswerGuideList(
//         Array.isArray(location.state.answerGuide)
//           ? location.state.answerGuide
//           : []
//       );
//       console.log(
//         "Question data from location.state:",
//         location.state.question
//       ); // location.state에서 전달된 질문 확인
//     } else {
//       // location.state에 데이터가 없을 경우 API 호출
//       fetchGuideAndQuestion();
//     }
//   }, [questionId, location.state]);

//   // API를 통해 질문과 가이드를 불러오는 함수
//   const fetchGuideAndQuestion = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get(
//         `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_SECTION_API_URL}/gpt/question/${questionId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       const questionData = response.data.body;
//       setQuestion(questionData); // 질문 데이터 설정
//       setQuestionText(questionData.question); // 질문 텍스트 설정
//       setAnswerGuideList(
//         Array.isArray(questionData.answerGuide)
//           ? questionData.answerGuide
//           : []
//       );
//       console.log("Fetched question data from API:", questionData); // API에서 불러온 질문 확인
//     } catch (error) {
//       console.error("Error fetching guide or question:", error);
//     }
//   };

//   const handleSubmit = async () => {
//     if (!question?.id) {
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
//       // 답변 제출 API 호출
//       const response = await axios.post(
//         `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_SECTION_API_URL}/interview/answer/${question.id}`,
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
//           {/* question 데이터가 존재하는지 확인하고 출력 */}
//           <h2>
//             {questionText || "질문이 없습니다."}
//           </h2>
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

//  answerlistpage 에서 질문 불러오기 성공
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import DotLoader from "react-spinners/DotLoader";
import "./css/QuestionAnswerPage.css";

function QuestionAnswerPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { questionId } = useParams();

  const [userAnswer, setUserAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [answerGuideList, setAnswerGuideList] = useState([]);
  const [questionText, setQuestionText] = useState(""); // 질문 텍스트는 문자열이어야 함
  const [question, setQuestion] = useState(null); // 전체 질문 객체 상태

  useEffect(() => {
    console.log("location.state:", location.state); // 전달된 데이터 확인

    if (location.state?.question) {
      // location.state에서 전달된 질문을 확인하고 텍스트 설정
      setQuestion(location.state.question);

      // 객체에서 문자열만 추출하여 questionText 설정
      if (typeof location.state.question === "string") {
        setQuestionText(location.state.question); // 문자열로 설정
      } else if (location.state.question.question) {
        setQuestionText(location.state.question.question); // question 속성의 문자열을 설정
      }

      // answerGuide가 undefined인 경우 API로 불러옴
      if (location.state.answerGuide) {
        setAnswerGuideList(location.state.answerGuide);
      } else {
        fetchGuideAndQuestion();
      }
      console.log(
        "Question data from location.state:",
        location.state.question
      );
    } else {
      // location.state에 데이터가 없으면 API 호출
      fetchGuideAndQuestion();
    }
  }, [questionId, location.state]);

  // API에서 질문과 가이드를 가져오는 함수
  const fetchGuideAndQuestion = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_SECTION_API_URL}/gpt/question/${questionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const questionData = response.data.body;
      setQuestion(questionData);

      // questionData가 객체일 경우 문자열만 추출하여 설정
      if (questionData.question) {
        setQuestionText(questionData.question);
      }

      setAnswerGuideList(
        Array.isArray(questionData.answerGuide) ? questionData.answerGuide : []
      );
      console.log("Fetched question data from API:", questionData);
    } catch (error) {
      console.error("Error fetching guide or question:", error);
    }
  };

  const handleSubmit = async () => {
    if (!questionId) {
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
        `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_SECTION_API_URL}/interview/answer/${questionId}`,
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
          <h2>{questionText || "질문이 없습니다."}</h2>
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
                    </span>{" "}
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
