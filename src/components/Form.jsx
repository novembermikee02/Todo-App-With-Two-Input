import React, { useState } from "react";

function Form(props) {

  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    // alert('Hello, world!');
    props.addTask(name, desc);
    setName("");
    setDesc("");

  }

  function handleChange(e) {
    setName(e.target.value);
    // setDesc(e.target.value);
  }
  function handleChange1(e) {
    // setName(e.target.value);
    setDesc(e.target.value);
  }
  return (
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          What needs to be done?
          </label>
      </h2>
      <input
        type="text"
        id="new-todo-input"
        className="input input__lg titlestyle"
        name="text"
        placeholder="Title"
        autoComplete="off"
        value={name}
        onChange={handleChange}
      />
      <input
        type="text"
        id="new-todo-input"
        className="input input__lg descStyle"
        name="text"
        placeholder="Description"
        autoComplete="off"
        value={desc}
        onChange={handleChange1}
      /> 
      <button type="submit" className="btn btn__primary btn__lg btnStyle">
        Add
        </button><br/><br/>
    </form>
  );
}

export default Form;