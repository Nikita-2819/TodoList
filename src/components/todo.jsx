import { useEffect, useState } from "react";
import "./style.css";

const Todo = () => {
  const getLocalData = () => {
    const storedList = localStorage.getItem("reactTodo");
    if (storedList) {
      return JSON.parse(storedList);
    } else {
      return [];
    }
  };

  const [inputData, setInputData] = useState("");
  const [listItem, setListItem] = useState(getLocalData());

  useEffect(() => {
    localStorage.setItem("reactTodo", JSON.stringify(listItem));
  }, [listItem]);

  const addItem = () => {
    if (!inputData) {
      return alert("Enter data");
    } else {
      const updatedList = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setListItem([...listItem, updatedList]);
      setInputData("");
    }
  };

  const deleteItem = (id) => {
    const updatedList = listItem.filter((curElem) => curElem.id !== id); // Change 'index' to 'id'
    setListItem(updatedList);
  };

  const clearAll = () => {
    localStorage.clear();
    setListItem([]);
  };

  return (
    <div className="main-container">
      <div className="title-logo">
        <figure>
          <figcaption>Todo List App</figcaption>
          <img
            src="data:image/png;base64,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"
            alt="logo"
          />
        </figure>
      </div>
      <div className="input_box">
        <input
          className="input-field"
          type="text"
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
        />
        <div className="input_add_btn" onClick={addItem}>
          <ion-icon name="add-circle-outline"></ion-icon>
        </div>
      </div>
      <div className="user-task">
        {listItem.map((curElem) => (
          <div className="user-task-item" key={curElem.id}>
            <p>{curElem.name}</p>
            <ion-icon
              name="trash-outline"
              onClick={() => deleteItem(curElem.id)}
            ></ion-icon>
          </div>
        ))}
      </div>
      <div className="clear_btn">
        <button onClick={clearAll}>Clear All</button>
      </div>
    </div>
  );
};

export default Todo;
