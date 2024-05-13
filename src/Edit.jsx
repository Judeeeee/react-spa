import TextArea from "./TextArea.jsx";

export default function Edit({
  memos,
  choosedMemo,
  setMemos,
  update,
  destroy,
}) {
  const handleFormat = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputText = formData.get("memotext");
    const title = inputText.split("\n")[0];
    const text = inputText;

    const existTitleMemo = memos.some((memo) => memo.text === text);
    if (existTitleMemo) {
      window.alert("全く同じ内容のメモが既に存在します。");
    } else {
      const newMemosForList = memos.map((memo) => {
        if (memo.id === choosedMemo.id) {
          return { id: memo.id, title, text };
        } else {
          return memo;
        }
      });

      setMemos(newMemosForList);
    }
  };

  return (
    <div>
      <form onSubmit={handleFormat}>
        <TextArea key={choosedMemo.id} inputText={choosedMemo.text} />
        <br />
        <button
          type="submit"
          name="button"
          value="submit"
          onClick={() => update()}
        >
          編集
        </button>
        <button type="button" name="destroy" onClick={() => destroy()}>
          削除
        </button>
      </form>
    </div>
  );
}
