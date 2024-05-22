export default function List({
  memos,
  setChoosedMemo,
  createMemo,
  setEditable,
}) {
  const clickMemoTitle = (memo) => {
    setChoosedMemo(memo);
    setEditable(true);
  };

  return (
    <>
      <ul>
        {memos.map((memo) => (
          <li key={memo.id}>
            <button
              type="button"
              onClick={() => clickMemoTitle(memo)}
              className="link-button"
            >
              {memo.text.split("\n")[0]}
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
