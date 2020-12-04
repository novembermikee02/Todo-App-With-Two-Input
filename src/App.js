// import logo from './logo.svg';
// import './App.css';
import { nanoid } from "nanoid";
import React, { useState } from "react";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";

const FILTER_MAP = {
  // The All filter shows all tasks, so we return true for all tasks.
  All: () => true,
  // The Active filter shows tasks whose completed prop is false.
  Active: task => !task.completed,
  // The Completed filter shows tasks whose completed prop is true.
  Completed: task => task.completed
};

function App(props) {

  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState('All');
  // here we are using the Object.keys() method to collect an array of FILTER_NAMES:
  const FILTER_NAMES = Object.keys(FILTER_MAP);

  // filterList, which we will use to map over our array of names and return a <FilterButton /> component
  const filterList = FILTER_NAMES.map(name => (
    <FilterButton 
      key={name} 
      name={name} 
      isPressed={name === filter} 
      setFilter={setFilter}/>
  ));

  function editTask(id, newName , newDesc) {
    const editedTaskList = tasks.map(task => {
    // if this task has the same ID as the edited task
      if (id === task.id) {
        //
        return {...task, name: newName, desc: newDesc }
      } 
      return task;
      
  });
  // const editedTaskList1 = tasks.map(task => {
  //     // if this task has the same ID as the edited task
  //       if (id === task.id) {
  //         //
  //         return {...task, desc: newDesc}
  //       } 
  //       return task;
  // });  
  // setTasks(editedTaskList1); 
  setTasks(editedTaskList);
    
}


  // The deleteTask callback prop
  function deleteTask(id) {
    // console.log(id)
    const remainingTasks = tasks.filter(task => id !== task.id);
    // setTasks() expects an array as an argument,
    setTasks(remainingTasks);
  }
  // toggleTaskCompleted(), this function will take an id parameter,
  function toggleTaskCompleted(id) {
    // console.log(tasks[0])
    const updatedTasks = tasks.map(task => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        return {...task, completed: !task.completed}
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  const taskList = tasks
  .filter(FILTER_MAP[filter])
  .map(task => (
    <Todo
      id={task.id}
      name={task.name}
      desc={task.desc}
      completed={task.completed}
      key={task.id}
      // we'll add toggleTaskCompleted to the props of each <Todo/> component rendered inside our taskList;
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
      // editTask1={editTask1}
    />
  ));

    function addTask(name,desc) {
      // console.log(name,desc);
      const newTask = { id: "todo-" + nanoid(), name: name, desc: desc, completed: false };
      setTasks([...tasks, newTask]);
    }

    const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
    const headingText = `${taskList.length} ${tasksNoun} remaining`;
  return (
    <div className="App">
      <div className="todoapp stack-large">
      <h1>Todo List</h1>
      <Form addTask={addTask}/>
      <div className="filters btn-group stack-exception">
      {filterList}
      </div>
      <h4 id="list-heading">{headingText}</h4>
      <ul role="list" className="todo-list stack-large stack-exception" aria-labelledby="list-heading">
        {taskList}
      </ul>
      
    </div>
    </div>
  );
}

export default App;
