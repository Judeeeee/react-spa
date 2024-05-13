import React, { useState } from "react";
import List from "./List.jsx";
import Edit from "./Edit.jsx";
import "./App.css";

export default function App() {
  const formattedMemos = Object.keys(localStorage).map((key, index) => {
    return { id: index, title: key, text: localStorage.getItem(key) };
  });
  const [memos, setMemos] = useState(formattedMemos);
  const [choosedMemo, setChoosedMemo] = useState(null);
  const [editable, setEditable] = useState(false);

  const createMemo = () => {
    const existNewMemo = memos.some((memo) => memo.title === "新規メモ");

    if (existNewMemo) {
      window.alert("既に新規メモが作成されています。");
    } else {
      const newMemo = {
        id: crypto.randomUUID(),
        title: "新規メモ",
        text: "新規メモ",
      };
      setChoosedMemo(newMemo);
      setMemos([...memos, newMemo]);
      setEditable(true);
    }
  };

  const update = () => {
    localStorage.removeItem(choosedMemo.title);
    localStorage.setItem(choosedMemo.title, choosedMemo.text);
  };

  const destroy = () => {
    const updateMemos = memos.filter((memo) => memo.id !== choosedMemo.id);
    setMemos(updateMemos);
    const chooseMemoKey = choosedMemo.title;
    localStorage.removeItem(chooseMemoKey);
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
            setMemos={setMemos}
            update={update}
            destroy={destroy}
          />
        )}
      </div>
    </div>
  );
}
