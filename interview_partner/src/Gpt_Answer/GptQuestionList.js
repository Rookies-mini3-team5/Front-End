// 섹션에 해당하는 gpt 질문들 리스트
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const GptQuestionList = () => {
  const { sectionId } = useParams();
  const [gptQuestions, setGptQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGptQuestions = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/section/gpt/question/${sectionId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        setGptQuestions(response.data.body.gptQuestionList);
      } catch (err) {
        console.error("Error fetching questions:", err);
        setError("질문 목록을 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    if (sectionId) {
      fetchGptQuestions();
    }
  }, [sectionId]);

  const handleQuestionClick = (gptQuestionId) => {
    navigate(`/answer/${gptQuestionId}`); // 질문 클릭 시 답변 목록 페이지로 이동
  };

  if (loading) {
    return <p>로딩 중...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>질문 리스트</h2>
      {gptQuestions.length > 0 ? (
        <ul>
          {gptQuestions.map((question) => (
            <li
              key={question.id}
              onClick={() => handleQuestionClick(question.id)}
            >
              <p>{question.question}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>질문이 없습니다.</p>
      )}
    </div>
  );
};

export default GptQuestionList;



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";

// const GptQuestionList = () => {
//   const { sectionId } = useParams(); // URL에서 sectionId 가져오기
//   const [gptQuestions, setGptQuestions] = useState([]); // 질문 목록 상태
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchGptQuestions = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get(
//           `http://localhost:8080/api/section/gpt/question/list/${sectionId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         setGptQuestions(response.data.body.gptQuestionList); // 질문 목록 설정
//       } catch (err) {
//         console.error("Error fetching questions:", err);
//         setError("질문 목록을 불러오는 중 오류가 발생했습니다.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (sectionId) {
//       fetchGptQuestions(); // sectionId가 있을 때 API 호출
//     }
//   }, [sectionId]);

//   const handleQuestionClick = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get(
//         `http://localhost:8080/api/section/interview/answer/${gptQuestionId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       const answers = response.data.body.interviewAnswerList; // 답변 목록 설정
//       // 예시로 답변 내용을 콘솔에 출력합니다.
//       // 여기서 답변을 보여줄 새로운 페이지로 이동할 수도 있습니다.
//       console.log(answers);

//       // 예시로 답변 목록 페이지로 이동
//       navigate(`/answer/${gptQuestionId}`);
//     } catch (error) {
//       console.error("Error fetching answers for question:", error);
//     }
//   };

//   if (loading) {
//     return <p>로딩 중...</p>;
//   }

//   if (error) {
//     return <p>{error}</p>;
//   }

//   return (
//     <div>
//       <h2>사용자가 선택한 질문</h2>
//       {gptQuestions.length > 0 ? (
//         <ul>
//           {gptQuestions.map((question) => (
//             <li
//               key={question.id}
//               onClick={() => handleQuestionClick(question.id)}
//             >
//               <p>{question.question}</p>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>질문이 없습니다.</p>
//       )}
//     </div>
//   );
// };

// export default GptQuestionList;
