/* eslint-disable array-callback-return */
import './App.css';
import React, { useState } from 'react';

export default function App() {
  const memos = Object.keys(localStorage).map((key) => {
    return { key: key, value: localStorage.getItem(key) }
  })

  return (
      <div className='MemoApp'>
        <List memos={memos}/>
      </div>
  );
}

function List({memos}){
  const formattedMemos = memos.map((memo,index) => {
    return {id:index, key:memo.key, value:memo.value}
  })
  const [memosForList, setMemosForList] = useState(formattedMemos);//App階層に上げてもいいかも？
  const [count, setCount] = useState(1);
  const [showEdit, setShowEdit] = useState(false);
  const [memoId, setMemoId] = useState(0);

  const clickMemoTitle = (memoId) =>{
    setShowEdit(true);
    setMemoId(memoId);
  }

  const create = () => {
    let id = count;
    setMemosForList([
      ...memosForList,
      {id: id, key:"新規メモ", value:"新規メモ"}
    ])
    setMemoId(id);
    setCount(count + 1)
    setShowEdit(true);
  }


  return (
    <>
      <ul className="display-memo-title">
        { memosForList.map((memo) => (
          <li key={memo.id}>
            <a href='#' onClick={()=>clickMemoTitle(memo.id)}>{memo.key}</a>
          </li>
          ))
        }
      </ul>
      <p>
        <a href='#' onClick={()=>create()}>
          +
        </a>
      </p>
      {showEdit && <Edit memoId={memoId} memosForList={memosForList} setMemosForList={setMemosForList} setShowEdit={setShowEdit} />}
    </>
  );
}


function Edit({memoId, memosForList, setMemosForList,setShowEdit}){
  //プレースホルダーに表示させたい
  let memo = memosForList.find((element)=> element.id === memoId)//この記述だと、番地がズレる。ifでID検索をかける必要あり。
  let placeholder = memo.value

  const handleSubmit = (e) => {
    e.preventDefault();//デフォルトで送信されるのを防ぐ
    const formData = new FormData(e.target);
    const inputText = formData.get("memo_text");

    const title = inputText.split("\n")[0];
    const text = inputText;

    //リスト表示用に保存する
    const newMemosForList = memosForList.map((setMemo)=>{
      if (setMemo.id === memoId){
        return {id:memoId, key:title, value:text}
      } else {
        return setMemo
      }
    })
    setMemosForList(newMemosForList);

    //localStrageに保存する
    localStorage.setItem(title, text);
  }

  const destroy = (memo) => {
    //リスト表示用からも削除する
    setMemosForList([
      memosForList.filter(tmp => tmp.id !== memo.id)
    ])

    //localStrageから値を取り除く
    const chooseMemoKey = memo.key;
    localStorage.removeItem(chooseMemoKey);
    //TODO この後一覧画面に遷移してほしい
    setShowEdit(false)
  }

  return (
    <div className="edit-memo">
      <form onSubmit={handleSubmit}>
        <TextArea
          key={memoId}
          inputText={placeholder}
        />
        <br />
        <button type="submit" name="button" value="submit">編集</button>
        <button type="destroy" name="destroy" onClick={()=>destroy(memo)}>削除</button>
      </form>
    </div>
  );
}

function TextArea({inputText}){
  const [placeholder, setPlaceholder] = useState(inputText);
  return (
    <textarea name="memo_text" id="memo_text" value={placeholder} onChange={e => setPlaceholder(e.target.value)} rows={15}/>
  )
}

//TODO 新規作成 => 編集 => 削除はできるが、プレースホルダーの値が変化しない😭
//プレースホルダーはuseStateを使う？onchangeを使うのだ？？？
