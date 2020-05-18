import React from 'react';

const Todo = ({ task, dispatch }) => {
    
    const completeTask = e => {
        dispatch({type: "edit", payload: {item: task, newItem: {...task, completed: !task.completed}}});
    }
    return (
        <>
            <input 
                type = "checkbox" 
                id = "task.id" 
                name = "completed" 
                value = {task.item} 
                checked = {task.completed} 
                onChange = {e => e.target.checked = !task.completed}
                onClick = {completeTask} 
            />
            <label htmlFor = {task.id}>{task.item}</label>
        </>
    );
};

export default Todo;