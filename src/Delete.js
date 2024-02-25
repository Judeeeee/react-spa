export default function Delete({ memos, setMemos, choosedMemo, setEditable }) {
  const destroy = () => {
    const updateMemos = memos.filter((memo) => memo.id !== choosedMemo.id);
    setMemos(updateMemos);
    const chooseMemoKey = choosedMemo.key;
    localStorage.removeItem(chooseMemoKey);
    setEditable(false); //Editコンポーネントの処理が動いてほしくないため
  };

  return (
    <>
      <button type="button" name="destroy" onClick={() => destroy()}>
        削除
      </button>
    </>
  );
}
