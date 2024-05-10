import TextArea from "./TextArea.jsx";

export default function Edit({ choosedMemo, handleSubmit, destroy }) {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextArea key={choosedMemo.id} inputText={choosedMemo.text} />
        <br />
        <button type="submit" name="button" value="submit">
          編集
        </button>
        <button type="button" name="destroy" onClick={() => destroy()}>
          削除
        </button>
      </form>
    </div>
  );
}
