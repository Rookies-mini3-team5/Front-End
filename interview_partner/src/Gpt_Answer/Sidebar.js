// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import dayjs from "dayjs";
// import "./css/Sidebar.css"; // 사이드바 CSS 가져오기

// function Sidebar({ sectionId }) {
//   const [recentQuestions, setRecentQuestions] = useState([]);
//   const [olderQuestions, setOlderQuestions] = useState([]);

//   useEffect(() => {
//     const fetchUserQuestions = async () => {
//       try {
//         const response = await axios.get(
//           `/api/section/user/question/list/${sectionId}`
//         );
//         const allQuestions = response.data;

//         const today = dayjs();
//         const last7Days = today.subtract(7, "day");

//         const recent = allQuestions.filter((question) =>
//           dayjs(question.created_at).isAfter(last7Days)
//         );
//         const older = allQuestions.filter((question) =>
//           dayjs(question.created_at).isBefore(last7Days)
//         );

//         setRecentQuestions(recent);
//         setOlderQuestions(older);
//       } catch (error) {
//         console.error("Error fetching user questions:", error);
//       }
//     };

//     fetchUserQuestions();
//   }, [sectionId]);

//   return (
//     <div className="sidebar">
//       <h2>AI 면접 코치</h2>
//       <ul>
//         <li>
//           <a href="#"> 새 채팅</a>
//         </li>
//         <li>나의 대화</li>

//         {/* 지난 7일 이내 질문 */}
//         <li>지난 7일</li>
//         {recentQuestions.length > 0 ? (
//           recentQuestions.map((question) => (
//             <li key={question.id}>
//               <a href={`#`}>{question.question}</a>
//             </li>
//           ))
//         ) : (
//           <li>최근 7일 이내 질문 없음</li>
//         )}

//         <hr />

//         {/* 지난 7일 이전 질문 */}
//         <li>그 이전</li>
//         {olderQuestions.length > 0 ? (
//           olderQuestions.map((question) => (
//             <li key={question.id}>
//               <a href={`#`}>{question.question}</a>
//             </li>
//           ))
//         ) : (
//           <li>그 이전 질문 없음</li>
//         )}

//         <hr />
//         <li>
//           <a href="#" className="settings">
//             ⚙️ Settings {/* 아이콘과 텍스트 같이 표시 */}
//           </a>
//         </li>
//       </ul>
//     </div>
//   );
// }

// export default Sidebar;

import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import "./css/Sidebar.css"; // 사이드바 CSS 가져오기

function Sidebar({ sectionId }) {
  const [recentQuestions, setRecentQuestions] = useState([]);
  const [olderQuestions, setOlderQuestions] = useState([]);
  const [collapsed, setCollapsed] = useState(false); // 사이드바 접힘 상태 관리

  useEffect(() => {
    const fetchUserQuestions = async () => {
      try {
        const response = await axios.get(
          `/api/section/user/question/list/${sectionId}`
        );
        const allQuestions = response.data;

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

  const toggleSidebar = () => {
    setCollapsed(!collapsed); // 사이드바 접힘 상태 토글
  };

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      {/* 접혔을 때 로고 위에 나타나는 햄버거 버튼 */}
      {collapsed ? (
        <button onClick={toggleSidebar} className="arrow-equal-toggle-button">
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      ) : (
        <button onClick={toggleSidebar} className="arrow-equal-toggle-button">
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      )}
      {/* 텍스트로 로고 표시 */}
      <div className="logo-container">
        {!collapsed ? (
          <h2>AI 면접 코치</h2>
        ) : (
          <div className="logo-collapsed">🤔</div>
        )}
      </div>
      {/* 새 채팅 버튼 */}
      <div className="chat-btn-container">
        {!collapsed ? (
          <div className="chat-btn-expanded-container">
            <div className="chat-btn-expanded">
              <i className="fa fa-plus chat-icon"></i>
              <span>새 채팅</span>
            </div>
            <div className="search-btn">
              <i className="fa fa-search"></i>
            </div>
          </div>
        ) : (
          <div className="chat-btn-collapsed-container">
            <div className="chat-btn-collapsed">
              <i className="fa fa-plus"></i>
            </div>
            <div className="search-btn-collapsed">
              <i className="fa fa-search search-icon-collapsed"></i>{" "}
              {/* 검색 아이콘 */}
            </div>
          </div>
        )}
      </div>

      <ul>
        <hr className="section-divider" />

        <li>{!collapsed ? "나의 대화" : <i className="fa fa-comments"></i>}</li>
        {/* 구분선 추가 */}
        <hr className="section-divider" />

        <li>{!collapsed ? "지난 7일" : <i className="fa fa-clock"></i>}</li>
        {recentQuestions.length > 0 ? (
          recentQuestions.map((question) => (
            <li key={question.id}>
              <a href={`#`}>
                {!collapsed ? (
                  question.question
                ) : (
                  <i className="fa fa-question-circle"></i>
                )}
              </a>
            </li>
          ))
        ) : (
          <li>
            {!collapsed ? (
              "최근 7일 이내 질문 없음"
            ) : (
              <i className="fa fa-exclamation-circle"></i>
            )}
          </li>
        )}

        <hr />

        <li>{!collapsed ? "그 이전" : <i className="fa fa-history"></i>}</li>
        {olderQuestions.length > 0 ? (
          olderQuestions.map((question) => (
            <li key={question.id}>
              <a href={`#`}>
                {!collapsed ? (
                  question.question
                ) : (
                  <i className="fa fa-question-circle"></i>
                )}
              </a>
            </li>
          ))
        ) : (
          <li>
            {!collapsed ? (
              "그 이전 질문 없음"
            ) : (
              <i className="fa fa-exclamation-circle"></i>
            )}
          </li>
        )}

        <hr />
        <li>
          {!collapsed ? (
            <a href="#" className="settings">
              ⚙️ Settings
            </a>
          ) : (
            <a href="#" className="settings">
              ⚙️
            </a>
          )}
        </li>

        {/* 사용자 프로필 영역 */}
        <div className="user-profile">
          <img src="profile.jpg" alt="User Profile" />
          {/* 접혔을 때는 이름과 나가기 아이콘을 숨기고 프로필 사진만 표시 */}
          {!collapsed && <span>user Team 5</span>}
          {!collapsed && (
            <div className="profile-action">
              <i className="fa fa-sign-out"></i> {/* 나가기 아이콘 */}
            </div>
          )}
        </div>
      </ul>
    </div>
  );
}

export default Sidebar;
