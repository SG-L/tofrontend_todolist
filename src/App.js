import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

function Header(props) {
  const today = new Date();
  const todayKo = today.getFullYear() +"년 "+ (today.getMonth() + 1) +"월 "+ today.getDay() +"일";
  const weekKo = ['일', '월', '화', '수', '목', '금', '토'];
  const dayKo = weekKo[today.getDay()] +"요일";

  return <header>
    <h2>
      <a href="/" onClick={(e)=>{
        e.preventDefault();
        props.onChangeMode();
      }}>{todayKo}</a>
      <div>{dayKo}</div>
    </h2>
  </header>
}

function Check(props) {
  let todoCnt = 0;
  for (let i = 0; i < props.todoList.length; i++) {
    if (props.todoList[i].check === false) {
      todoCnt++;
    }
  }

  return <div className="sg_check">
    <span>할 일 {todoCnt}개 남음</span>
  </div>
}

function Hr(props) {
  return <div><hr /></div>
}

function Nav(props) {
  let lis = [];

  for (let i = 0; i < props.todoList.length; i++) {
    let t = props.todoList[i];

    lis.push(<li id={'nav_li_'+t.id}>
      <div>
        <input id={t.id} type="checkbox" onChecked={(e)=>{
          props.onChecked();
        }}/>
        <div class="sg_todo_list">
          <a id={t.id} href={'/read/'+t.id} onClick={(e)=>{
            e.preventDefault();
            props.onChangeMode(Number(e.target.id));
          }}>{t.todo}</a>
          <button id={t.id} onClick={(e)=>{
            e.preventDefault();
            props.onDeleteMode(Number(e.target.id));
          }}>X</button>
        </div>
      </div>
    </li>);
  }

  return <nav>
    <ul>
      {lis}
    </ul>
  </nav>
}

function Footer(props) {
  return <footer>
    <button onClick={(e)=>{
      e.preventDefault();
      props.onChangeMode();
    }}>+</button>
  </footer>
}

function Create(props) {
  return <article>
    <h4>일정 추가</h4>
    <form onSubmit={(e)=>{
      e.preventDefault();
      props.onCreate(e.target.todo.value);
    }}>
      <p><input type='text' name='todo' placeholder='todo'/></p>
      <p><input type='submit' value='추가'/></p>
    </form>
  </article>
}

function App2() {
  const [mode, setMode] = useState("WELCOME");
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
  const [todoList, setTodoList] = useState([
    {id:1, todo:'아침 산책', check: false},
    {id:2, todo:'오늘의 뉴스 읽기', check: false},
    {id:3, todo:'샌드위치 사 먹기', check: false}
  ]);

  let content = null;
  let check = <Check todoList={todoList}/>;

  if (mode === 'WELCOME') {
    
  } else if (mode === 'READ') {
    
  } else if (mode === 'CREATE') {
    content = <Create onCreate={(_todo)=>{
      if (_todo != '') {
        const newTodo = {id:nextId, todo:_todo};
        const newTodoList = [...todoList];
        newTodoList.push(newTodo);
        
        setTodoList(newTodoList);
        setMode('READ');
        setId(nextId);
        setNextId(nextId + 1);
      } else {
        alert('일정 입력해');
      }
    }}></Create>
  } else if (mode === 'CHECK') {
    const newTodoList = [...todoList];

    for (let i = 0; i < newTodoList.length; i++) {
      if (newTodoList[i].id === id) {
        newTodoList.check = !newTodoList.check;
        break;
      }
    }

    setTodoList(newTodoList);
    setMode('READ');
  } else if (mode === 'DELETE') {
    const newTodoList = [...todoList];

    for (let i = 0; i < newTodoList.length; i++) {
      if (newTodoList[i].id === id) {
        newTodoList.splice(i, 1);
        break;
      }
    }

    setTodoList(newTodoList);
    setMode('WELCOME');
  }
  

  return (
    <div className="sg_card">
      <Header onChangeMode={()=>{
        setMode('WELCOME');
      }} />
      {check}
      <Hr />
      <content>
        <Nav
          todoList={todoList}
          onChecked={(_id)=>{
            setId(_id);
            setMode('CHECK');
          }}
          onChangeMode={(_id)=>{
            setId(_id);
            setMode('READ');
          }}
          onDeleteMode={(_id)=>{
            setId(_id);
            setMode('DELETE');
          }} />
        {content}
        <Footer onChangeMode={()=>{
          setMode('CREATE');
        }} />
      </content>
    </div>
  );
}

export default App2;