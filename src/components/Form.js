import React from 'react';
import useForm from "../hooks/useForm";



const Form = ({ tasks, dispatch }) => {
    const [newItem, handleChange] = useForm({task: ""});

    const handleSubmit = e => {
        e.preventDefault() 

        if(newItem.task){
            console.log("cea: Form.js: Form: handleSubmit: add_todo reducer dispatch: newItem: ", newItem);
            
            if(tasks.filter(task => task.item === newItem.task).length === 0){
                dispatch({ type: "add", payload: {item: newItem.task, id: Date.now(), completed: false}});
                
            } else {
                alert("That task already exists!")
            }

            handleChange({target: {name: "task", type: "text", value: ""}});
        }
    }

    const clearSubmitted = e => {
        e.preventDefault();

        dispatch({type: "delete", payload: true})
    }

    return (
        <form onSubmit = {handleSubmit}>
            <input id = "newTodoInput" type = "text" name = "task" placeholder = "Add New Todo..." value = {newItem.task} onChange = {handleChange} />
            <button>Add Todo</button>
            <button onClick = {clearSubmitted}>Clear Completed</button>            
        </form>
    );
};

export default Form;