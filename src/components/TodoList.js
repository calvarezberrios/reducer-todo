import React from "react";
import Todo from "./Todo";

export default function TodoList({ tasks, dispatch }) {


    return (
        <div className="tasks-container">
            {tasks.map(task => <Todo key={task.id} task={task} dispatch={dispatch} />)}
        </div>
    );
}