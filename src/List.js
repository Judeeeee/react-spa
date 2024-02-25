export default function List({
  memos,
  setMemos,
  setchoosedMemoId,
  setEditable,
}) {
  const clickMemoTitle = (memoId) => {
    setchoosedMemoId(memoId);
    setEditable(true);
  };

  const create = () => {
    const existNewMemo = memos.find((memo) => memo.key === "新規メモ");
    if (existNewMemo) {
      window.alert("既に新規メモというメモが作成されているなり！");
    } else {
      const addId = memos.length + 1; //配列の最後に加えたい。
      setMemos([...memos, { id: addId, key: "新規メモ", value: "新規メモ" }]);
      setchoosedMemoId(addId);
      setEditable(true);
    }
  };

  return (
    <>
      <ul className="display-memo-title">
        {memos.map((memo) => (
          <li key={memo.id}>
            <a href="#" onClick={() => clickMemoTitle(memo.id)}>
              {memo.key}
            </a>
          </li>
        ))}
      </ul>
      <p>
        <a href="#" onClick={() => create()}>
          +新規作成+
        </a>
      </p>
    </>
  );
}
