import React, { useState, useEffect, Profiler } from "react";
import {
  Bell,
  ShoppingBag,
  MessageSquare,
  Grid,
  List,
  Users,
  Calendar,
  Search,
  Clock,
  LogOut,
  User,
  LogIn,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { useUser } from "./UserProvider";
import MemoModal from "./MemoModal";
import "./Home.css";

const Home = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const { currentUser, setCurrentUser } = useUser();
  const navigate = useNavigate();

  const [memos, setMemos] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const handleDateClick = (day) => {
    setSelectedDate(`${currentYear}-${currentMonth + 1}-${day}`);
    setIsModalOpen(true);
  };

  const handleSaveMemo = (memo) => {
    setMemos((prevMemos) => ({
      ...prevMemos,
      [selectedDate]: memo,
    }));
    setIsModalOpen(false);
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const dateKey = `${currentYear}-${currentMonth + 1}-${i}`;
      days.push(
        <div
          key={`day-${i}`}
          className={`calendar-day ${
            i === 10 || i === 5 || i === 15 ? "has-event" : ""
          } ${memos[dateKey] ? "has-memo" : ""}`}
          onClick={() => handleDateClick(i)}
        >
          {i}
          {i === 10 && <div className="event-indicator">인터뷰 면접</div>}
          {i === 5 && <div className="event-indicator">인터뷰 1</div>}
          {i === 15 && <div className="event-indicator">구업 준비</div>}
          {memos[dateKey] && <div className="memo-indicator">메모</div>}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="jobdash-container">
      {/* Left Sidebar */}
      <aside className="left-sidebar">
        {/* Profile Section */}
        <div className="profile-section">
          <img
            src="/api/placeholder/100/100"
            alt="Profile"
            className="profile-pic"
          />
          <h3>{currentUser ? currentUser.name : "게스트"}</h3>
          <p>{currentUser ? "구직자" : "로그인하세요"}</p>
        </div>

        {/* Menu Section */}
        <div className="menu-section">
          <div className="menu-item active">
            <User size={20} />
            <span onClick={() => navigate("/profile")}>내 프로필</span>
          </div>
          <div className="menu-item active">
            <Grid size={20} />

            <span onClick={() => navigate("/")}>대시보드</span>
          </div>
          <div className="menu-item">
            <List size={20} />
            <span>면접 목록</span>
          </div>

          <div className="menu-item">
            <Calendar size={20} />
            <span>캘린더</span>
          </div>
          <div className="menu-item">
            <MessageSquare size={20} />
            <span>메모</span>
          </div>
        </div>

        {/* Login/Logout Section */}
        <div className="auth-section">
          {currentUser ? (
            <div className="menu-item" onClick={handleLogout}>
              <LogOut size={20} />
              <span>로그아웃</span>
            </div>
          ) : (
            <div className="menu-item" onClick={handleLogin}>
              <LogIn size={20} />
              <span>로그인</span>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="header">
          <h1 className="logo">JobDash 개요</h1>
          <div className="search-bar">
            <Search size={20} />
            <input type="text" placeholder="Search for Jobs" />
          </div>
          <div className="header-icons">
            <Bell size={24} />
            <ShoppingBag size={24} />
            <MessageSquare size={24} />
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="dashboard">
          <div className="job-cards">
            {/* Job Card 1 */}
            <div className="job-card">
              <img src="/api/placeholder/400/300" alt="Remote Developer" />
              <h3>살펴보기</h3>
              <p>AI 면접 코치에 대해 자세히 알아보세요</p>
              <div className="job-card-footer">
                <button onClick={() => navigate("/about")}>
                  AI 면접 코치란
                </button>
              </div>
            </div>

            {/* Job Card 2 */}
            <div className="job-card">
              <img src="/api/placeholder/400/300" alt="Job Selection" />
              <h3>직무 선택</h3>
              <p>당신에게 맞는 직업을 찾아보세요</p>
              <div className="job-card-footer">
                <button onClick={() => navigate("/jobquestionlist")}>
                  직무 선택
                </button>
              </div>
            </div>

            {/* Job Card 3 */}
            <div className="job-card">
              <img src="/api/placeholder/400/300" alt="설문 참여" />
              <h3>구글 기사 바로보기</h3>
              <p></p>
              <div className="job-card-footer">
                <button
                  onClick={() =>
                    window.open(
                      "https://news.google.com/search?q=취업+면접&hl=ko&gl=KR&ceid=KR:ko",
                      "_blank"
                    )
                  }
                >
                  면접 News
                </button>
                <button
                  onClick={() =>
                    window.open(
                      "https://news.google.com/search?q=직업+트렌드&hl=ko&gl=KR&ceid=KR:ko",
                      "_blank"
                    )
                  }
                >
                  직업 News
                </button>
              </div>
            </div>

            {/* Job Card 4 */}
            <div className="job-card">
              <img src="/api/placeholder/400/300" alt="이력서 검토" />
              <h3>이력서 검토</h3>
              <p>GPT로 이력서 검토</p>
              <div className="job-card-footer">
                <button>이력서 검토 예정</button>
                <button>이력서 검토 상태</button>
              </div>
            </div>
          </div>

          {/* Calendar Section */}
          <div className="calendar-section">
            <h3>인터뷰 일정</h3>
            <div className="calendar-header">
              <button onClick={() => setCurrentMonth((prev) => prev - 1)}>
                &lt;
              </button>
              <span>{`${currentYear}년 ${currentMonth + 1}월`}</span>
              <button onClick={() => setCurrentMonth((prev) => prev + 1)}>
                &gt;
              </button>
            </div>
            <div className="calendar-grid">
              <div className="calendar-day-header">일</div>
              <div className="calendar-day-header">월</div>
              <div className="calendar-day-header">화</div>
              <div className="calendar-day-header">수</div>
              <div className="calendar-day-header">목</div>
              <div className="calendar-day-header">금</div>
              <div className="calendar-day-header">토</div>
              {renderCalendar()}
            </div>
          </div>
        </div>
      </main>

      {/* Right Sidebar */}
      <aside className="right-sidebar">
        <h2>진행중인 신청</h2>
        <div className="application-card">
          <img src="/api/placeholder/100/100" alt="Software Engineer" />
          <div>
            <h4>소프트웨어 엔지니어</h4>
            <p>(면접일: 3일)</p>
            <p>
              <Clock size={16} /> 작성일: 2021년 10월 10일
            </p>
            <div className="progress-bar">
              <div className="progress" style={{ width: "40%" }}></div>
            </div>
            <p>2/5 단계를 완료</p>
          </div>
        </div>

        <h3>인터뷰 기록</h3>
        <div className="interview-records">
          <div className="record-item">
            <div className="record-icon">
              <Clock size={20} />
            </div>
            <div className="record-info">
              <h4>소프트웨어 엔지니어</h4>
              <p>면접일자: 09/10/2021</p>
            </div>
            <div className="record-progress">83%</div>
          </div>
          <div className="record-item">
            <div className="record-icon">
              <Clock size={20} />
            </div>
            <div className="record-info">
              <h4>제품 관리자</h4>
              <p>면접일자: 08/10/2021</p>
            </div>
            <div className="record-progress">72%</div>
          </div>
          <div className="record-item">
            <div className="record-icon">
              <Clock size={20} />
            </div>
            <div className="record-info">
              <h4>마케팅 매니저</h4>
              <p>면접일자: 07/10/2021</p>
            </div>
            <div className="record-progress">34%</div>
          </div>
        </div>

        <div className="alert-box">
          <h3>알림</h3>
          <p>새로운 일자리 추천!</p>
          <p>최근 구인 공고를 확인하고 지금 지원하세요.</p>
          <button className="alert-btn">→</button>
        </div>
      </aside>

      {isModalOpen && (
        <MemoModal
          date={selectedDate}
          initialMemo={memos[selectedDate] || ""}
          onSave={handleSaveMemo}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Home;
