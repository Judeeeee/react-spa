import { useContext } from "react";
import { LoginContext } from "./App.jsx";

export default function List({ memos, setChoosedMemo, create, setEditable }) {
  const loginStatus = useContext(LoginContext);
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
      {loginStatus && (
        <button type="button" onClick={() => create()} className="link-button">
          +
        </button>
      )}
    </>
  );
}
