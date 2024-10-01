// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import "./css/AnswerListPage.css"; // CSS 파일 임포트

// const AnswerListPage = () => {
//   const { gptQuestionId } = useParams();
//   const [answers, setAnswers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [guide, setGuide] = useState([]);

//   useEffect(() => {
//     const fetchAnswers = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get(
//           `http://localhost:8080/api/section/interview/answer/list/${gptQuestionId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         setAnswers(response.data.body.interviewAnswerList || []);
//         setGuide(response.data.body.guide || []);
//       } catch (err) {
//         setError("데이터를 불러오는 중 오류가 발생했습니다.");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAnswers();
//   }, [gptQuestionId]);

//   if (loading) {
//     return <p>로딩 중...</p>;
//   }

//   if (error) {
//     return <p>{error}</p>;
//   }

//   return (
//     <div className="answer-list-container">
//       <div className="answer-list-wrapper">
//         <h2>답변 리스트</h2>

//         {guide.length > 0 && (
//           <div className="guide">
//             <h3>가이드</h3>
//             <ul>
//               {guide.map((item, index) => (
//                 <li key={index}>{item}</li>
//               ))}
//             </ul>
//           </div>
//         )}

//         {answers.length > 0 ? (
//           <ul>
//             {answers.map((answer) => (
//               <li key={answer.id}>
//                 <p>질문: {answer.question}</p>
//                 <p>답변: {answer.answer}</p>
//                 <p>피드백:</p>
//                 <ul>
//                   {answer.feedbackList.map((feedback, index) => (
//                     <li key={index}>{feedback}</li>
//                   ))}
//                 </ul>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>답변이 없습니다.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AnswerListPage;
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import "./css/AnswerListPage.css"; // CSS 파일 임포트

// const AnswerListPage = () => {
//   const { gptQuestionId } = useParams();
//   const [answers, setAnswers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [guide, setGuide] = useState([]);
//   const [question, setQuestion] = useState(""); // 질문 내용을 저장하기 위한 상태 추가

//   useEffect(() => {
//     const fetchAnswers = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         // 인터뷰 답변 리스트 API 호출
//         const response = await axios.get(
//           `http://localhost:8080/api/section/interview/answer/list/${gptQuestionId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );
//         setAnswers(response.data.body.interviewAnswerList || []);
//       } catch (err) {
//         setError("데이터를 불러오는 중 오류가 발생했습니다.");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     // 질문 가이드 API 호출
//     const fetchGuide = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         // gptQuestionId를 이용해 질문과 가이드를 가져옴
//         const guideResponse = await axios.get(
//           `http://localhost:8080/api/section/gpt/question/list/${gptQuestionId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         const selectedQuestion = guideResponse.data.body.gptQuestionList.find(
//           (item) => item.id === parseInt(gptQuestionId)
//         );

//         if (selectedQuestion) {
//           setGuide(selectedQuestion.answerGuide || []);
//           setQuestion(selectedQuestion.question || "");
//         }
//       } catch (err) {
//         setError("가이드를 불러오는 중 오류가 발생했습니다.");
//         console.error(err);
//       }
//     };

//     fetchAnswers();
//     fetchGuide();
//   }, [gptQuestionId]);

//   if (loading) {
//     return <p>로딩 중...</p>;
//   }

//   if (error) {
//     return <p>{error}</p>;
//   }

//   return (
//     <div className="answer-list-container">
//       <div className="answer-list-wrapper">
//         <h2>{question}</h2> {/* 질문을 상단에 표시 */}

//         {guide.length > 0 && (
//           <div className="guide">
//             <h3>가이드</h3>
//             <ul>
//               {guide.map((item, index) => (
//                 <li key={index}>{item}</li>
//               ))}
//             </ul>
//           </div>
//         )}

//         {answers.length > 0 ? (
//           <ul>
//             {answers.map((answer) => (
//               <li key={answer.id}>
//                 <p>질문: {answer.question}</p>
//                 <p>답변: {answer.answer}</p>
//                 <p>피드백:</p>
//                 <ul>
//                   {answer.feedbackList.map((feedback, index) => (
//                     <li key={index}>{feedback}</li>
//                   ))}
//                 </ul>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>답변이 없습니다.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AnswerListPage;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./css/AnswerListPage.css";

const AnswerListPage = () => {
  const { gptQuestionId } = useParams();
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [guide, setGuide] = useState([]);

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:8080/api/section/interview/answer/list/${gptQuestionId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        setAnswers(response.data.body.interviewAnswerList || []);
      } catch (err) {
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const fetchGuide = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:8080/api/section/gpt/question/${gptQuestionId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const answerGuide = response.data.body.answerGuide;
        if (answerGuide && Array.isArray(answerGuide)) {
          setGuide(answerGuide);
        } else {
          console.error("Answer guide is not an array:", answerGuide);
        }
      } catch (error) {
        console.error("Error fetching guide:", error);
      }
    };

    fetchAnswers();
    fetchGuide();
  }, [gptQuestionId]);

  if (loading) {
    return <p>로딩 중...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="answer-list-container">
      <div className="answer-list-wrapper">
        {answers.length > 0 && (
          <div>
            <h2>질문: {answers[0].question}</h2> {/* 첫 번째 질문 표시 */}
          </div>
        )}

        {/* 가이드 리스트가 있으면 출력 */}
        {guide.length > 0 && (
          <div className="guide">
            <h3>💡 답변 가이드:</h3>
            <div className="guide-box">
              <ul>
                {guide.map((item, index) => (
                  <li key={index}>
                    <span className="checkmark">✔️</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* 답변 리스트 출력 */}
        {answers.length > 0 ? (
          <ul>
            {answers.map((answer) => (
              <li key={answer.id}>
                <p>유저 답변: {answer.answer}</p>
                <p>피드백:</p>
                <div className="feedback-box">
                  <ul>
                    {answer.feedbackList.map((feedback, index) => (
                      <li key={index}>{feedback}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>답변이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default AnswerListPage;
