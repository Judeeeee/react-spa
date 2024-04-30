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
    const existNewMemo = memos.every((memo) => memo.key === "新規メモ");
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
            <a href="#" onClick={() => clickMemoTitle(memo.id)}>
              {memo.key}
            </a>
          </li>
        ))}
      </ul>
      <a href="#" onClick={() => create()}>
        +
      </a>
    </>
  );
}
