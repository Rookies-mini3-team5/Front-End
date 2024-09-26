import React, { useState } from "react";
import "./MemoModal.css";

const MemoModal = ({ date, initialMemo, onSave, onClose }) => {
  const [memo, setMemo] = useState(initialMemo);

  const handleSave = () => {
    onSave(memo);
  };

  return (
    <div className="memo-modal-overlay">
      <div className="memo-modal">
        <h2>{date} 메모</h2>
        <textarea
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          placeholder="메모를 입력하세요..."
        />
        <div className="memo-modal-buttons">
          <button onClick={handleSave}>저장</button>
          <button onClick={onClose}>취소</button>
        </div>
      </div>
    </div>
  );
};

export default MemoModal;
