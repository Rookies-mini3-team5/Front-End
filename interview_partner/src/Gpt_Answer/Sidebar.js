// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { FaHome } from "react-icons/fa";
// import "./css/Sidebar.css";

// const Sidebar = ({
//   selectedJobName,
//   selectedOccupationalName,
//   newSectionId,
// }) => {
//   const [collapsed, setCollapsed] = useState(false);
//   const [sections, setSections] = useState([]); // 사용자 섹션 목록
//   const [selectedSectionId, setSelectedSectionId] = useState(
//     newSectionId || null
//   ); // 선택된 섹션 ID
//   const [questions, setQuestions] = useState([]); // 선택된 섹션의 질문 목록
//   const [selectedQuestionId, setSelectedQuestionId] = useState(null); // 선택된 질문 ID
//   const navigate = useNavigate();

//   // 사용자 섹션 목록을 가져오는 함수
//   useEffect(() => {
//     const fetchUserSections = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get("http://localhost:8080/api/section", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         });

//         if (response.status === 200) {
//           const sectionList = response.data.body;
//           setSections(sectionList); // 섹션 목록을 저장

//           // 가장 최근에 생성된 섹션을 자동으로 선택
//           if (sectionList.length > 0) {
//             // 섹션 ID가 없거나 새로운 섹션이 생성되었을 경우 자동 선택
//             const recentSection = newSectionId
//               ? sectionList.find((section) => section.id === newSectionId)
//               : sectionList[sectionList.length - 1]; // 가장 최근 섹션
//             setSelectedSectionId(recentSection.id); // 최근 생성된 섹션 선택
//           }
//         } else {
//           console.error("Error fetching sections, status:", response.status);
//         }
//       } catch (error) {
//         console.error("Error fetching user sections:", error);
//       }
//     };

//     fetchUserSections();
//   }, [newSectionId]); // newSectionId가 변경될 때마다 실행

//   // 선택된 섹션의 질문 목록을 가져오는 함수
//   useEffect(() => {
//     if (!selectedSectionId) return;

//     const fetchQuestions = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get(
//           `http://localhost:8080/api/section/gpt/question/list/${selectedSectionId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );
//         setQuestions(response.data.body.gptQuestionList || []); // 질문 목록 설정
//       } catch (error) {
//         console.error("Error fetching questions:", error);
//       }
//     };

//     fetchQuestions();
//   }, [selectedSectionId]); // selectedSectionId가 바뀔 때마다 질문 목록을 불러옴

//   // 섹션 클릭 시 해당 섹션 선택
//   const handleSectionClick = (sectionId) => {
//     setSelectedSectionId(sectionId);
//     setSelectedQuestionId(null); // 질문 초기화
//   };

//   // 질문 클릭 시 해당 질문 페이지로 이동
//   const handleQuestionClick = async (gptQuestionId) => {
//     setSelectedQuestionId(gptQuestionId);
//     try {
//       const token = localStorage.getItem("token");

//       // 질문에 대한 답변 기록 확인
//       const response = await axios.get(
//         `http://localhost:8080/api/section/interview/answer/list/${gptQuestionId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.data.body.interviewAnswerList.length > 0) {
//         navigate(`/answer/${gptQuestionId}`); // 답변이 있으면 답변 페이지로 이동
//       } else {
//         const selectedQuestion = questions.find((q) => q.id === gptQuestionId);
//         if (selectedQuestion) {
//           navigate("/question-answer", {
//             state: {
//               question: selectedQuestion,
//               sectionId: selectedSectionId,
//             },
//           });
//         }
//       }
//     } catch (error) {
//       console.error("Error checking question answers:", error);
//     }
//   };

//   // 사이드바 확장/축소 토글
//   const toggleSidebar = () => {
//     setCollapsed(!collapsed);
//   };

//   return (
//     <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
//       <button onClick={toggleSidebar} className="arrow-equal-toggle-button">
//         <span className="hamburger-line"></span>
//         <span className="hamburger-line"></span>
//         <span className="hamburger-line"></span>
//       </button>
//       <div className="logo-container">
//         {!collapsed ? (
//           <h2>AI 면접 코치</h2>
//         ) : (
//           <div className="logo-collapsed">🤔</div>
//         )}
//       </div>
//       <div className="home-icon-container" onClick={() => navigate("/")}>
//         <FaHome size={24} />
//         <span>홈</span>
//       </div>

