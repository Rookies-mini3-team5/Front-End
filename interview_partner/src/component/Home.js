import React, { useState, useEffect } from "react";
import {
  Bell,
  ShoppingBag,
  MessageSquare,
  Grid,
  List,
  Users,
  Calendar as CalendarIcon,
  Search,
  Clock,
  LogOut,
  User,
  LogIn,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Calendar } from "react-calendar";
import { ko } from "date-fns/locale";
import 'react-calendar/dist/Calendar.css';
import { useUser } from "./UserProvider";
import MemoModal from "./MemoModal";
import "./Home.css";

const Home = () => {
  const { currentUser, setCurrentUser, setToken, token } = useUser();
  const navigate = useNavigate();

  const [memos, setMemos] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCalendarId, setSelectedCalendarId] = useState(null);
  const [profileImage, setProfileImage] = useState(null);  // 프로필 이미지 상태 추가
  const imageBaseUrl = process.env.REACT_APP_IMAGE_URL;

  // 로그아웃 처리
  const handleLogout = () => {
    setCurrentUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setMemos({});
    setProfileImage(`${imageBaseUrl}/defaultPicture.jpeg`);
  };

  // 로그인 처리
  const handleLogin = () => {
    navigate("/login");
  };

  // 프로필 이미지 가져오기
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetch("http://localhost:8080/mypage/picture", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      })
        .then((response) => response.blob())
        .then((blob) => {
          const imageUrl = URL.createObjectURL(blob);
          setProfileImage(imageUrl);
        })
        .catch((error) => {
          console.error("Failed to fetch profile image:", error);
        });
    }
  }, []);

  // 날짜 선택 시 모달 열기
  const handleDateChange = (date) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }

    setSelectedDate(date);
    const formattedDate = date.toLocaleDateString('en-CA');
    const existingMemo = memos[formattedDate];
    setSelectedCalendarId(existingMemo ? existingMemo.id : null);
    setIsModalOpen(true);
  };

  // 메모 저장 또는 수정
  const handleSaveMemo = (memo, calendarId) => {
    const formattedDate = selectedDate.toLocaleDateString('en-CA');
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token");
      return;
    }

    const url = calendarId
      ? `http://localhost:8080/api/calendar/${calendarId}`
      : "http://localhost:8080/api/calendar";
    const method = calendarId ? "PATCH" : "POST";

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        date: formattedDate,
        memo: memo,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result?.resultCode === 200 || data.result?.resultCode === 201) {
          const newCalendarId = calendarId || data.body?.id;

          // 전체 메모 다시 불러오기 - 저장하자마자 삭제버튼 안생기는 버그 해결
          const currentYear = selectedDate.getFullYear();
          const currentMonth = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
          fetchMemos(currentYear, currentMonth);

          setSelectedCalendarId(newCalendarId);
          setIsModalOpen(false);
        } else {
          console.error("Failed save/update memo:", data);
        }
      })
      .catch((error) => console.error("Error save/update memo:", error));
  };

  // 메모 삭제 기능
  const handleDeleteMemo = (calendarId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token");
      return;
    }

    fetch(`http://localhost:8080/api/calendar/${calendarId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result?.resultCode === 200) {
          setMemos((prevMemos) => {
            const newMemos = { ...prevMemos };
            const dateToDelete = Object.keys(newMemos).find(
              (date) => newMemos[date].id === calendarId
            );
            if (dateToDelete) {
              delete newMemos[dateToDelete];
            }
            return newMemos;
          });
          setIsModalOpen(false);
        } else {
          console.error("Failed delete memo:", data);
        }
      })
      .catch((error) => console.error("Error delete memo:", error));
  };

  // 메모 조회 기능
  const fetchMemos = (year, month) => {
    if (!token || !currentUser) {
      console.error("No token or user");
      return;
    }

    fetch(`http://localhost:8080/api/calendar/list?year=${year}&month=${month}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, // 토큰을 사용해서 메모 조회
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result?.resultCode === 200) {
          const fetchedMemos = data.body.calendarList.reduce((acc, memo) => {
            acc[memo.date] = { id: memo.id, memo: memo.memo };
            return acc;
          }, {});
          setMemos(fetchedMemos);
        } else {
          console.error("Failed to fetch memos:", data);
        }
      })
      .catch((error) => console.error("Error fetching memos:", error));
  };

  // 컴포넌트가 처음 렌더링될 때 메모 조회 (currentUser와 token이 있을 때만)
  useEffect(() => {
    if (currentUser && token) {  // currentUser와 token이 있을 때만 메모 조회
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0');
      fetchMemos(currentYear, currentMonth); // 현재 연도와 월에 대한 메모 조회
    }
  }, [currentUser, token]);  // currentUser와 token이 변경될 때만 메모 조회

  // 메모가 있는 날짜에 표시할 내용
  const tileContent = ({ date, view }) => {
    const formattedDate = date.toLocaleDateString('en-CA');
    if (view === "month" && memos[formattedDate]) {
      return <div className="memo-indicator">{memos[formattedDate].memo}</div>;
    }
    return null;
  };

  return (
    <div className="jobdash-container">
      {/* Left Sidebar */}
      <aside className="left-sidebar">
        {/* Profile Section */}
        <div className="profile-section">
          <img
            src={profileImage || `${imageBaseUrl}/defaultPicture.jpeg`}
            alt="Profile"
            className="profile-pic"
          />
          <h3>{currentUser ? currentUser.name : "게스트"}</h3>
          <p>{currentUser ? "구직자" : "로그인하세요"}</p>
        </div>

        {/* Login/Logout Section */}
        <div className="auth-section">
        <div
            className="menu-item"
            onClick={() => {
              if (token) {
                navigate("/profile");
              } else {
                navigate("/login");
              }
            }}>
            <User size={20} />
            <span>내 프로필</span>
          </div>
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
          <img className="header-logo" src={`${imageBaseUrl}/myAiCoach.png`} alt="Logo" />
          <h1 className="logo">MY AI COACH</h1>
        </header>

        {/* Dashboard Content */}
        <div className="dashboard">
          <div className="job-cards">
            {/* Job Card 1 */}
            <div className="job-card">
              <img src={`${imageBaseUrl}/aiCoach.png`}/>
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
              <img src={`${imageBaseUrl}/job.png`}/>
              <h3>직무 선택</h3>
              <p>당신에게 맞는 직업을 찾아보세요</p>
              <div className="job-card-footer">
                <button
                  onClick={() => {
                    const token = localStorage.getItem("token");
                    if (token) {
                      navigate("/jobselect");
                    } else {
                      alert("회원만 이용 가능합니다.");
                      navigate("/login");
                    }
                  }}>
                  직무 선택
                </button>
              </div>
            </div>

            {/* Job Card 3 */}
            <div className="job-card">
              <img src={`${imageBaseUrl}/jobNews.png`}/>
              <h3>구글 기사 바로보기</h3>
              <p>관련된 구글 기사를 찾아보세요</p>
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
              </div>
            </div>
          </div>

          {/* Calendar Section */}
          <div className="calendar-section">
            <h3>인터뷰 일정</h3>
            <Calendar
              onChange={handleDateChange}
              value={new Date()}
              locale="ko"
              tileContent={tileContent}
              // 그 월 기준 다른 달의 날짜 연하게 표시
              tileClassName={({ date, view, activeStartDate }) => {
                const currentViewingMonth = activeStartDate.getMonth();
                if (view === 'month' && date.getMonth() !== currentViewingMonth) {
                  return 'out-of-current-month';
                }
              }}
            />
          </div>
        </div>
      </main>

      {/* Memo Modal */}
      {isModalOpen && (
        <MemoModal
          date={selectedDate.toLocaleDateString('en-CA')}
          initialMemo={memos[selectedDate.toLocaleDateString('en-CA')]?.memo || ""}
          onSave={handleSaveMemo}
          onDelete={handleDeleteMemo}
          onClose={() => setIsModalOpen(false)}
          calendarId={selectedCalendarId}
        />
      )}

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
    </div>
  );
};

export default Home;