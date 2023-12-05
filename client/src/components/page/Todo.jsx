import React from 'react'
import todoApi from '../../api/todoApi';
import { useState,useEffect } from 'react'
import {IconButton,Typography} from '@mui/material'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import { useNavigate } from 'react-router-dom';

export default function Todo() {
	const [todos, setTodos] = useState([]);
	const [popupActive, setPopupActive] = useState(false);
	const [newTodo, setNewTodo] = useState("");
	const navigate = useNavigate();

 
  useEffect(() => {
    const getTodos=async()=>{
      try{
        const todos =await todoApi.getAll();
		console.log(todos)
       setTodos(todos)
      }catch(error){
          alert('Todo页面初始化无法加载所有todo'+error)
      } 
    }
    getTodos();
  }, [])

  const completeTodo = async id => {
	if (event.target.classList.contains('delete-todo')) {
		return; // 不执行 completeTodo
	  }
	const data = await todoApi.complete(id)
	setTodos(todos => todos.map(todo => {
		if (todo._id === data._id) {
			todo.complete = data.complete;
		}

		return todo;
	}));
	
}

const addTodo = async () => {
	try{
		const res = await todoApi.create({
			text:newTodo
		})
		console.log(res)
		const newList =[...todos,res]
		setTodos(newList)
		setPopupActive(false);
		setNewTodo("");
	  }catch(error){
		alert(error)
	  }
}

const deleteTodo = async id => {
	const data =await todoApi.delete(id)
	setTodos(todos => todos.filter(todo => todo._id !== data.result._id));
	console.log(todos)
}

const renderSidebar = () => {
    return (
      <div className='demo-app-sidebar'>
        <div style={{margin:'10px'}}>
		<Typography variant='body3'  >
          Task Board
          <IconButton onClick={() =>  navigate('/home')} style={{marginLeft:'100px'}}>
                    <LogoutOutlinedIcon fontSize='small'/>
                  </IconButton>
          </Typography>
          
        </div>
        <div className='demo-app-sidebar-section'>

          <ul>
          <li>
            </li>
            <li>📅Create your Task</li>
            <li>💬Manage its status</li>
            <li>🖱️Click an task to delete it</li>
          </ul>
          
        </div>
        <div className='demo-app-sidebar-section'>
        </div>
        <div className='demo-app-sidebar-section'>
        </div>
      </div>
    );
  };

    return (
		<div className='demo-app'>
		{renderSidebar()}
		<div className="App">

			<div className="todos">
				{todos.length > 0 ? todos.map(todo => (
					<div className={
						"todo" + (todo.complete ? " is-complete" : "")
					} key={todo._id} onClick={() => completeTodo(todo._id)}>
						<div className="checkbox"></div>

						<div className="text">{todo.text}</div>

						<div className="delete-todo" onClick={() => deleteTodo(todo._id)}>x</div>
					</div>
				)) : (
					<p>You currently have no tasks</p>
				)}
			</div>

			<div className="addPopup" onClick={() => setPopupActive(true)}>+</div>

			{popupActive ? (
				<div className="popup">
					<div className="closePopup" onClick={() => setPopupActive(false)}>X</div>
					<div className="content">
						<h3>Add Task</h3>
						<input type="text" className="add-todo-input" onChange={e => setNewTodo(e.target.value)} value={newTodo} />
						<div className="button" onClick={addTodo}>Create Task</div>
					</div>
				</div>
			) : ''}
		</div>
		</div>
	);
}
