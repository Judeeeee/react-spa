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

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputText = formData.get("memotext");
    const title = inputText.split("\n")[0];
    const text = inputText;

    const existTitleMemo = memos.some((memo) => memo.text === text);
    if (existTitleMemo) {
      window.alert(
        "既にメモタイトルが存在しているか、変更がない状態で編集ボタンを押下できません。"
      );
    } else {
      const newMemosForList = memos.map((memo) => {
        if (memo.id === choosedMemo.id) {
          return { id: memo.id, title: title, text: text };
        } else {
          return memo;
        }
      });

      setMemos(newMemosForList);
      localStorage.removeItem(choosedMemo.title);
      localStorage.setItem(title, text);
    }
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
            choosedMemo={choosedMemo}
            handleSubmit={handleSubmit}
            destroy={destroy}
          />
        )}
      </div>
    </div>
  );
}
