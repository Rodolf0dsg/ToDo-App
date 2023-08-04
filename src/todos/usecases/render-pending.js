import todoStore, { Filters } from "../../store/todo.store";

let element;


/**
 * 
 * @param {String} elementId Id of html element 
 */
export const renderPending = ( elementId ) => {

    if (!element) 
        element = document.querySelector(elementId);
    
    if (!element) throw new Error(`Element with id ${elementId} not found.`);

    element.innerHTML = todoStore.getTodos( Filters.Pending ).length;
}