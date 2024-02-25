import React, { useState } from "react";

export default function Edit({ memos, setMemos, choosedMemo }) {
  const placeholder = choosedMemo.value;

  const handleSubmit = (e) => {
    e.preventDefault(); //デフォルトで送信されるのを防ぐ
    const formData = new FormData(e.target);
    const inputText = formData.get("memo_text");
    const title = inputText.split("\n")[0];
    const text = inputText;

    const existTitleMemo = memos.find(
      (memo) => memo.key === title && memo.value === text,
    );
    if (existTitleMemo) {
      window.alert(
        "既にそのメモタイトルで作成されているか、変更なしで編集ボタンを押下はできないだに！",
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
    <div className="edit-memo">
      <form onSubmit={handleSubmit}>
        <TextArea key={choosedMemo.id} inputText={placeholder} />
        <br />
        <button type="submit" name="button" value="submit">
          編集
        </button>
      </form>
    </div>
  );
}

function TextArea({ inputText }) {
  const [placeholder, setPlaceholder] = useState(inputText);
  return (
    <textarea
      name="memo_text"
      id="memo_text"
      value={placeholder}
      onChange={(e) => setPlaceholder(e.target.value)}
      rows={15}
    />
  );
}
