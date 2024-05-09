export default function List({ memos, setMemos, setChoosedMemo, setEditable }) {
  const clickMemoTitle = (memoId) => {
    const choosedMemo = memos.find((element) => element.id === memoId);
    setChoosedMemo(choosedMemo);
    setEditable(true);
  };

  const create = () => {
    const existNewMemo = memos.find((memo) => memo.title === "新規メモ");

    if (existNewMemo) {
      window.alert("既に新規メモが作成されています。");
    } else {
      const newMemo = {
        id: crypto.randomUUID(),
        title: "新規メモ",
        text: "新規メモ",
      };
      setChoosedMemo(newMemo);
      setMemos([...memos, newMemo]);
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
