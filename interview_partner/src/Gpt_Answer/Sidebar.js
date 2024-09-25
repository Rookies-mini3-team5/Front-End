// 질문 답변 화면의 추가될 Sidebar

import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs"; // npm install dayjs 필요

function Sidebar({ sectionId }) {
  const [recentQuestions, setRecentQuestions] = useState([]);
  const [olderQuestions, setOlderQuestions] = useState([]);

  // API 호출하여 유저 질문 목록 가져오기
  useEffect(() => {
    const fetchUserQuestions = async () => {
      try {
        const response = await axios.get(
          `/api/section/user/question/list/${sectionId}`
        );
        const allQuestions = response.data;

        // 오늘 날짜 기준으로 지난 7일 이내와 그 이전의 질문을 필터링
        const today = dayjs();
        const last7Days = today.subtract(7, "day");

        const recent = allQuestions.filter((question) =>
          dayjs(question.created_at).isAfter(last7Days)
        );
        const older = allQuestions.filter((question) =>
          dayjs(question.created_at).isBefore(last7Days)
        );

        setRecentQuestions(recent);
        setOlderQuestions(older);
      } catch (error) {
        console.error("Error fetching user questions:", error);
      }
    };

    fetchUserQuestions();
  }, [sectionId]);

  return (
    <div className="sidebar">
      <h2>AI 면접 코치</h2>
      <ul>
        <li>
          <a href="#">📑 새 채팅</a>
        </li>
        <li>나의 대화</li>

        {/* 지난 7일 이내 질문 */}
        <li>지난 7일</li>
        {recentQuestions.length > 0 ? (
          recentQuestions.map((question) => (
            <li key={question.id}>
              <a href={`#`}>{question.question}</a>
            </li>
          ))
        ) : (
          <li>최근 7일 이내 질문 없음</li>
        )}

        <hr />

        {/* 지난 7일 이전 질문 */}
        <li>그 이전</li>
        {olderQuestions.length > 0 ? (
          olderQuestions.map((question) => (
            <li key={question.id}>
              <a href={`#`}>{question.question}</a>
            </li>
          ))
        ) : (
          <li>그 이전 질문 없음</li>
        )}

        <hr />
        <li>
          <a href="#">⚙️ Settings</a>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
