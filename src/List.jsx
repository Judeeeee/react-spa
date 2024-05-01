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
    const existNewMemo = memos.find((memo) => memo.key === "新規メモ");

    if (existNewMemo) {
      window.alert("既に新規メモが作成されています。");
    } else {
      const addId = memos.length + 1;
      setMemos([...memos, { id: addId, key: "新規メモ", value: "新規メモ" }]);
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
              {memo.key}
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
