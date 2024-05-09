import React, { useState } from "react";
import List from "./List.jsx";
import Edit from "./Edit.jsx";
import "./App.css";

export default function App() {
  const formattedMemos = Object.keys(localStorage).map((key, index) => {
    return { id: index + 1, title: key, text: localStorage.getItem(key) };
  });
  const [memos, setMemos] = useState(formattedMemos);
  const [choosedMemo, setChoosedMemo] = useState(null);
  const [editable, setEditable] = useState(false);

  return (
    <div className="memoapp">
      <div className="sentence">
        <List
          memos={memos}
          setMemos={setMemos}
          setChoosedMemo={setChoosedMemo}
          setEditable={setEditable}
        />
      </div>
      <div className="sentence">
        {editable && (
          <Edit
            memos={memos}
            setMemos={setMemos}
            choosedMemo={choosedMemo}
            setEditable={setEditable}
          />
        )}
      </div>
    </div>
  );
}
