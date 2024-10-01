import React, { useState } from "react";
import "./MemoModal.css";

const MemoModal = ({
  date,
  initialMemo,
  onSave,
  onDelete,
  onClose,
  calendarId,
}) => {
  const [memo, setMemo] = useState(initialMemo);
  const maxChars = 50;
  const maxChars = 50;

  const handleSave = () => {
    onSave(memo, calendarId);
  };

  const handleDelete = () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      onDelete(calendarId);
    }
    onSave(memo, calendarId);
  };

  const handleDelete = () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      onDelete(calendarId);
    }
  };

  return (
    <div className="memo-modal-overlay">
      <div className="memo-modal">
        <div className="memo-modal-header">
          <h2>{date} 메모</h2>
          <p className="memo-char-counter">
            {memo.length}/{maxChars}
          </p>
        </div>
        <textarea
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          placeholder="메모를 입력하세요..."
          maxLength={maxChars}
          maxLength={maxChars}
        />

        <div className="memo-modal-buttons">
          <button onClick={handleSave}>{calendarId ? "수정" : "저장"}</button>
          {calendarId && <button onClick={handleDelete}>삭제</button>}
          <button onClick={handleSave}>{calendarId ? "수정" : "저장"}</button>
          {calendarId && <button onClick={handleDelete}>삭제</button>}
          <button onClick={onClose}>취소</button>
        </div>
      </div>
    </div>
  );
};

export default MemoModal;
