import React, { useState } from "react";

export default function Edit({ memos, setMemos, choosedMemo, setEditable }) {
  const placeholder = choosedMemo.value;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputText = formData.get("memotext");
    const title = inputText.split("\n")[0];
    const text = inputText;

    const existTitleMemo = memos.find(
      (memo) => memo.key === title && memo.value === text,
    );
    if (existTitleMemo) {
      window.alert(
        "既にメモタイトルが存在しているか、変更がない状態で編集ボタンを押下できません。",
      );
    } else {
      const newMemosForList = memos.map((memo) => {
        if (memo.id === choosedMemo.id) {
          return { id: memo.id, key: title, value: text };
        } else {
          return memo;
        }
      });

      setMemos(newMemosForList);
      localStorage.removeItem(choosedMemo.key);
      localStorage.setItem(title, text);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextArea key={choosedMemo.id} inputText={placeholder} />
        <br />
        <button type="submit" name="button" value="submit">
          編集
        </button>
        <Delete
          memos={memos}
          setMemos={setMemos}
          choosedMemo={choosedMemo}
          setEditable={setEditable}
        />
      </form>
    </div>
  );
}

function Delete({ memos, setMemos, choosedMemo, setEditable }) {
  const destroy = () => {
    const updateMemos = memos.filter((memo) => memo.id !== choosedMemo.id);
    setMemos(updateMemos);
    const chooseMemoKey = choosedMemo.key;
    localStorage.removeItem(chooseMemoKey);
    setEditable(false);
  };

  return (
    <>
      <button type="button" name="destroy" onClick={() => destroy()}>
        削除
      </button>
    </>
  );
}

function TextArea({ inputText }) {
  const [placeholder, setPlaceholder] = useState(inputText);
  return (
    <textarea
      name="memotext"
      id="memotext"
      value={placeholder}
      onChange={(e) => setPlaceholder(e.target.value)}
      rows={15}
    />
  );
}