//       {/* 선택된 직군과 직무 정보 표시 */}
//       <div className="selected-job">
//         <h3>선택된 직군: {selectedOccupationalName}</h3>
//         <h4>선택된 직무: {selectedJobName}</h4>
//       </div>

//       {/* 현재 섹션 정보 표시 */}
//       <h2>현재 섹션</h2>
//       {selectedSectionId ? (
//         <div className="current-section">
//           <p>
//             선택된 섹션:{" "}
//             {sections.find((section) => section.id === selectedSectionId)
//               ?.name || "섹션 제목 없음"}
//           </p>
//         </div>
//       ) : (
//         <p>현재 섹션 없음</p>
//       )}

//       {/* 섹션 목록 표시 */}
//       <h2>섹션 목록</h2>
//       <ul>
//         {sections.length > 0 ? (
//           sections.map((section) => (
//             <li
//               key={section.id}
//               onClick={() => handleSectionClick(section.id)}
//               className={selectedSectionId === section.id ? "active" : ""}
//             >
//               {section.name}
//             </li>
//           ))
//         ) : (
//           <li>섹션이 없습니다.</li>
//         )}
//       </ul>

//       {/* 질문 목록 표시 */}
//       {selectedSectionId && (
//         <div>
//           <h2>질문 목록</h2>
//           <ul>
//             {questions.length > 0 ? (
//               questions.map((question) => (
//                 <li
//                   key={question.id}
//                   onClick={() => handleQuestionClick(question.id)}
//                   className={selectedQuestionId === question.id ? "active" : ""}
//                 >
//                   {question.question}
//                 </li>
//               ))
//             ) : (
//               <li>질문이 없습니다.</li>
//             )}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Sidebar;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { FaHome } from "react-icons/fa";
// import "./css/Sidebar.css";

// const Sidebar = ({
//   selectedJobName,
//   selectedOccupationalName,
//   newSectionId,
// }) => {
//   const [collapsed, setCollapsed] = useState(false);
//   const [sections, setSections] = useState([]);
//   const [selectedSectionId, setSelectedSectionId] = useState(
//     newSectionId || null
//   );
//   const [questions, setQuestions] = useState([]);
//   const [selectedQuestionId, setSelectedQuestionId] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUserSections = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get("http://localhost:8080/api/section", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         });
//         if (response.status === 200) {
//           setSections(response.data.body);
//           if (response.data.body.length > 0) {
//             const recentSection = newSectionId
//               ? response.data.body.find(
//                   (section) => section.id === newSectionId
//                 )
//               : response.data.body[response.data.body.length - 1];
//             setSelectedSectionId(recentSection.id);
//           }
//         } else {
//           console.error("Error fetching sections, status:", response.status);
//         }
//       } catch (error) {
//         console.error("Error fetching user sections:", error);
//       }
//     };
//     fetchUserSections();
//   }, [newSectionId]);

//   useEffect(() => {
//     if (!selectedSectionId) return;
//     const fetchQuestions = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get(
//           `http://localhost:8080/api/section/gpt/question/list/${selectedSectionId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );
//         setQuestions(response.data.body.gptQuestionList || []);
//       } catch (error) {
//         console.error("Error fetching questions:", error);
//       }
//     };
//     fetchQuestions();
//   }, [selectedSectionId]);

//   const handleSectionClick = (sectionId) => {
//     setSelectedSectionId(sectionId);
//     setSelectedQuestionId(null);
//   };

//   const handleQuestionClick = async (gptQuestionId) => {
//     setSelectedQuestionId(gptQuestionId);
//     // 질문 클릭 시 이동하는 로직 추가...
//   };

//   const toggleSidebar = () => {
//     setCollapsed(!collapsed);
//   };

//   const goToEditSection = (sectionId) => {
//     navigate(`/edit-section/${sectionId}`); // 수정 페이지로 이동
//   };

