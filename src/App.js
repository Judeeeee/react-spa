/* eslint-disable array-callback-return */
import './App.css';
import React, { useState } from 'react';

export default function App() {
  //メモ配列の操作
  const formattedMemos = Object.keys(localStorage).map((key,index) => {
    return { id: index+1, key: key, value: localStorage.getItem(key) }
  })
  const [memos, setMemos] = useState(formattedMemos);

  //選択したメモIDを取得する
  const [choosedMemoId, setchoosedMemoId] = useState(null);

  //IDから選択されたメモを取得する => Editコンポーネントに渡す
  const choosedMemo = memos.find((element)=> element.id === choosedMemoId);

  return (
      <div className='MemoApp'>
        <List
          memos={memos}
          setMemos={setMemos}
          setchoosedMemoId={setchoosedMemoId}
        />
        {
          choosedMemoId &&
          <Edit
            memos={memos}
            setMemos={setMemos}
            choosedMemo={choosedMemo}
            //ここにsetchoosedMemoId入れてもいいかも。
            //テキストエディタがずっと表示されっぱなしなので。
          />
        }
        {
          choosedMemoId &&
          <Delete
            memos={memos}
            setMemos={setMemos}
            choosedMemo={choosedMemo}
            setchoosedMemoId={setchoosedMemoId}
          />
        }
      </div>
  );
}

function List({memos, setMemos, setchoosedMemoId}){
  const clickMemoTitle = (memoId) =>{
    setchoosedMemoId(memoId);
  }

  const create = () => {
    //既にメモタイトルが"新規メモ"のものがあれば、警告文を出して表示しない
    const existNewMemo = memos.find((memo) => memo.key === "新規メモ");
    if(existNewMemo) {
      console.error("既に新規メモというメモが作成されているなり！")
    } else {
        const addId = memos.length + 1;//配列の最後に加えたい。
        setMemos([
          ...memos,
          {id: addId, key:"新規メモ", value:"新規メモ"}
        ])
        setchoosedMemoId(addId);
    }
  }

  return (
    <>
      <ul className="display-memo-title">
        { memos.map((memo) => (
          <li key={memo.id}>
            <a href='#' onClick={()=>clickMemoTitle(memo.id)}>{memo.key}</a>
          </li>
          ))
        }
      </ul>
      <p>
        <a href='#' onClick={()=>create()}>+新規作成+</a>
      </p>
    </>
  );
}

