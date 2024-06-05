import TextArea from "./TextArea.jsx";
import { useLogin } from "./useLogin.jsx";

export default function Form({ memos, choosedMemo, update, destroy }) {
  const { loginStatus } = useLogin();

  const handleFormat = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputText = formData.get("content");

    const existTitleMemo = memos.some((memo) => memo.text === inputText);
    if (existTitleMemo) {
      window.alert("全く同じ内容のメモが既に存在します。");
    } else {
      const updatedMemos = memos.map((memo) => {
        if (memo.id === choosedMemo.id) {
          return { id: memo.id, text: inputText };
        } else {
          return memo;
        }
      });

      update(updatedMemos);
    }
  };

  return (
    <div>
      <form onSubmit={handleFormat}>
        <TextArea key={choosedMemo.id} inputText={choosedMemo.text} />
        <br />
        {loginStatus && (
          <>
            <button type="submit" name="button" value="submit">
              編集
            </button>
            <button type="button" name="destroy" onClick={() => destroy()}>
              削除
            </button>
          </>
        )}
      </form>
    </div>
  );
}