//   return (
//     <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
//       <button onClick={toggleSidebar} className="arrow-equal-toggle-button">
//         <span className="hamburger-line"></span>
//         <span className="hamburger-line"></span>
//         <span className="hamburger-line"></span>
//       </button>
//       <div className="logo-container">
//         {!collapsed ? (
//           <h2>AI 면접 코치</h2>
//         ) : (
//           <div className="logo-collapsed">🤔</div>
//         )}
//       </div>
//       <div className="home-icon-container" onClick={() => navigate("/")}>
//         <FaHome size={24} />
//         <span>홈</span>
//       </div>

//       <h2>섹션 목록</h2>
//       <ul>
//         {sections.length > 0 ? (
//           sections.map((section) => (
//             <li key={section.id}>
//               <div onMouseEnter={() => setSelectedSectionId(section.id)}>
//                 {section.name}
//                 <button onClick={() => goToEditSection(section.id)}>
//                   수정
//                 </button>
//               </div>
//             </li>
//           ))
//         ) : (
//           <li>섹션이 없습니다.</li>
//         )}
//       </ul>

//       {/* 질문 목록 표시 */}
//       {selectedSectionId && (
//         <div>
//           <h2>질문 목록</h2>
//           <ul>
//             {questions.length > 0 ? (
//               questions.map((question) => (
//                 <li
//                   key={question.id}
//                   onClick={() => handleQuestionClick(question.id)}
//                 >
//                   {question.question}
//                 </li>
//               ))
//             ) : (
//               <li>질문이 없습니다.</li>
//             )}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Sidebar;
//===================================================================================================
// 제일 잘 되는거 그대신 섹션 목록이 다 나옴
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { FaHome, FaPen, FaTrash } from "react-icons/fa";
// import "./css/Sidebar.css";

// const Sidebar = ({
//   selectedJobName,
//   selectedOccupationalName,
//   newSectionId,
// }) => {
//   const [collapsed, setCollapsed] = useState(false);
//   const [sections, setSections] = useState([]);
//   const [selectedSectionId, setSelectedSectionId] = useState(
//     newSectionId || null
//   );
//   const [questions, setQuestions] = useState([]);
//   const [selectedQuestionId, setSelectedQuestionId] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUserSections = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get("http://localhost:8080/api/section", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         });
//         if (response.status === 200) {
//           setSections(response.data.body);
//           if (response.data.body.length > 0) {
//             const recentSection = newSectionId
//               ? response.data.body.find(
//                   (section) => section.id === newSectionId
//                 )
//               : response.data.body[response.data.body.length - 1];
//             setSelectedSectionId(recentSection.id);
//           }
//         } else {
//           console.error("Error fetching sections, status:", response.status);
//         }
//       } catch (error) {
//         console.error("Error fetching user sections:", error);
//       }
//     };
//     fetchUserSections();
//   }, [newSectionId]);

//   useEffect(() => {
//     if (!selectedSectionId) return;
//     const fetchQuestions = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get(
//           `http://localhost:8080/api/section/gpt/question/list/${selectedSectionId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );
//         setQuestions(response.data.body.gptQuestionList || []);
//       } catch (error) {
//         console.error("Error fetching questions:", error);
//       }
//     };
//     fetchQuestions();
//   }, [selectedSectionId]);

//   const handleSectionClick = (sectionId) => {
//     setSelectedSectionId(sectionId);
//     setSelectedQuestionId(null);
//   };

