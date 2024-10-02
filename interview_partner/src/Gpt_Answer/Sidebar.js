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
    location.state?.sectionName || "섹션 제목 없음"
  ); // 섹션 이름 상태
  const [questions, setQuestions] = useState([]); // 선택된 섹션의 질문 목록
  const [selectedQuestionId, setSelectedQuestionId] = useState(null); // 선택된 질문 ID
  const navigate = useNavigate();

  // 사용자 섹션 목록을 가져오는 함수
  useEffect(() => {
    const fetchUserSections = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/section`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          const sectionList = response.data.body;
          setSections(sectionList);

          // 홈 화면에서 선택한 섹션이 있는 경우 해당 섹션을 설정
          if (!selectedSectionId && sectionList.length > 0) {
            const recentSection = sectionList[sectionList.length - 1];
            setSelectedSectionId(recentSection.id);
            setSelectedSectionName(recentSection.name);
          } else if (selectedSectionId) {
            // 선택된 섹션이 있을 경우 해당 섹션 이름을 설정
            const selectedSection = sectionList.find(
              (sec) => sec.id === Number(selectedSectionId)
            );
            if (selectedSection) {
              setSelectedSectionName(selectedSection.name);
            }
          }
        } else {
          console.error("Error fetching sections, status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching user sections:", error);
      }
    };

    fetchUserSections();
  }, [selectedSectionId]);

  // 선택된 섹션의 질문 목록을 가져오는 함수
  useEffect(() => {
    if (!selectedSectionId) return;

    const fetchQuestions = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/section/gpt/question/list/${selectedSectionId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const questionList = response.data.body.gptQuestionList || [];
        setQuestions(questionList);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [selectedSectionId]);

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
          `${process.env.REACT_APP_API_BASE_URL}/api/section/${sectionId}`,
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
          setSelectedSectionName("섹션 제목 없음");
          navigate("/"); // 홈 화면으로 이동
        } else {
          alert("섹션 삭제에 실패했습니다.");
        }
      } catch (error) {
        console.error("Error deleting section:", error);
      }
    }
  };

  // 질문 클릭 시 해당 질문 페이지로 이동, 선택된 섹션 유지
  const handleQuestionClick = async (gptQuestionId) => {
    setSelectedQuestionId(gptQuestionId);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/section/interview/answer/list/${gptQuestionId}`,
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
          navigate(`/question-answer/${gptQuestionId}`, {
            state: {
              question: selectedQuestion,
              sectionId: selectedSectionId,
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
      <div className="logo-home-container">
        <FaHome
          className="home-icon"
          onClick={() => {
            console.log("Home icon clicked");
            navigate("/");
          }}
        />
        {!collapsed ? (
          <h2 className="logo-text">AI 면접 코치</h2>
        ) : (
          <div className="logo-collapsed">🤔</div>
        )}
        <button className="hamburger-btn" onClick={toggleSidebar}>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </div>

      {/* Divider 추가 */}
      <hr className="sidebar-divider" />
      {/* 현재 섹션 정보와 질문 목록을 상단에 배치 */}

      <div className="section-question-container">
        <h2>현재 섹션</h2>
        {selectedSectionId ? (
          <div className="current-section">
            <p>{selectedSectionName}</p>
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
        <hr className="sidebar-divider2" />
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
                    className={
                      selectedQuestionId === question.id ? "active" : ""
                    }
                  >
                    {question.question}
                  </li>
                ))
              ) : (
                <li>질문이 없습니다.</li>
              )}
            </ul>
          </div>
        )}
      </div>

      {/* 질문하기와 질문 목록 보기 버튼 */}
      <div className="button-group2">
        <button className="ask-question-btn" onClick={handleAskQuestionClick}>
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
  );
};

export default Sidebar;
