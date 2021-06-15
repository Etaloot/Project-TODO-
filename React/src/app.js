import React,  { Component } from 'react';
import axios from "axios";


class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
            text: "",
			todos: [],
		};
    }


    componentDidMount() {
        this.loadTodos();

    }

    onInputChange = (event) => {
      const text = event.target.value;
      this.setState({ text: text });
    };



    onCheckboxChange = async (id, event) => {
    const isCompleted = event.target.checked;
    await axios.put("http://localhost:8080/todos/" + id, {
      isCompleted: isCompleted,
    });

    await this.loadTodos();
  };


    onInputKeyPress = async (event) => {
        if (event.nativeEvent.key === "Enter" && this.state.text !== "") {
         await axios.post("http://localhost:8080/todos", {
              name: this.state.text,
            });

           await this.loadTodos();
            this.setState({ text: "" });
        }
    };
    
      deleteTodo = async (id, event) => {
    event.preventDefault();
    await axios.delete("http://localhost:8080/todos/" + id);
    await this.loadTodos();
  };

    loadTodos = async () => {
        const response = await axios.get("http://localhost:8080/todos");
        const todos = response.data;
        this.setState({ todos: todos });
     };



	render() {
		return (
			<div className="container">
                <h1 className="Title">My Task</h1>
                <input 
                type="text" 
                className="todoInput" 
                value={this.state.text} 
                onChange={this.onInputChange} 
                onKeyPress={this.onInputKeyPress}
                />
                  


				{this.state.todos.map((todo) => {
                    return (
                        <label key={todo.id} className="todo">
                            <input
                             type="checkbox" 
                             checked={todo.isCompleted}
                             onChange={(event) => {
                                 this.onCheckboxChange(todo.id, event);
                                 }}
                                 /> 
                             {todo.name} 

                             <button
                             className="todoDelete"
                              onClick={(event) => this.deleteTodo(todo.id, event)}
                              >
                               delete
                              </button>
                        </label>

                    );
				})}

                
			</div>
		);
	}
}

export default App;