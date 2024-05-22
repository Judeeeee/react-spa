import React, { useState } from "react";
import List from "./List.jsx";
import Edit from "./Edit.jsx";
import "./App.css";

export default function App() {
  const initialMemos = JSON.parse(localStorage.getItem("memos")) || [];
  const [memos, setMemos] = useState(initialMemos);
  const [choosedMemo, setChoosedMemo] = useState(null);
  const [editable, setEditable] = useState(false);

  const createMemo = () => {
    const existNewMemo = memos.some((memo) => memo.text === "新規メモ");

    if (existNewMemo) {
      window.alert("既に新規メモが作成されています。");
    } else {
      const newMemo = {
        id: crypto.randomUUID(),
        text: "新規メモ",
      };
      setChoosedMemo(newMemo);
      setMemos([...memos, newMemo]);
      setEditable(true);
    }
  };

  const update = (newMemosForList) => {
    setMemos(newMemosForList);
    localStorage.setItem("memos", JSON.stringify(newMemosForList));
  };

  const destroy = () => {
    const updateMemos = memos.filter((memo) => memo.id !== choosedMemo.id);
    setMemos(updateMemos);
    localStorage.setItem("memos", JSON.stringify(updateMemos));
    setEditable(false);
  };

  return (
    <div className="memoapp">
      <div className="sentence">
        <List
          memos={memos}
          setChoosedMemo={setChoosedMemo}
          createMemo={createMemo}
          setEditable={setEditable}
        />
      </div>
      <div className="sentence">
        {editable && (
          <Edit
            memos={memos}
            choosedMemo={choosedMemo}
            update={update}
            destroy={destroy}
          />
        )}
      </div>
    </div>
  );
}
