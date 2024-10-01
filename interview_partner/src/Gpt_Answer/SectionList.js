// 섹션 리스트 조회 section name 은 직군/직무 수정 가능
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SectionList = () => {
  const [sections, setSections] = useState([]);
  const [selectedSectionId, setSelectedSectionId] = useState(null);
  const [gptQuestions, setGptQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:8080/api/section`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        setSections(response.data.body); // 섹션 목록 설정
      } catch (err) {
        console.error("Error fetching sections:", err);
        setError("섹션 목록을 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchSections(); // 섹션 목록 API 호출
  }, []);

  const handleSectionClick = async (sectionId) => {
    setSelectedSectionId(sectionId);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:8080/api/section/gpt/question/list/${sectionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setGptQuestions(response.data.body.gptQuestionList); // 질문 목록 설정
    } catch (err) {
      console.error("Error fetching questions:", err);
      setError("질문 목록을 불러오는 중 오류가 발생했습니다.");
    }
  };

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
      <h2>섹션(면접) 정보</h2>
      {sections.length > 0 ? (
        <ul>
          {sections.map((section) => (
            <li key={section.id} onClick={() => handleSectionClick(section.id)}>
              {section.name} {/* 섹션 이름 */}
            </li>
          ))}
        </ul>
      ) : (
        <p>섹션이 없습니다.</p>
      )}

      {selectedSectionId && (
        <div>
          <h2>사용자가 선택한 질문</h2>
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
      )}
    </div>
  );
};

export default SectionList;
