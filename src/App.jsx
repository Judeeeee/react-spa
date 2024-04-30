import React, { useState } from "react";
import List from "./List.jsx";
import Edit from "./Edit.jsx";
import "./App.css";

export default function App() {
  const formattedMemos = Object.keys(localStorage).map((key, index) => {
    return { id: index + 1, key: key, value: localStorage.getItem(key) };
  });
  const [memos, setMemos] = useState(formattedMemos);
  const [choosedMemoId, setChoosedMemoId] = useState(null);
  const choosedMemo = memos.find((element) => element.id === choosedMemoId);
  const [editable, setEditable] = useState(false);

  return (
    <div className="memoapp">
      <div className="sentence">
        <List
          memos={memos}
          setMemos={setMemos}
          setChoosedMemoId={setChoosedMemoId}
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