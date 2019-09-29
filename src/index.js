import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "./styles.css";

const todos = [];

function App() {
  // 表示するToDoのリスト
  const [todolist, setTodoList] = React.useState(todos);
  // inputフォームの値
  const [todoValue, setTodoValue] = React.useState("");
  //読み込んだかどうか判定
  const [isLoading, setisLoading] = React.useState(false);
  const handleTodoValue = e => {
    setTodoValue(e.target.value);
  };
  const [limitTime, setlimitTime] = React.useState("");

  React.useEffect(() => {
    console.log("effect");
    getToDoList();
  }, []);

  const addTodo = e => {
    //入力が空だったら追加されない
    if (todoValue === "") return;
    axios
      .post("https://jsonbox.io/box_8895aad489112fbb7629", {
        todos: [...todolist, todoValue]
      })
      .then(() => {
        console.log("成功したよ");
        getToDoList();
        setTodoValue("");
      });
    console.log();
    console.log(e.target.value);
    // setTodoList([...todolist, todoValue]);
  };

  const isKobasyun = value => {
    if (todoValue.match("こばしゅん")) {
      alert("こばしゅんを検知しました");
    }
  };

  const handleTIme = e => {
    setlimitTime(e.target.value);
  };

  const getToDoList = () => {
    setisLoading(true);
    axios
      .get("https://jsonbox.io/box_8895aad489112fbb7629")
      .then(res => {
        console.log(res.data[0].todos);
        setTodoList(res.data[0].todos);
        setisLoading(false);
      })
      .catch(e => {
        // alert(e);
      });
  };

  const putToDoList = e => {
    e.preventDefault();
    axios
      .put("https://jsonbox.io/box_8895aad489112fbb7629", {
        setTodoList: [...todolist, todoValue]
      })
      .then(res => {
        console.log(res.data[0].todos);
        setTodoList(res.data[0].todos);
        setisLoading(false);
      })
      .catch(e => {
        // alert(e);
      });
  };

  const deleteEvent = i => {
    console.log(i);
    setTodoList(setTodoList.filter(i => todolist[i]));
  };

  return (
    <div className="App">
      <h1>ToDo List</h1>
      <p>やりたいことリスト</p>

      {isLoading ? <p>読み込んでるよ</p> : <p>読み込んだよ</p>}

      <form onSubmit={putToDoList}>
        {todolist &&
          todolist.map((v, i) => {
            return (
              <div key={i}>
                <input
                  type="checkbox"
                  value={v}
                  onClick={() => deleteEvent(i)}
                />
                {v}
              </div>
            );
          })}
        <button
          type="button"
          onClick={() => {
            addTodo();
            isKobasyun();
          }}
        >
          追加
        </button>
      </form>

      <p>
        タスク内容 <input value={todoValue} onChange={handleTodoValue} />
      </p>
      <p>
        期限
        <input type="time" value={limitTime} onChange={handleTIme} />
      </p>

      <button
        onClick={() => {
          handleTIme();
          addTodo();
        }}
      >
        取得
      </button>
      <button>削除</button>
      <div id="end_task">
        <h2>完了したタスク</h2>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
