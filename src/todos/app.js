import html from "./app.html?raw";
import todoStore, { Filters } from '../store/todo.store';
import { renderTodos, renderPending } from "./usecases";

const ElementIDs = {
  ClearCompletedButton: '.clear-completed',
  TodoList: '.todo-list',
  NewTodoInput: '#new-todo-input',
  TodoFilters: '.filtro',
  PendingCountLabel: '#pending-count',
}

/**
 * 
 * @param {String} elementId - Id del elemento HTML donde se renderizara la app
 */

export const App = ( elementId ) => {

  const displayTodos = () => {
    const todos = todoStore.getTodos( todoStore.getCurrentFilter() );
    renderTodos(ElementIDs.TodoList, todos);
    updatePendingCount();
  }

  const updatePendingCount = () => {
    renderPending( ElementIDs.PendingCountLabel );
  }

  (()=>{
    const app = document.createElement('div');
    app.innerHTML = html;
    document.querySelector(elementId).append(app);
    displayTodos();
  })()

  //Referencias HTML
  const newDescriptionInput = document.querySelector(ElementIDs.NewTodoInput);
  const toDoListUL = document.querySelector(ElementIDs.TodoList);
  const clearCompletedButton = document.querySelector(ElementIDs.ClearCompletedButton);
  const todoListLI = document.querySelectorAll(ElementIDs.TodoFilters);

  newDescriptionInput.addEventListener('keyup', ( event )=>{
    if (event.keyCode !== 13) return;
    if (event.target.value.trim().length === 0) return;

    todoStore.addTodo( event.target.value );
    displayTodos();
    event.target.value = '';
  });

  toDoListUL.addEventListener('click', (event) => {
    const element = event.target.closest('[data-id]');
    todoStore.toggleTodo( element.getAttribute('data-id') );
    displayTodos();
  });

  toDoListUL.addEventListener('click', (event) => {
    if(!(event.target.className === 'destroy')) return;
    // const isDestroyElement = event.target.className === 'destroy';
    const element = event.target.closest('[data-id]');
    // if ( !element || !isDestroyElement ) return;
    
    todoStore.deleteTodo( element.getAttribute('data-id') );
    displayTodos();
  });

  clearCompletedButton.addEventListener('click', (event) => {
    todoStore.deleteCompleted();
    displayTodos();
  });

  todoListLI.forEach( element => {
    element.addEventListener('click', (element) =>{
      todoListLI.forEach(el => { el.classList.remove('selected')});
      element.target.classList.add('selected');

      switch (element.target.text) {
        case 'Todos':
          todoStore.setFilter( Filters.All );  
        break;

        case 'Pendientes':
          todoStore.setFilter( Filters.Pending );
        break;

        case 'Completados':
          todoStore.setFilter( Filters.Completed );
        break;
      
        default:
          break;
      };

      displayTodos();

    });
  });
}