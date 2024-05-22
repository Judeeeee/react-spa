import TextArea from "./TextArea.jsx";

export default function Edit({ memos, choosedMemo, update, destroy }) {
  const handleFormat = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputText = formData.get("memotext");

    const existTitleMemo = memos.some((memo) => memo.text === inputText);
    if (existTitleMemo) {
      window.alert("全く同じ内容のメモが既に存在します。");
    } else {
      const newMemosForList = memos.map((memo) => {
        if (memo.id === choosedMemo.id) {
          return { id: memo.id, text: inputText };
        } else {
          return memo;
        }
      });

      update(newMemosForList);
    }
  };

  return (
    <div>
      <form onSubmit={handleFormat}>
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
