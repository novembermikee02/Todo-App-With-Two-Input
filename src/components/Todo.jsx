import React, { useState } from "react";

function Todo(props) {
    const [isEditing, setEditing] = useState(false);
    const [newName, setNewName] = useState('');
    const [newDesc, setNewDesc] = useState('');

    function handleChange(e) {
        setNewName(e.target.value);
    }
    function handleChange1(e) {
        setNewDesc(e.target.value);
    }
    function handleSubmit(e) {
        e.preventDefault();
        props.editTask(props.id, newName, newDesc);
        // props.editTask1(props.id, newDesc);
        // setNewName("");
        // setNewDesc("");
        setEditing(false);
    }

    const editingTemplate = (
        <form className="stack-small" onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="todo-label" htmlFor={props.id}>New name for</label>
                <input id={props.id} className="todo-text" type="text" value={newName} onChange={handleChange} />

                <label className="todo-label" htmlFor={props.id}>New Description For</label>
                <textarea id={props.id} className="todo-text textAreaSize" type="text" value={newDesc} onChange={handleChange1} />
            </div>
            <div className="btn-group">
                <button type="button" className="btn CancleStyle" onClick={() => setEditing(false)}>
                    Cancel<span className="visually-hidden">renaming {props.name}</span>
                </button>
                <button type="submit" className="btn CancleStyle">
                    Save<span className="visually-hidden">new name for {props.name}</span>
                </button>
            </div>
        </form>
    );
    const viewTemplate = (
        <div className="stack-small">
            <div className="c-cb">
                <input id={props.id} type="checkbox" defaultChecked={props.completed} onChange={() => props.toggleTaskCompleted(props.id)} />
                <label className="todo-label" htmlFor={props.id}><b class="titlebold">{props.name}</b></label>

                <br/> <input id={props.id} type="checkbox" defaultChecked={props.completed} onChange={() => props.toggleTaskCompleted(props.id)} />
                <label className="todo-label TextOver" htmlFor={props.id}>{props.desc}</label>
            </div>
            <div className="btn-group EditBtnSize">
                <button type="button" className="btn EditBtn" onClick={() => setEditing(true)}>
                    Edit <span className="visually-hidden">{props.name}</span>
                </button>
                <button type="button" className="btn EditBtn" onClick={() => props.deleteTask(props.id)}>
                    Delete <span className="visually-hidden">{props.name}</span>
                </button>
            </div>
        </div>
    );

    return (
        <div>
            <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>
            {/* ternary operator. */}

        </div>
    )
}

export default Todo