//   const handleQuestionClick = async (gptQuestionId) => {
//     setSelectedQuestionId(gptQuestionId);
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get(
//         `http://localhost:8080/api/section/interview/answer/list/${gptQuestionId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.data.body.interviewAnswerList.length > 0) {
//         // navigate(`/answer/${gptQuestionId}`);
//         navigate(`/gpt-answer/${gptQuestionId}`); // Navigate to the new route
//       } else {
//         const selectedQuestion = questions.find((q) => q.id === gptQuestionId);
//         if (selectedQuestion) {
//           navigate("/question-answer", {
//             state: {
//               question: selectedQuestion,
//               sectionId: selectedSectionId,
//             },
//           });
//         }
//       }
//     } catch (error) {
//       console.error("Error checking question answers:", error);
//     }
//   };

//   const goToEditSection = (sectionId) => {
//     navigate(`/edit-section/${sectionId}`);
//   };

//   const handleDeleteSection = async (sectionId) => {
//     const sectionName = sections.find(
//       (section) => section.id === sectionId
//     )?.name;
//     const confirmDelete = window.confirm(
//       `"${sectionName}"의 모의 면접 기록을 삭제하시겠습니까?`
//     );
//     if (confirmDelete) {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.delete(
//           `http://localhost:8080/api/section/${sectionId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );
//         if (response.data.result.resultCode === 200) {
//           setSections(sections.filter((section) => section.id !== sectionId));
//           alert("섹션이 성공적으로 삭제되었습니다.");
//         } else {
//           alert("섹션 삭제에 실패했습니다.");
//         }
//       } catch (error) {
//         console.error("Error deleting section:", error);
//       }
//     }
//   };

//   // '직접 물어보기' 버튼을 클릭 시 사용자가 질문을 입력하는 페이지로 이동
//   const handleAskQuestionClick = () => {
//     if (selectedSectionId) {
//       navigate(`/ask-question/${selectedSectionId}`);
//     } else {
//       alert("먼저 섹션을 선택해주세요.");
//     }
//   };
//   const handleViewQuestionHistoryClick = () => {
//     if (selectedSectionId) {
//       navigate(`/question-history/${selectedSectionId}`);
//     } else {
//       alert("먼저 섹션을 선택해주세요.");
//     }
//   };

//   return (
//     <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
//       <button
//         onClick={() => setCollapsed(!collapsed)}
//         className="arrow-equal-toggle-button"
//       >
//         <span className="hamburger-line"></span>
//         <span className="hamburger-line"></span>
//         <span className="hamburger-line"></span>
//       </button>
//       <div className="logo-container">
//         {!collapsed ? (
//           <h2>AI 면접 코치</h2>
//         ) : (
//           <div className="logo-collapsed">🤔</div>
//         )}
//       </div>
//       <div className="home-icon-container" onClick={() => navigate("/")}>
//         <FaHome size={24} />
//         <span>홈</span>
//       </div>

//       <h2>섹션 목록</h2>
//       <div className="section-list">
//         <ul>
//           {sections.length > 0 ? (
//             sections.map((section) => (
//               <li key={section.id} className="section-item">
//                 <div
//                   className="section-name"
//                   onClick={() => handleSectionClick(section.id)}
//                 >
//                   {section.name}
//                 </div>
//                 <FaPen
//                   className="edit-icon"
//                   onClick={() => goToEditSection(section.id)}
//                   title="수정하기"
//                 />
//                 <FaTrash
//                   className="delete-icon"
//                   onClick={() => handleDeleteSection(section.id)}
//                   title="삭제하기"
//                 />
//               </li>
//             ))
//           ) : (
//             <li>섹션이 없습니다.</li>
//           )}
//         </ul>
//       </div>

//       {selectedSectionId && (
//         <div>
//           <h2>질문 목록</h2>
//           <ul>
//             {questions.length > 0 ? (
//               questions.map((question) => (
//                 <li
//                   key={question.id}
//                   onClick={() => handleQuestionClick(question.id)}
//                 >
//                   {question.question}
//                 </li>
//               ))
//             ) : (
//               <li>질문이 없습니다.</li>
//             )}
//           </ul>
//           {/* 직접 물어보기 버튼 추가 */}
//           <button className="ask-question-btn" onClick={handleAskQuestionClick}>
//             직접 물어보기
//           </button>
//           <button
//             className="view-question-history-btn"
//             onClick={handleViewQuestionHistoryClick}
//           >
//             내가 물어본 질문 내역 보기
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Sidebar;

//==============================================================================================
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";
// import { FaHome } from "react-icons/fa";
// import "./css/Sidebar.css";

// const Sidebar = () => {
//   const { sectionId } = useParams(); // URL에서 sectionId 가져오기
//   const [collapsed, setCollapsed] = useState(false);
//   const [sections, setSections] = useState([]); // 사용자 섹션 목록
//   const [selectedSectionId, setSelectedSectionId] = useState(sectionId || null); // 선택된 섹션 ID
//   const [selectedSectionName, setSelectedSectionName] = useState(""); // 선택된 섹션 이름 상태
//   const [questions, setQuestions] = useState([]); // 선택된 섹션의 질문 목록
//   const [selectedQuestionId, setSelectedQuestionId] = useState(null); // 선택된 질문 ID
//   const navigate = useNavigate();

//   // 사용자 섹션 목록을 가져오는 함수
//   useEffect(() => {
//     const fetchUserSections = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get("http://localhost:8080/api/section", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         });

//         if (response.status === 200) {
//           const sectionList = response.data.body;
//           setSections(sectionList); // 섹션 목록을 저장

//           // 자동 선택된 섹션 설정
//           if (sectionId) {
//             const section = sectionList.find((sec) => sec.id === Number(sectionId));
//             if (section) {
//               setSelectedSectionId(section.id);
//               setSelectedSectionName(section.name); // 섹션 이름 설정
//             }
//           } else if (sectionList.length > 0) {
//             const recentSection = sectionList[sectionList.length - 1]; // 가장 최근 섹션
//             setSelectedSectionId(recentSection.id); // 최근 생성된 섹션 선택
//             setSelectedSectionName(recentSection.name); // 섹션 이름 설정
//           }
//         } else {
//           console.error("Error fetching sections, status:", response.status);
//         }
//       } catch (error) {
//         console.error("Error fetching user sections:", error);
//       }
//     };

//     fetchUserSections();
//   }, [sectionId]); // sectionId가 변경될 때만 실행되도록 설정

//   // 선택된 섹션의 질문 목록을 가져오는 함수 (한번만 가져오도록 처리)
//   useEffect(() => {
//     if (!selectedSectionId || questions.length > 0) return; // 이미 질문 목록이 설정된 경우 다시 가져오지 않음

//     const fetchQuestions = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get(
//           `http://localhost:8080/api/section/gpt/question/list/${selectedSectionId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );
//         setQuestions(response.data.body.gptQuestionList || []); // 질문 목록 설정
//       } catch (error) {
//         console.error("Error fetching questions:", error);
//       }
//     };

//     fetchQuestions();
//   }, [selectedSectionId]); // selectedSectionId가 바뀔 때만 질문 목록을 불러옴

//   // 섹션 클릭 시 해당 섹션 선택
//   const handleSectionClick = (sectionId) => {
//     setSelectedSectionId(sectionId);
//     const selectedSection = sections.find((sec) => sec.id === sectionId);
//     setSelectedSectionName(selectedSection ? selectedSection.name : ""); // 섹션 이름 설정
//     setSelectedQuestionId(null); // 질문 초기화
//   };

//   // 질문 클릭 시 해당 질문 페이지로 이동, 사이드바는 업데이트되지 않도록 설정
//   const handleQuestionClick = async (gptQuestionId) => {
//     setSelectedQuestionId(gptQuestionId);
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get(
//         `http://localhost:8080/api/section/interview/answer/list/${gptQuestionId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.data.body.interviewAnswerList.length > 0) {
//         navigate(`/gpt-answer/${gptQuestionId}`); // 답변이 있으면 답변 페이지로 이동
//       } else {
//         const selectedQuestion = questions.find((q) => q.id === gptQuestionId);
//         if (selectedQuestion) {
//           navigate("/question-answer", {
//             state: {
//               question: selectedQuestion,
//               sectionId: selectedSectionId,
//             },
//           });
//         }
//       }
//     } catch (error) {
//       console.error("Error checking question answers:", error);
//     }
//   };

//   // 사이드바 확장/축소 토글
//   const toggleSidebar = () => {
//     setCollapsed(!collapsed);
//   };

//   return (
//     <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
//       <button onClick={toggleSidebar} className="arrow-equal-toggle-button">
//         <span className="hamburger-line"></span>
//         <span className="hamburger-line"></span>
//         <span className="hamburger-line"></span>
//       </button>
//       <div className="logo-container">
//         {!collapsed ? (
//           <h2>AI 면접 코치</h2>
//         ) : (
//           <div className="logo-collapsed">🤔</div>
//         )}
//       </div>
//       <div className="home-icon-container" onClick={() => navigate("/")}>
//         <FaHome size={24} />
//         <span>홈</span>
//       </div>

//       {/* 현재 섹션 정보 표시 */}
//       <h2>현재 섹션</h2>
//       {selectedSectionId ? (
//         <div className="current-section">
//           <p>
//             선택된 섹션: {selectedSectionName || "섹션 제목 없음"} {/* 섹션 제목 표시 */}
//           </p>
//         </div>
//       ) : (
//         <p>현재 섹션 없음</p>
//       )}

//       {/* 질문 목록 표시 */}
//       {selectedSectionId && (
//         <div>
//           <h2>질문 목록</h2>
//           <ul>
//             {questions.length > 0 ? (
//               questions.map((question) => (
//                 <li
//                   key={question.id}
//                   onClick={() => handleQuestionClick(question.id)}
//                   className={selectedQuestionId === question.id ? "active" : ""}
//                 >
//                   {question.question}
//                 </li>
//               ))
//             ) : (
//               <li>질문이 없습니다.</li>
//             )}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Sidebar;
//테스트
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { FaHome, FaPen, FaTrash } from "react-icons/fa";
import "./css/Sidebar.css";

const Sidebar = () => {
  const { sectionId } = useParams(); // URL에서 sectionId 가져오기
  const location = useLocation(); // navigate로 전달된 state에서 값 가져오기
  const [collapsed, setCollapsed] = useState(false);
  const [sections, setSections] = useState([]); // 사용자 섹션 목록
  const [selectedSectionId, setSelectedSectionId] = useState(
    sectionId || location.state?.sectionId || null
  ); // 선택된 섹션 ID
  const [selectedSectionName, setSelectedSectionName] = useState(
    location.state?.sectionName || ""
  ); // 전달받은 섹션 이름 상태
  const [questions, setQuestions] = useState([]); // 선택된 섹션의 질문 목록
  const [selectedQuestionId, setSelectedQuestionId] = useState(null); // 선택된 질문 ID
  const navigate = useNavigate();

  // 사용자 섹션 목록을 가져오는 함수
  useEffect(() => {
    const fetchUserSections = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8080/api/section", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          const sectionList = response.data.body;
          setSections(sectionList);

          // 홈 화면에서 선택한 섹션이 있는 경우 해당 섹션을 설정
          if (!selectedSectionId && sectionList.length > 0) {
            const recentSection = sectionList[sectionList.length - 1];
            setSelectedSectionId(recentSection.id);
            setSelectedSectionName(recentSection.name);
          }
        } else {
          console.error("Error fetching sections, status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching user sections:", error);
      }
    };

    fetchUserSections();
  }, [selectedSectionId]); // selectedSectionId가 변경될 때만 실행

  // 선택된 섹션의 질문 목록을 가져오는 함수
  useEffect(() => {
    if (!selectedSectionId) return;

    const fetchQuestions = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:8080/api/section/gpt/question/list/${selectedSectionId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const questionList = response.data.body.gptQuestionList || [];
        setQuestions(questionList); // 질문 목록 설정

        // 홈에서 이동한 경우 첫 번째 질문을 선택하고 그 질문을 활성화된 상태로 표시
        if (questionList.length > 0 && location.state?.sectionId) {
          const firstQuestion = questionList[0];
          setSelectedQuestionId(firstQuestion.id); // 첫 번째 질문 선택
          navigate("/question-answer", {
            state: {
              question: firstQuestion,
              sectionId: selectedSectionId,
            },
          });
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [selectedSectionId]); // selectedSectionId가 변경될 때만 질문 목록을 불러옴

  // 섹션 수정 페이지로 이동
  const goToEditSection = (sectionId) => {
    navigate(`/edit-section/${sectionId}`);
  };

  // 섹션 삭제 기능
  const handleDeleteSection = async (sectionId) => {
    const sectionName = sections.find(
      (section) => section.id === sectionId
    )?.name;
    const confirmDelete = window.confirm(
      `"${sectionName}"의 모의 면접 기록을 삭제하시겠습니까?`
    );
    if (confirmDelete) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.delete(
          `http://localhost:8080/api/section/${sectionId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          setSections(sections.filter((section) => section.id !== sectionId));
          alert("섹션이 성공적으로 삭제되었습니다.");
          setSelectedSectionId(null); // 삭제 후 섹션 초기화
          navigate("/"); // 홈 화면으로 이동
        } else {
          alert("섹션 삭제에 실패했습니다.");
        }
      } catch (error) {
        console.error("Error deleting section:", error);
      }
    }
  };

  // 질문 클릭 시 해당 질문 페이지로 이동, 선택된 섹션 유지 (섹션 상태 변경 없음)
  const handleQuestionClick = async (gptQuestionId) => {
    setSelectedQuestionId(gptQuestionId); // 질문 선택 상태 업데이트
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

      if (response.data.body.interviewAnswerList.length > 0) {
        navigate(`/gpt-answer/${gptQuestionId}`); // 답변이 있으면 답변 페이지로 이동
      } else {
        const selectedQuestion = questions.find((q) => q.id === gptQuestionId);
        if (selectedQuestion) {
          navigate("/question-answer", {
            state: {
              question: selectedQuestion,
              sectionId: selectedSectionId, // 현재 선택된 섹션 ID를 그대로 전달
            },
          });
        }
      }
    } catch (error) {
      console.error("Error checking question answers:", error);
    }
  };
  // '질문하기' 페이지로 이동
  const handleAskQuestionClick = () => {
    if (selectedSectionId) {
      navigate(`/ask-question/${selectedSectionId}`);
    } else {
      alert("먼저 섹션을 선택해주세요.");
    }
  };
  // '질문 목록 보기' 페이지로 이동
  const handleViewQuestionHistoryClick = () => {
    if (selectedSectionId) {
      navigate(`/question-history/${selectedSectionId}`);
    } else {
      alert("먼저 섹션을 선택해주세요.");
    }
  };

  // 사이드바 확장/축소 토글
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <button onClick={toggleSidebar} className="arrow-equal-toggle-button">
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </button>
      <div className="logo-container">
        {!collapsed ? (
          <h2>AI 면접 코치</h2>
        ) : (
          <div className="logo-collapsed">🤔</div>
        )}
      </div>
      <div className="home-icon-container" onClick={() => navigate("/")}>
        <FaHome className="home-icon" />
        <span className="home-text">홈</span>
      </div>

      {/* 현재 섹션 정보 표시 */}
      <h2>현재 섹션</h2>
      {selectedSectionId ? (
        <div className="current-section">
          <p>{selectedSectionName || "섹션 제목 없음"}</p>
          <FaPen
            className="edit-icon"
            onClick={() => goToEditSection(selectedSectionId)}
            title="수정하기"
          />
          <FaTrash
            className="delete-icon"
            onClick={() => handleDeleteSection(selectedSectionId)}
            title="삭제하기"
          />
        </div>
      ) : (
        <p>현재 섹션 없음</p>
      )}

      {/* 질문 목록 표시 */}
      {selectedSectionId && (
        <div>
          <h2>질문 목록</h2>
          <ul>
            {questions.length > 0 ? (
              questions.map((question) => (
                <li
                  key={question.id}
                  onClick={() => handleQuestionClick(question.id)}
                  className={selectedQuestionId === question.id ? "active" : ""}
                >
                  {question.question}
                </li>
              ))
            ) : (
              <li>질문이 없습니다.</li>
            )}
          </ul>
          {/* '질문하기'와 '질문 목록 보기' 버튼 */}
          <div className="button-group">
            <button
              className="ask-question-btn"
              onClick={handleAskQuestionClick}
            >
              질문하기
            </button>
            <button
              className="view-question-history-btn"
              onClick={handleViewQuestionHistoryClick}
            >
              질문 목록 보기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
