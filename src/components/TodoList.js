import React from 'react';
import Todo from "./Todo";

const TodoList = ({ tasks, dispatch }) => {
    return (
        <div className = "tasksContainer">
            {tasks.map(task => <Todo key = {task.id} task = {task} dispatch = {dispatch} />)}
        </div>
    );
};

export default TodoList;