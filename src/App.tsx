import React from 'react';
import './App.css';
import TodoForm from './components/todo-form';
import {TodoInterface} from "./interfaces";
import TodoList from "./components/todo-list";


const App: React.FC = () => {
    const [todos, setTodos] = React.useState<TodoInterface[]>([]);

    function handleTodoCreate(todo: TodoInterface) {
        const newTodosState: TodoInterface[] = [...todos];
        newTodosState.push(todo)
        setTodos(newTodosState)
    }

    function handleTodoUpdate(event: React.ChangeEvent<HTMLInputElement>, id: string) {
        const newTodosState: TodoInterface[] = [...todos]    // Find correct todo item to update
        newTodosState.find((todo: TodoInterface) => todo.id === id)!.text = event.target.value
        setTodos(newTodosState)
    }

    function handleTodoRemove(id: string) {
        const newTodosState: TodoInterface[] = todos.filter((todo: TodoInterface) => todo.id !== id)
        setTodos(newTodosState)
    }

    function handleTodoComplete(id: string) {
        const newTodosState: TodoInterface[] = [...todos]
        newTodosState.find((todo: TodoInterface) => todo.id === id)!.isCompleted = !newTodosState.find((todo: TodoInterface) => todo.id === id)!.isCompleted    // Update todos state
        setTodos(newTodosState)
    }

    function handleTodoBlur(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.value.length === 0) {
            event.target.classList.add('todo-input-error')
        } else {
            event.target.classList.remove('todo-input-error')
        }
    }

    return (
        <div className="App">

            <TodoForm
                todos={todos}
                handleTodoCreate={handleTodoCreate}
            />
            <TodoList
                todos={todos}
                handleTodoUpdate={handleTodoUpdate}
                handleTodoRemove={handleTodoRemove}
                handleTodoComplete={handleTodoComplete}
                handleTodoBlur={handleTodoBlur}
            />
        </div>
    );
}


export default App;