function Edit({memos, setMemos, choosedMemo}){
  const placeholder = choosedMemo.value

  const handleSubmit = (e) => {
    e.preventDefault();//デフォルトで送信されるのを防ぐ
    const formData = new FormData(e.target);
    const inputText = formData.get("memo_text");

    const title = inputText.split("\n")[0];
    const text = inputText;

    //テキストエリアに入力された値がメモリストに存在している場合は、編集ボタンを押下させない。
    const existTitleMemo = memos.find((memo) => memo.key === title);
    if(existTitleMemo){
      console.error("既存のメモタイトル、もしくは変更なしでは編集ボタンは押せないだに！")
    } else {
      const newMemosForList = memos.map((memo)=>{
        if (memo.id === choosedMemo.id){
          return {id:memo.id, key:title, value:text}
        } else {
          return memo
        }
      })
      //保存
      setMemos(newMemosForList);
      localStorage.setItem(title, text);
      localStorage.removeItem(choosedMemo.key);
    }
  }

  return (
    <div className="edit-memo">
      <form onSubmit={handleSubmit}>
        <TextArea
          key={choosedMemo.id}
          inputText={placeholder}
        />
        <br />
        <button type="submit" name="button" value="submit">編集</button>
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

function Delete({memos,setMemos,choosedMemo,setchoosedMemoId}){

  const destroy = () => {
    const updateMemos = memos.filter(memo => memo.id !== choosedMemo.id)
    setMemos(updateMemos);
    const chooseMemoKey = choosedMemo.key;
    localStorage.removeItem(chooseMemoKey);
    setchoosedMemoId(null)//Editコンポーネントの処理が動いてほしくないため
  }

  return(
    <>
      <button type="button" name="destroy" onClick={()=>destroy()}>削除</button>
    </>
  )
}
//TODO:最後にchoosedMemoIdをnullにしないと、Editコンポーネントを見に行ってしまう。
//TODO:なので、setchooseMemoId(null)を最後に追加する。

// /* eslint-disable array-callback-return */
// import './App.css';
// import React, { useState } from 'react';

// export default function App() {
//   const memos = Object.keys(localStorage).map((key) => {
//     return { key: key, value: localStorage.getItem(key) }
//   })


//   return (
//       <div className='MemoApp'>
//         <List memos={memos}/>
//       </div>
//   );
// }

// function List({memos}){
//   const formattedMemos = memos.map((memo,index) => {
//     return {id:index, key:memo.key, value:memo.value}
//   })
//   const [memosForList, setMemosForList] = useState(formattedMemos);//App階層に上げてもいいかも？
//   const [count, setCount] = useState(1);
//   const [showEdit, setShowEdit] = useState(false);
//   const [memoId, setMemoId] = useState(0);

//   const clickMemoTitle = (memoId) =>{
//     setShowEdit(true);
//     setMemoId(memoId);
//   }

//   const create = () => {
//     let id = count;
//     setMemosForList([
//       ...memosForList,
//       {id: id, key:"新規メモ", value:"新規メモ"}
//     ])
//     setMemoId(id);
//     setCount(count + 1)
//     setShowEdit(true);
//   }


//   return (
//     <>
//       <ul className="display-memo-title">
//         { memosForList.map((memo) => (
//           <li key={memo.id}>
//             <a href='#' onClick={()=>clickMemoTitle(memo.id)}>{memo.key}</a>
//           </li>
//           ))
//         }
//       </ul>
//       <p>
//         <a href='#' onClick={()=>create()}>
//           +
//         </a>
//       </p>
//       {showEdit && <Edit memoId={memoId} memosForList={memosForList} setMemosForList={setMemosForList} setShowEdit={setShowEdit} />}
//     </>
//   );
// }


// function Edit({memoId, memosForList, setMemosForList,setShowEdit}){
//   //プレースホルダーに表示させたい
//   let memo = memosForList.find((element)=> element.id === memoId)//この記述だと、番地がズレる。ifでID検索をかける必要あり。
//   let placeholder = memo.value

//   const handleSubmit = (e) => {
//     e.preventDefault();//デフォルトで送信されるのを防ぐ
//     const formData = new FormData(e.target);
//     const inputText = formData.get("memo_text");

//     const title = inputText.split("\n")[0];
//     const text = inputText;

//     //リスト表示用に保存する
//     const newMemosForList = memosForList.map((setMemo)=>{
//       if (setMemo.id === memoId){
//         return {id:memoId, key:title, value:text}
//       } else {
//         return setMemo
//       }
//     })
//     setMemosForList(newMemosForList);

//     //localStrageに保存する
//     localStorage.setItem(title, text);
//   }

//   const destroy = (memo) => {
//     //リスト表示用からも削除する
//     setMemosForList([
//       memosForList.filter(tmp => tmp.id !== memo.id)
//     ])

//     //localStrageから値を取り除く
//     const chooseMemoKey = memo.key;
//     localStorage.removeItem(chooseMemoKey);
//     //TODO この後一覧画面に遷移してほしい
//     setShowEdit(false)
//   }

//   return (
//     <div className="edit-memo">
//       <form onSubmit={handleSubmit}>
//         <TextArea
//           key={memoId}
//           inputText={placeholder}
//         />
//         <br />
//         <button type="submit" name="button" value="submit">編集</button>
//         <button type="destroy" name="destroy" onClick={()=>destroy(memo)}>削除</button>
//       </form>
//     </div>
//   );
// }

// function TextArea({inputText}){
//   const [placeholder, setPlaceholder] = useState(inputText);
//   return (
//     <textarea name="memo_text" id="memo_text" value={placeholder} onChange={e => setPlaceholder(e.target.value)} rows={15}/>
//   )
// }

// //TODO 新規作成 => 編集 => 削除はできるが、プレースホルダーの値が変化しない😭
// //プレースホルダーはuseStateを使う？onchangeを使うのだ？？？
