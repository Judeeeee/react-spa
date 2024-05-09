export default function List({
  memos,
  setMemos,
  setChoosedMemoId,
  setEditable,
}) {
  const clickMemoTitle = (memoId) => {
    setChoosedMemoId(memoId);
    setEditable(true);
  };

  const create = () => {
    const existNewMemo = memos.find((memo) => memo.title === "新規メモ");

    if (existNewMemo) {
      window.alert("既に新規メモが作成されています。");
    } else {
      const addId = crypto.randomUUID();
      setMemos([...memos, { id: addId, title: "新規メモ", text: "新規メモ" }]);
      setChoosedMemoId(addId);
      setEditable(true);
    }
  };

  return (
    <>
      <ul>
        {memos.map((memo) => (
          <li key={memo.id}>
            <button
              type="button"
              onClick={() => clickMemoTitle(memo.id)}
              className="link-button"
            >
              {memo.title}
            </button>
          </li>
        ))}
      </ul>
      <button type="button" onClick={() => create()} className="link-button">
        +
      </button>
    </>
  );
}
