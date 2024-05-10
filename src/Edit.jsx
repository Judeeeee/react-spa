import React, { useState } from "react";

export default function Edit({ choosedMemo, handleSubmit, destroy }) {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextArea key={choosedMemo.id} inputText={choosedMemo.text} />
        <br />
        <button type="submit" name="button" value="submit">
          編集
        </button>
        <button type="button" name="destroy" onClick={() => destroy()}>
          削除
        </button>
      </form>
    </div>
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
