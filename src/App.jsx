import React, { useState, createContext } from "react";
import List from "./List.jsx";
import Form from "./Form.jsx";
import LoginButton from "./LoginButton.jsx";
import "./App.css";
export const LoginContext = createContext(null);

export default function App() {
  const initialMemos = JSON.parse(localStorage.getItem("memos")) || [];
  const [memos, setMemos] = useState(initialMemos);
  const [choosedMemo, setChoosedMemo] = useState(null);
  const [editable, setEditable] = useState(false);
  const [loginStatus, setloginStatus] = useState(false);

  const create = () => {
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

  const update = (updatedMemos) => {
    setMemos(updatedMemos);
    localStorage.setItem("memos", JSON.stringify(updatedMemos));
  };

  const destroy = () => {
    const filteredMemos = memos.filter((memo) => memo.id !== choosedMemo.id);
    setMemos(filteredMemos);
    localStorage.setItem("memos", JSON.stringify(filteredMemos));
    setEditable(false);
  };

  return (
    <div className="memoapp">
      <LoginContext.Provider value={loginStatus}>
        <div className="sentence">
          <List
            memos={memos}
            setChoosedMemo={setChoosedMemo}
            create={create}
            setEditable={setEditable}
          />
        </div>
        <div className="sentence">
          <LoginButton
            loginStatus={loginStatus}
            setloginStatus={setloginStatus}
          />
          {editable && (
            <Form
              memos={memos}
              choosedMemo={choosedMemo}
              update={update}
              destroy={destroy}
            />
          )}
        </div>
      </LoginContext.Provider>
    </div>
  );
}
