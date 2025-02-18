import React, { useState, useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {

	const [username, setUsername] = useState("usuario_nuevo");
	const [input, setInput] = useState("");
	const [tareas, setTareas] = useState([]);
	// Documentación https://playground.4geeks.com/todo/docs

	async function createUser() {
		const response = fetch("https://playground.4geeks.com/todo/users/"+username, {method: "POST"});
	}
	
	async function getTareas() {
		const response = await fetch("https://playground.4geeks.com/todo/users/"+username);
		const data = await response.json();
		setTareas(data.todos);
	}

	async function addTarea(e) {
		e.preventDefault();
		/*
		{
		"label": "Funciono!",
		"is_done": false
		}
		*/
		const response = await fetch("https://playground.4geeks.com/todo/todos/"+username, {
			method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
				label: input,
				is_done: false
			})
		});
		setInput("");
		getTareas();
	}


	useEffect(() => {
		createUser().then(() => {
			getTareas();
		});
    }, []);

	return (
		<>
			<form onSubmit={(e) => addTarea(e)}>
				<input type="text"
					   value={input}
					   onChange={(e) => setInput(e.target.value)}
					   placeholder="introduce tu tarea" />
            </form>
			{tareas.map((tarea, index) => (
				<div key={index}>
                    <p>{tarea.label}</p>
                </div>
            ))}
		</>
	);
};

export default Home;