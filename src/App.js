import './App.css';
import React, { useState } from 'react';

function App() {
  return (
      <div className='MemoApp'>
        <List/>
      </div>
  );
}

function List(){
  const [showEdit, setShowEdit] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleLinkClick = (item) => {
    setSelectedItem(item);
    setShowEdit(true);
  };

  return (
    <>
      <ul className="display-memo-title">
        <li><a href='#' onClick={() => handleLinkClick("foo")}>foo</a></li>
        <li><a href='#' onClick={() => handleLinkClick("baa")}>bar</a></li>
        <li><a href='#' onClick={() => handleLinkClick("buzz")}>buzz</a></li>
      </ul>
      <p><a href='#'>+</a></p>
      {showEdit && <Edit selectedItem={selectedItem}/>}
    </>
  );
}

function Edit({selectedItem}){
  return (
    <div className="edit-memo">
      <form>
        <input type="text" name="name" id="name" value={selectedItem}/>
        <input type="submit" value="編集" />
        <input type="submit" value="削除" />
      </form>
    </div>
  );
}

export default App;
