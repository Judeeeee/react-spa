export default function List({
  memos,
  setChoosedMemo,
  createMemo,
  setEditable,
}) {
  const clickMemoTitle = (memoId) => {
    const choosedMemo = memos.find((element) => element.id === memoId);
    setChoosedMemo(choosedMemo);
    setEditable(true);
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
      <button
        type="button"
        onClick={() => createMemo()}
        className="link-button"
      >
        +
      </button>
    </>
  );
}
