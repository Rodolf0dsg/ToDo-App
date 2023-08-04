import { Todo } from "../todos/models/todo.models";

export const Filters = {
    All: 'all',
    Completed: 'Completed',
    Pending: 'Pending',
}

const state = {
    todos: [
        new Todo('Tarea de ejemplo'),
    ],

    filter: Filters.All,
};

const initStore = () => {
    loadStore();
    console.log('initStore')
}

const loadStore = () =>{
    if ( !localStorage.getItem('state') ) return;

    const { todos = [] , filter = Filters.All } = JSON.parse(localStorage.getItem('state') );
    state.todos = todos;
    state.filter = filter;
};

const saveStateToLocalStorage = () => {
    localStorage.setItem( 'state', JSON.stringify( state ) );
};

const getTodos = ( filters=Filters.All ) => {
    
    switch (filters) {
        case Filters.All:
            return [...state.todos];
        
        case Filters.Completed:
            return state.todos.filter( todo => todo.done ); //lo mismo que todo.done === true pq todo.done es booleano

        case Filters.Pending:
            return state.todos.filter( todo => !todo.done );

        default:
            throw new Error(`Option ${ filters } is not valid.`);
    }
}

/**
 * 
 * @param {String} description 
 */
const addTodo = ( description ) =>{
    if ( !description ) throw new Error('Description is required');
    state.todos.push( new Todo(description) );
    saveStateToLocalStorage();
}

const toggleTodo = ( todoId ) =>{
    state.todos = state.todos.map( todo => {
        if (todo.id === todoId) {
            todo.done = !todo.done
        }
        return todo;
    })

    saveStateToLocalStorage();
    // let todoToChange = state.todo.find( todo => todo.id === todoId);
    // todoToChange.done = !todoToChange.done;
}

const deleteTodo = ( todoId ) => {
    state.todos = state.todos.filter( todo => todo.id !== todoId );
    saveStateToLocalStorage();
}

const deleteCompleted = () =>{
    state.todos = state.todos.filter( todo => !todo.done );
    saveStateToLocalStorage();
}

const setFilter = ( newFilter = Filters.All ) => {
    state.filter = newFilter;
    saveStateToLocalStorage();
}

const getCurrentFilter = () => {
    return state.filter;
}

export default {
    addTodo,
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    getTodos,
    initStore,
    loadStore,
    setFilter,
    toggleTodo,
}