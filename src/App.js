import React, { useState } from "react";
import List from "./List.js";
import Edit from "./Edit.js";
import Delete from "./Delete.js";

export default function App() {
  const formattedMemos = Object.keys(localStorage).map((key, index) => {
    return { id: index + 1, key: key, value: localStorage.getItem(key) };
  });
  const [memos, setMemos] = useState(formattedMemos);
  const [choosedMemoId, setchoosedMemoId] = useState(null); //選択したメモIDを取得する
  const choosedMemo = memos.find((element) => element.id === choosedMemoId);
  const [editable, setEditable] = useState(false);

  return (
    <div className="MemoApp">
      <List
        memos={memos}
        setMemos={setMemos}
        setchoosedMemoId={setchoosedMemoId}
        setEditable={setEditable}
      />
      {editable && (
        <Edit memos={memos} setMemos={setMemos} choosedMemo={choosedMemo} />
      )}
      {editable && (
        <Delete
          memos={memos}
          setMemos={setMemos}
          choosedMemo={choosedMemo}
          setEditable={setEditable}
        />
      )}
    </div>
  );
}
