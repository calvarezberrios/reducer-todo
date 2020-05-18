import React, { useReducer } from 'react';
import './App.css';

import { initialState, reducer } from "./reducers/reducer";
import TodoList from "./components/TodoList";
import Form from "./components/Form";


function App() {
  const [tasks, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="App">
      <Form tasks = {tasks} dispatch = {dispatch} />
      <TodoList tasks = {tasks}  dispatch = {dispatch} />
    </div>
  );
}

export default App;
