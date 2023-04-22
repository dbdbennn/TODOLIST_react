import { useEffect, useState } from "react";
import React from "react";
import "./css/TodoList.css";
import plus from "./img/plus-sign.png";
import trash from "./img/trash-bin.png";
import bacco from "./catmemememo.png";

function TodoList () {
    const [todo, setTodo] = useState("");
    const [todos, setTodos] = useState([]); 

    const handleTodo = (ev) => {
        setTodo(ev.target.value);
    }

    const hadnleAdd = () => {
        setTodos((prev) => {
        const newTodos = [...prev, todo]
        localStorage.setItem("todos", JSON.stringify(newTodos));
        return newTodos;
        })
        setTodo("");
    }

    const handleDelete = (index) => {
        setTodos((prev) => {
        const newTodos = prev.filter((prev, ind) => ind !== index)
        localStorage.setItem("todos", JSON.stringify(newTodos))
        return prev.filter((prev, ind) => ind !== index);
        })
    }

    useEffect(() => {
        const savedTodos = localStorage.getItem("todos")
        if (savedTodos) {
        setTodos(JSON.parse(savedTodos))
        }
    }, [])

    return (
        <div class="App" style={{ backgroundImage: `url(${bacco})` }}>
            <h1>TODO LIST</h1>
        <div class="input-div">
            <input 
            value={todo} 
            onChange={handleTodo} 
            placeholder='할 일을 입력하세요.'
            onKeyUp={() => {
                if(window.event.keyCode==13){
                    document.getElementById('add').click()
                }
            }}
            />
            <img id="add" class="add-img" src={plus} onClick={hadnleAdd}/>
        </div>
        <div class="list-div">
            {todos.length > 0 ? (
            todos.map((todo, index) => 
            <div class="list">
                {todo}
            <img class="delete-img" src={trash} onClick={() => handleDelete(index)}/>
            </div>)
            ) : (
            <div id="no-list">할 일이 없습니다.</div>
            )}
        </div>
        </div>
    )
}

export default TodoList;